// cantidad de productos agregados al carrito
var contador = 0;
var cont = 0;
var contando = 0;
//
var estado = true;
// fila
var fila = 0;
// carrito
var car = new Array();
//
var total = 0.0;
/* Precios*/
var precio_pizzas = [];
//
var tamanoPizza = ["Personal", "Mediana", "Familiar",
"Personal", "Mediana", "Familiar",
"Personal", "Mediana", "Familiar",
"Personal", "Mediana", "Familiar",
"Personal", "Mediana", "Familiar",
"Personal", "Mediana", "Familiar"];
//
function getProductos() {
 $.ajax({
   type: "get",
   url: "/pedido/getdatos",
   data: "data="+1,
   success: function (response) {
     cargarPizza(response)
   }
 });
}

function cargarPizza(response) {
  //console.log(JSON.parse(JSON.stringify(response)));
  console.log(response)
  console.log(response[0].idProducto)
  tamano = ['Personal','Mediana','Familiar']
  cont = 0;
  for (let i = 0; i < 4; i++) {    
    html = "<select class='custom-select' id='sel"+(i+1)+"' onclick='cambiar"+(i+1)+"()'>";
    for(let j = 0; j < 3; j++) {
    html += "<option value='"+response[cont].idProducto+"'>"+tamano[j]+"</option>";
    precio_pizzas[cont+1] = response[cont].precio
    cont++;    
    }
    html += "</select>"
    sel = '#selector'+(i+1);
    //console.log(html,sel)
    $(sel).html(html);
    html = "";
  }
  cargarPrecios();
}

function GuardarPedido(products) {
  $.ajax({
    type: "post",
    url: "/index/pedido",
    data: products,
    success: function (response) {
      if (car.length == contador) {
        console.log("registro de pedido exitoso...!");
        $("#confirmarPedido").hide();
        $("#cancelarPedido").hide();
        $("#Finalizar").show();
        $("#alertaFinalizar").show();
      } else {
        console.log(car.length,"car.length == cont <- FALSO", cont,'<-- cont');
      }
    },
  });
}
function ConfirmarPedido() {
  if (confirm("Confirmar pedido")) {
    car.forEach((element) => {
      products =
        "idProducto=" +
        element[0] +
        "&cantidad=" +
        element[3] +
        "&subtotal=" +
        element[4];
      GuardarPedido(products);
      console.log(products);
      contando++;
    });
  }
}

/** Traer Distrito */
function getDistritos() {
  
  $.ajax({
    type: "get",
    url: "/customer/traerDistritos",    
    success: function (response) {
      console.log(response)
      setDistritos(response);
    }
  });
}
function setDistritos(response) {
  html = "<label for='validationServer08'>Distrito</label>"+
            "<select id='distrito' class='custom-select' required>"+
            "<option value=''>Elija un distrito</option>";      
  for (let i = 0; i < response.length; i++) {
    html += "<option value="+response[i].idDistrito+">"+response[i].nombre+"</option>";
  }
  html += "</select><div class='valid-feedback'>Looks good!</div>";
  $("#verDistrito").html(html);
  console.log(html)
}

//el numero del carrito
function carritoContador(num) {
  $("#num").html(num);
}
//
function CargarDeNuevo() {
  car = new Array();
  contador = 0;
  total = 0.0;
  verCarrito(contador);
  carritoContador(0)
}
//producto 1 que se agregará al carrito ------------------------------------------------
function addProducto1(opcion) {
  
  var nombreusuario = $("#nombreUsuario").html();
  var nombreusuario2 = $("#nombreUsuario2").html();
  console.log(nombreusuario, "1", nombreusuario2, "2");
  // Validar 'SI' se inicio sessión o 'NO' --------------------------------------
  if (nombreusuario.length > 0 || nombreusuario2.length > 0) {
    //crear los id's para buscar
    opc1 = ".card" + opcion;
    opc2 = "#sel" + opcion;
    opc3 = "#precio_" + opcion;
    opc4 = "#cantidad_" + opcion;
    mas = '#Mas'+opcion;
    //obtenemos los pedidos para agregar al carrito
    var producto = $(opc1).html(); //nombre del producto
    var selval = $(opc2).val(); //valor seleccionado
    var tamPizza = tamanoPizza[selval];//tamaño de pizza
    var precio = $(opc3).html(); //precio de la pizza
    var cantidad = $(opc4).val(); //cantidad de pizzas
    sbt = precio + " * " + cantidad;
    var subtotal = eval(sbt);
    if (contador > 0) {
      var nuevoPro = true;
      for (let index = 0; index < car.length; index++) {
        if (car[index][0] == producto && car[index][1] == tamPizza) {
          car[index][3] = parseInt(car[index][3]) + parseInt(cantidad);
          car[index][4] = car[index][2] * car[index][3];
          nuevoPro = false;
        }
      }
      if (nuevoPro) {
        // colocamos los pedidos al carrito
        crow = new Array(producto, tamPizza, precio, cantidad, subtotal);
        car.push(crow);
        contador++;
        carritoContador(contador);
      }
    } else {
      // colocamos los pedidos al carrito
      crow = new Array(producto, tamPizza, precio, cantidad, subtotal);
      car.push(crow);
      contador++;
      carritoContador(contador);
    }
    total += parseFloat(subtotal);
    console.log(subtotal, total);
    $("#alertIniciarSesion").hide();
    $(mas).show()
      setTimeout(function() { $(mas).hide(); }, 1000);
  } else {
    $("#alertIniciarSesion").show();
    setTimeout(function() { $("#alertIniciarSesion").hide(); }, 2000);
  }
}
//producto 2
function addProducto2() {
  contador++;
  carritoContador(contador);
  //obtenemos los pedidos para agregar al carrito
  var producto = $(".card2").html();
  var selval = $("#sel2").val();
  var tamPizza = tamanoPizza[selval];
  var precio = $("#precio_2").html();
  var cantidad = $("#cantidad_2").val();
  sbt = precio + " * " + cantidad;
  var subtotal = eval(sbt);
  // colocamos los pedidos al carrito
  crow = new Array(producto, tamPizza, precio, cantidad, subtotal);
  car.push(crow);
}
//producto 3
function addProducto3() {
  contador++;
  carritoContador(contador);
  //obtenemos los pedidos para agregar al carrito
  var producto = $(".card3").html();
  var selval = $("#sel3").val();
  var tamPizza = tamanoPizza[selval];
  var precio = $("#precio_3").html();
  var cantidad = $("#cantidad_3").val();
  sbt = precio + " * " + cantidad;
  var subtotal = eval(sbt);
  // colocamos los pedidos al carrito
  crow = new Array(producto, tamPizza, precio, cantidad, subtotal);
  car.push(crow);
}
//producto 4
function addProducto4() {
  contador++;
  carritoContador(contador);
  //obtenemos los pedidos para agregar al carrito
  var producto = $(".card4").html();
  var selval = $("#sel4").val();
  var tamPizza = tamanoPizza[selval];
  var precio = $("#precio_4").html();
  var cantidad = $("#cantidad_4").val();
  sbt = precio + " * " + cantidad;
  var subtotal = eval(sbt);
  // colocamos los pedidos al carrito
  crow = new Array(producto, tamPizza, precio, cantidad, subtotal);
  car.push(crow);
}
function alertaSinPedido(num) {
  if (num < 1) {
    $("#sinPedidos").show();
    $("#sinPedidos2").show();
  } else {
    $("#sinPedidos").hide();
    $("#sinPedidos2").hide();
  }
}
/*** Mostrar los pedidos elegidos el carrito */
function verCarrito(num) {
  //mostrar alerta
  alertaSinPedido(num);
  // creamos la tabla
  html =
    "<table class='table table-hover' align='center'><thead class='thead-dark'><tr><th>N°</th><th>Producto</th><th>Tamaño</th><th>Precio S/.</th><th>Cantidad</th><th>Sub-Total S/.</th><th>Eliminar</th></tr></thead>";
  c = 1;
  tot = 0;
  for (i = 0; i < num; i++) {
    //html+="<tr><th>"+c+"</th><td>"+car[i][1]+"</td><td>"+car[i][2]+"</td><td>"+car[i][3]+"</td><td>"+car[i][4]+"</td><td><button class='btn btn-danger' onclick='borrarFila("+i+")'>X</button></td></tr>";
    html +=
      "<tr><th>" +
      c +
      "</th><td>" +
      car[i][0] +
      "</td><td>" +
      car[i][1] +
      "</td><td>" +
      car[i][2] +
      "</td><td>" +
      car[i][3] +
      "</td><td>" +
      car[i][4] +
      "</td><td><button class='btn btn-danger' onclick='borrarFila(" +
      i +
      ")'><b>X</b></button></td></tr>";
    //tot+=car[i][4];
    c++;
  }
  html += "</table>";
  html +=
    "<button type='button' class='btn btn-success' data-toggle='modal'" +
    "data-target='#exampleModal' onclick='listaPedido()' >Confirmar Pedido</button>";
  $("#verCarrito").html(html);
  $("#verTotal").html("Total: S/. " + total);
}
function listaPedido() {
  $("#direccion_antigua").val("Jr.San Marcos Nº 254");
  $("#confirmarPedido").show();
  $("#cancelarPedido").show();
  $("#Finalizar").hide();
  $("#alertaFinalizar").hide();  
}

function borrarFila(fila) {
  total =
  total - parseFloat(parseFloat(car[fila][2]) * parseFloat(car[fila][3]));
  total = total.toFixed(2);
  if (total < 1) {
    total = 0.0;
  }
  car.splice(fila, 1);
  contador--;
  verCarrito(contador);
  carritoContador(contador);
}

/** Funciones para cambiar los precios cada que se seleccione opcion de pizza */
function cambiar1() {
  num = $("#sel1").val();
  $("#precio_1").html(precio_pizzas[num]);
  console.log("precio_1 ", num);
}
function cambiar2() {
  num = $("#sel2").val();
  $("#precio_2").html(precio_pizzas[num]);
  console.log("precio_2 ",num);
}
function cambiar3() {
  num = $("#sel3").val();
  $("#precio_3").html(precio_pizzas[num]);
  console.log("precio_3 ",num);
}
function cambiar4() {
  num = $("#sel4").val();
  $("#precio_4").html(precio_pizzas[num]);
  console.log("precio_4",num);
}
/**Esta función carga los precios al iniciar la página */
function cargarPrecios() {
 
  //precio pizza hawaiana
  num = $("#sel1").val();
  $("#precio_1").html(precio_pizzas[num]);
  //precio pizza pepperoni
  num = $("#sel2").val();
  $("#precio_2").html(precio_pizzas[num]);
  //precio pizza napolitana
  num = $("#sel3").val();
  $("#precio_3").html(precio_pizzas[num]);
  //precio pizza americana
  num = $("#sel4").val();
  $("#precio_4").html(precio_pizzas[num]);
  //Ingresar no se ve xddd esto xq de la otra manera no funciona.....
  if(estado){
    $("#form-3").hide();
  }
  $('#Mas1').hide();
  $('#Mas2').hide();
  $('#Mas3').hide();
  $('#Mas4').hide();
}

function verPedido() {
  verCarrito(contador);  
  $("#pedido-content").show();
  $("#card-main").hide();
  $("#ubicacion-content").hide();
  $("#registrar-content").hide();
  //
  $("#inicio").attr("class", "nav-link");
  $("#ubicacion").attr("class", "nav-link");
  $("#pedido").attr("class", "nav-link border-bottom");
  $("#registrarButton").attr("class", "");
}

function verUbicacion() {
  $("#pedido-content").hide();
  $("#card-main").hide();
  $("#ubicacion-content").show();
  $("#registrar-content").hide();
  //
  $("#inicio").attr("class", "nav-link");
  $("#ubicacion").attr("class", "nav-link border-bottom");
  $("#pedido").attr("class", "nav-link");
  $("#registrarButton").attr("class", "");
}

function verMenu() {

  $("#pedido-content").hide();
  $("#card-main").show();
  $("#ubicacion-content").hide();
  $("#registrar-content").hide();
  //Cargar los precios de los productos
  getProductos();
  //alerta debe iniciar sessión
  $("#alertIniciarSesion").hide();
  //alerta error de inicar sesión
  $("#alert").hide();
  
  // ver el carrito
  //verCarrito();
  getDistritos();
  var nom = $('#nombreUsuario').html();
  if(nom.length>0){
    estado = false;
    $('#form-3').show();
  }
  //
  $("#inicio").attr("class", "nav-link border-bottom");
  $("#ubicacion").attr("class", "nav-link");
  $("#pedido").attr("class", "nav-link");
  $("#registrarButton").attr("class", "");
}
function verRegistrar() {
  $("#pedido-content").hide();
  $("#card-main").hide();
  $("#ubicacion-content").hide();
  $("#registrar-content").show();
  //
  $("#inicio").attr("class", "nav-link");
  $("#ubicacion").attr("class", "nav-link");
  $("#pedido").attr("class", "nav-link");
  $("#registrarButton").attr("class", "border-bottom");

  $('#myAlerta').hide()
}
