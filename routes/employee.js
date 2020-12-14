exports.indexEmployee = function (req, res) {
  res.render("employee/indexEmployee", { title: "index employe page" });
};

exports.loginEmployee = function (req, res) {
  res.render("employee/loginEmployee", { title: "login employee page" });
};

exports.validarEmployeeLogin = function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input);
  req.getConnection(function (err, connection) {
    var data = {
      usuario: input.employeeUser,
      contrasena: input.employeePassword,
    };
    //Validamos que en el campo dni esten 8 digitos...
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
      console.log("customer: ", query.sql);    
  });
};
