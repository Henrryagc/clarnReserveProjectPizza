exports.indexAdmin = function (req, res) {
  res.render("admin/indexAdmin", { title: "index admin page" });
  console.log("admin inde function");
};

exports.loginAdmin = function (req, res) {
  res.render("admin/loginAdmin", { title: "login admin page" });
  console.log("admin inde function");
};

exports.validarAdminLogin = function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input);
  req.getConnection(function (err, connection) {
    var data = {
      usuario: input.usuario,
      contrasena: input.contrasena,
    };
    //Validamos que en el campo dni esten 8 digitos...
    if (data.usuario != "" && data.contrasena != "") {
      var query = connection.query(
        "SELECT username,password FROM adminuser WHERE username=?",
        data.usuario,
        function (err, rows) {
          if (err) {
            console.log("Error Selecting : %s ", err);
          } else {
            res.json(rows);
          }
        }
      );
      console.log("buscarxdni: ", query.sql);
    } else {
      console.log("No deje campos vacios");
    }

  });
};
