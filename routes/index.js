
exports.index = function(req, res){
  var isTrue = true;//iniciar sesión, enviamos false porque no hay inicio de sesión
  res.render('index', { title: 'Pizzeria Pino',isTrue:isTrue,nombre:''});
};
exports.iniciarSesion = function(req, res){
  var isTrue = false;
  console.log('\n hello form index iniciarsesion\n', isTrue)
  res.render('index',{isTrue:isTrue});//Enviamos false para Finalizar inicio de sesión.
};

exports.pedido = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  var idProducto = 0;
  switch (input.idProducto) {
    case 'Hawaiana':
      idProducto = 1;
      break;
    case 'Pepperoni':
      idProducto = 2;
      break;
    case 'Napolitana':
      idProducto = 3;
      break;
    case 'Americana':
      idProducto = 4;
      break;
  }
  req.getConnection(function (err, connection) {
    var data = {
      idProducto: idProducto,
      cantidad: input.cantidad,
      subtotal: input.subtotal
    };
    if (err) {
      console.log(err)
    }
      var query = connection.query(
        `INSERT INTO pedido (idProducto,cantidad,subtotal)
            VALUES
            (?,?,?)`,
        [data.idProducto,data.cantidad,data.subtotal],
        function (err, rows) {
          if (err) {
            console.log("Error insert: %s ", err);
          } else {            
            res.json(1);
          }
          console.log(rows)
        }
      );
      console.log("pedido insert: ", query.sql);    
  });  
};