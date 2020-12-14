/*document.getElementById("registrarButton")
        .addEventListener("click", function() {
  document.getElementById("card-content").hidden = true;
  document.getElementById("registrar-content").hidden = false;
}, false);*/


var cli = new Array();

// guardar nuevo registro de administrador
function Guardar() {
  data = GetData();
  $.ajax({
    type: "POST",
    url: "/admin/guardar",
    data: data,
    dataType: "dataType",
    success: function (response) {},
  });
}
//obtener datos para guardar un nuevo registro
function GetData() {
  let nombres = $("#nombres").val();
  let apellidos = $("#apellidos").val();
  let dni = $("#dni").val();
  let nombreUsuario = $("#nombreUsuario").val();
  let contrasena = $("#contrasena").val();
  let correo = $("#correo").val();
}

// Iniciar sesión como administrador
function IniciarSesion() {
  let usuario = $("#usuario").val();
  let contrasena = $("#contrasena").val();
  
  $.ajax({
    type: "post",
    url: "/admin/validaruser",
    data: "usuario=" + usuario + "&contrasena=" + contrasena,
    success: function (response) {
      cli = response;
      console.log("cli: ",cli[0]);
      if(cli[0]){
        if (cli[0].username == usuario && cli[0].password == contrasena) {
          console.log("True");
          ValidarSesion(true);
        } else {
          console.log("False");
          ValidarSesion(false);
        }
      }     
    }
  });

}


// validar los datos de inicio de sessión
function ValidarSesion(condition) {
  //Para validar el inicio de sesión,
  // validamos la cuenta del usuario.
  if (condition) {
    //si todo está correcto, redireccionamos
    location.href = "/admin/index"
  } else {
    // error usuario mal escrito
    console.log("error de ingreso");
  }
}

/**
 * 
 * Guardar Nuevo Empleado
 * 
 */
function Guardar()
{	data=validarCampos();
	//alert(data);
	id=parseInt($('#cliente_id').html())
	url="/clientes/save";
	if(id>0)
		url="/clientes/update";
	if(data!="")
	{	$.ajax(
		{	type:'post',
			url:url,
			data:data,
			success:function(html)
			{	alert(html)
				/*if(html>0)
				{	$('#cliente_id').html(html);
					if(fila>-1)
					{	cli.splice(fila,1,reg);
						crearTabla();
					}
					else
					{	reg[0]=html;
						cli.push(reg);
						crearTabla();
					}
				}
				else
					$('#msg').html(html);*/
			}
		});
	}
}
function validarCampos(){
    	
	dni=$('#dni').val();
	ape=$('#ape').val();
	nom=$('#nom').val();
	fec=$('#fec').val();
	cla=$('#cla').val();
	cla1=$('#cla1').val();
	v=0;cad="";
	if(dni=="")
	{	v=1;
		$('#dni').attr("class","form-control error");
	}
	else
		$('#dni').attr("class","form-control");
	if(ape=="")
	{	v=1;
		$('#ape').attr("class","form-control error");
	}
	else
		$('#ape').attr("class","form-control");
	if(nom=="")
	{	v=1;
		$('#nom').attr("class","form-control error");
	}
	else
		$('#nom').attr("class","form-control");
	if(fec=="")
	{	v=1;
		$('#fec').attr("class","form-control error");
	}
	else
		$('#fec').attr("class","form-control");
	if(cla=="")
	{	v=1;
		$('#cla').attr("class","form-control error");
	}
	else
		$('#cla').attr("class","form-control");
	if(cla1=="")
	{	v=1;
		$('#cla1').attr("class","form-control error");
	}
	else
	{	if(cla!=cla1)
		{	v=1;
			$('#msg').html("La clave no coincide...")
		}
		else
			$('#cla1').attr("class","form-control");
	}
	datos="";
	if(v==0)
	{	//Los datos se ingresaron correctamente
		datos="id="+id+"&dni="+dni+"&apellidos="+ape+"&nombres="+nom+"&fechanac="+fec+"&clave="+cla+"&accion=guardar";
	}
	reg=new Array(id,dni,ape,nom,fec,cla);
	return datos;
}
