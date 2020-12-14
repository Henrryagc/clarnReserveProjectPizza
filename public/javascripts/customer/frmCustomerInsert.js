var cli = new Array();

function RegistrarCliente() {
  data = validarCampos();
  console.log(data)
  //alert(data);
  //id=parseInt($('#cliente_id').html())
  id = 0;
  url = "/customer/verificarUsuario";
  //if (id > 0) url = "/clientes/actualizar";
  if (data != "") {
    $.ajax({
      type: "post",
      url: url,
      data: data,
      success: function (html) {
        //alert(html);
        if (html==1) {
          alert('Ya existe usuario')
           // console.log("ya existe usuario");
        }else{
          console.log('crearUsuarioCliente',cli[2],cli[3])
          crearUsuarioCliente(cli[2],cli[3]);
        }
    },
    });
  }
}
function validarCampos() {
  nom = $("#validationServer01").val();
  ape = $("#validationServer02").val();
  email = $("#validationServer03").val();
  emailvalid = validateEmail(email);
  console.log(email);
  con = $("#validationServer04").val();
  con2 = $("#validationServer05").val();
  cel = $("#validationServer06").val();
  dir = $("#validationServer07").val();
  dis = $("#distrito").val();
  accept = $("#customControlValidation1").is(':checked')

  console.log('nom',nom,'ape',ape,'email',email,emailvalid,'con',con,cel,'dir',dir,dis,accept)
  v = 0;
  datos = "";
  if (nom == "") {
    v = 1;
    
  } 
  if (ape == "") {
    v = 1;
  } 
  if (cel == "") {
    v = 1;
    
  } 
  if (dir == "") {
    v = 1;
    
  } 
  if (con2 == "") {
    v = 1;
    
  } 
  if (con == "") {
    v = 1;
    
  }

  if (dis == "") {
    v = 1;
    
  } 
  if (v != 0) {
      $("#msg").html("no deje campos vacios");    
      setTimeout(function() {$("#msg").html(""); }, 2000);
  } else if (emailvalid == false) {
    $("#msg").html("El email no es válido...");   
    setTimeout(function() {$("#msg").html(""); }, 2000);
  } else if (accept == false) {
    $("#msg").html("Debe aceptar los términos...");    
    setTimeout(function() {$("#msg").html(""); }, 2000);
  } else if (con2 != con) {
    $("#msg").html("La clave no coincide...");    
    setTimeout(function() {$("#msg").html(""); }, 2000);
    $("#validationServer04").val('');
    $("#validationServer05").val('');
  }  else {
    //Los datos se ingresaron correctamente
    datos ="email=" + email;
    cli.push(nom,ape,email,con,parseInt(cel),dir,dis)
  }
  console.log(cli)
  //reg = new Array(id, dni, ape, nom, fec, cla);
  return datos;
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function crearUsuarioCliente(email, contrasena) {
  $.ajax({
    type: "post",
    url: "/customer/crearUsuario",
    data: "email="+email+"&contrasena="+contrasena,    
    success: function (response) {
      //cli.push(nom,ape,email,con,parseInt(cel),dir,dis)
      console.log('buscarIDUsuaarioCreadp',response)
      buscarIDusuarioCreado(response);
    }
  });
}
function buscarIDusuarioCreado(email) {
  $.ajax({
    type: "post",
    url: "customer/buscarIDusuarioCreado",
    data: "email="+email,
    success: function (response) {
      //cli.push(nom,ape,email,con,parseInt(cel),dir,dis)
      //          0    1   2     3      4         5   6
      console.log('crearCliente',cli[0],cli[1],cli[4],cli[5],response,cli[6])
      crearCliente(cli[0],cli[1],cli[4],cli[5],response,cli[6]);
    }
  });
}
function crearCliente(nombres,apellidos,celular,direccion,idUsuario,distrito) {
  data = 
  $.ajax({
    type: "post",
    url: "/customer/crearCliente",
    data: "nombres="+nombres+"&apellidos="+apellidos+"&celular="+celular+"&direccion="+direccion+"&idUsuario="+idUsuario+"&distrito="+distrito,
    success: function (response) {
      $('#myAlerta').show()
      setTimeout(function() { $("#myAlerta").hide(); }, 5000);
      limpiar();      
      console.log(response);
    }
  });
}

function limpiar() { 
  $("#validationServer01").val("");
  $("#validationServer02").val("");
  $("#validationServer03").val("");
  $("#validationServer04").val("");
  $("#validationServer05").val("");
  $("#validationServer06").val("");
  $("#validationServer07").val("");
  $("#distrito").val("");
  
}
