exports.pedido = function(req, res){
    res.render('pedido/frmpedido', { title: 'Pedidos' });
};
/** Insertar un nuevo cliente */
var estado = false;
var idDistrito = 0;
var idUsuario = 0;
exports.pedidoInsertar = function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input);
  req.getConnection(function (err, connection) {
    var data = {
      nombres : input.nombres,
      apellidos : input.apellidos,
      email : input.email,
      contrasena : input.contrasena1,
      celular : input.celular,
      direccion : input.direccion,
      distrito : input.distrito,      
    };
    //Validamos que en el campo dni esten 8 digitos...
    var query = connection.query(
      "SELECT email FROM usuarioCliente WHERE email=?",
      data.email,
      function (err, rows) {
        if (err) {          
          console.log("Error query: %s ", err);
        } else {
          //Existe email, no se puede crear nuevo usuario
          if (data.email == rows[0].email) {
            // si el registro existe enviamos 1
            //res.json(1);
            estado = true;
          }else{
            // si el registro no existe enviamos 0
            res.json(0);
          }
        }
      }
    );    
    console.log(query.sql);
    if(estado){
      estado = false;
      //Validamos que en el campo dni esten 8 digitos...
      var query2 = connection.query(
        `INSERT INTO usuarioCliente (email, contrasena)
            values
            (?, ?)`,
        [data.email,data.contrasena],
        function (err, rows) {
          if (err) {
            console.log("Error insert UsuarioCliente : %s ", err);
          } else {
            idUsuario = rows[0].idUsuarioCliente;
          }
        }
      );
      console.log(query2.sql)
      //Validamos que en el campo dni esten 8 digitos...
      var query3 = connection.query(
        `INSERT INTO cliente (nombres,apellidos,celular,direccion,idUsuarioCliente,idDistrito)
            values
            (?,?,?,?,?,?)`,
        [data.nombres,data.apellidos,data.celular,data.direccion,idUsuario,data.distrito],
        function (err, rows) {
          if (err) {
            console.log("Error insert nuevo cliente: %s ", err);
          } else {
            console.log(rows);            
            res.json(0);//enviamos cero para confirmar que los datos fueron registrados
          }
        }
      );
      console.log("customer: ", query3.sql);  
    }  
  });
};

//
exports.buscarProductos = function (req, res) {
  
  
  req.getConnection(function (err, connection) {
    
    //
    var query = connection.query(
      `SELECT * from
      producto
      `,
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
