var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let http = require("http");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var employeeRouter = require("./routes/employee");
var customerRouter = require("./routes/customer");
var pedidoRouter = require("./routes/pedido");

var app = express();

// import para conexión
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// El puerto de escucha para el servidor
app.set("port", process.env.PORT || 4300);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(  
  connection(mysql, {      
      host: 'localhost',
      user: 'root',
      password : '',
      port : 3308, // port mysql
      database:'clarndb',

  },'pool') // single
);


//index - principal
app.get("/", indexRouter.index);
app.get('/index/iniciarSesion', indexRouter.iniciarSesion);
app.post('/index/pedido', indexRouter.pedido)
// Admin - Administrador
app.get("/users", usersRouter);
app.get("/admin/login", adminRouter.loginAdmin);
app.get("/admin/index", adminRouter.indexAdmin);
app.post('/admin/validaruser', adminRouter.validarAdminLogin);
// Empleado - Employee
app.get("/employee/login", employeeRouter.loginEmployee);
app.post("/employee/validarlogin", employeeRouter.validarEmployeeLogin);
app.get("/employee/index", employeeRouter.indexEmployee);
// Cliente - Customer
app.post("/customer/validarlogin", customerRouter.validarCustomerLogin);
app.get("/customer/cuenta", customerRouter.cuentaCustomer);
app.post("/customer/insertar", customerRouter.insertarCustomer);
app.get('/customer/editarToMain', customerRouter.editarToMain);
app.get('/customer/cerrarSesion', customerRouter.cerrarSesion);
app.post('/customer/verificarUsuario', customerRouter.verificarUsuario);
app.post('/customer/crearUsuario', customerRouter.crearUsuario);
app.post('/customer/buscarIDusuarioCreado', customerRouter.buscarIDusuarioCreado);
app.post('/customer/crearCliente', customerRouter.crearCliente);
app.get('/customer/traerDistritos', customerRouter.buscarDistrito);
// Pedidos
app.get("/pedido", pedidoRouter.pedido);
app.get("/pedido/insertar", pedidoRouter.pedidoInsertar);
app.get('/pedido/getdatos', pedidoRouter.buscarProductos);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var server = http.createServer(app);
server.listen(app.get("port"), function () {
  console.log("(CLARN RESERVE) Express server listening on port " + app.get("port"));
});

module.exports = app;
