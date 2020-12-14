exports.customerLogin = function (req, res) {
  res.render("/");
  console.log("customer route <--");
};

exports.validarCustomerLogin = function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("Datos Recuperados de vistas", input);
  req.getConnection(function (err, connection) {
    var data = {
      usuario: input.customerUser,
      contrasena: input.customerPassword,
    };
    //Validamos que en el campo dni esten 8 digitos...
    var query = connection.query(
      "SELECT email,contrasena FROM usuarioCliente WHERE email=?",
      data.usuario,
      function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
        } else {
          console.log("rows", rows, "rows[0] ", rows[0]);
          res.json(rows);
          /*if(rows[0]!=null){              
              console.log('true');
              res.render('/customer/editarToMain');
              //res.json(rows);
            }else{
              res.json(rows);
            }*/
        }
      }
    );
    console.log("customer: ", query.sql);
  });
};
/** Insertar un nuevo cliente */
var estado = false;
var idDistrito = 0;
var idUsuario = 0;
exports.insertarCustomer = function (req, res) {

};
//verificar usuario
exports.verificarUsuario = function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("Print input\n", input);
  req.getConnection(function (err, connection) {
    var data = {
      email: input.email,
    };
    //
    var query = connection.query(
      "SELECT email FROM usuarioCliente WHERE email=?",
      data.email,
      function (err, rows) {
        if (err) {
          console.log("Error query: %s ", err);
        } else {
          if (rows == "" || rows[0] == "") {
            // si el registro NOOO existe estado igual a TRUE
            res.json(0);
            console.log("no existe usuario, se puede crear cuenta nueva");
          } else {
            estado = false;
            // si el registro existe enviamos 1
            res.json(1);            
          }
        }
      }
    );
    console.log("query 1", query.sql);
    //Validamos que en el campo dni esten 8 digitos...
  });
};


exports.crearUsuario = function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("Print input\n", input);
  req.getConnection(function (err, connection) {
    var data = {
      email: input.email,
      contrasena: input.contrasena
    };
    //
    var query = connection.query(
      `INSERT INTO usuarioCliente (email, contrasena)
            values
            (?, ?)`,
      [data.email,data.contrasena],
      function (err, rows) {
        if (err) {
          console.log("Error query: %s ", err);
        } else {
          res.json(data.email);
        }
      }
    );
    console.log("query 1", query.sql);
    //Validamos que en el campo dni esten 8 digitos...
  });
};

exports.buscarIDusuarioCreado = function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("Print input\n", input);
  req.getConnection(function (err, connection) {
    var data = {
      email: input.email,
    };
    //
    var query = connection.query(
      `SELECT idUsuarioCliente from
      usuarioCliente
      WHERE email=?`,
      [data.email],
      function (err, rows) {
        if (err) {
          console.log("Error query: %s ", err);
        } else {
          res.json(rows[0].idUsuarioCliente);
        }
      }
    );
    console.log("query 1", query.sql);
    //Validamos que en el campo dni esten 8 digitos...
  });
};

exports.crearCliente = function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("Print input\n", input);
  req.getConnection(function (err, connection) {
    var data = {
      nombres:input.nombres,
      apellidos:input.apellidos,
      celular:input.celular,
      direccion:input.direccion,
      idUsuario:input.idUsuario,         
      distrito:input.distrito
    };
    //
    var query = connection.query(
      `INSERT INTO cliente (nombres,apellidos,celular,direccion,idUsuarioCliente,idDistrito)
        values
        (?,?,?,?,?,?)`,
        [
          data.nombres,
          data.apellidos,
          data.celular,
          data.direccion,
          data.idUsuario,
          data.distrito,
        ],
      function (err, rows) {
        if (err) {
          console.log("Error query: %s ", err);
        } else {
          res.json(rows);
        }
      }
    );
    console.log("query 1", query.sql);
    //Validamos que en el campo dni esten 8 digitos...
  });
};

exports.buscarDistrito = function (req, res) {

  req.getConnection(function (err, connection) {
    //Validamos que en el campo dni esten 8 digitos...
      var query = connection.query(
        "SELECT * FROM distrito",    
        function (err, rows) {
          if (err) {
            console.log("Error Selecting : %s ", err);
          } else {
            res.json(rows);
          }
        }
      );
      console.log("customer: ", query.sql);    
  });
};


exports.cuentaCustomer = function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log('\n input from cuentaCustomer',input)
  res.render("customer/customerMain", { title: "Cuenta", data:input.usuario });
};
// Condiciones para mantener el login luego de estar en la página de editar
exports.editarToMain = function (req, res) {
  var isTrue = false;
  res.render("index", {
    title: "Pizzeria Pino",
    isTrue: isTrue,
    nombre: "Admin",
  }); //Enviamos true para validar que si hay inicio de sesión.
};
exports.cerrarSesion = function (req, res) {
  var isTrue = true;
  res.render("index", { title: "Pizzeria Pino", isTrue: isTrue, nombre: "" }); //Enviamos false para Finalizar inicio de sesión.
};
