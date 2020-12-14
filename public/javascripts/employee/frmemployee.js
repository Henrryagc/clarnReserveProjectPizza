var cli = new Array();

function salir() {
    if (confirm("Desea Salir","Salir")) {
        location.href = "/employee/login"
        console.log("salir")
    } else {
        console.log("no salir")
    }
}
/**
 * 
 *  Iniciar Sesión
 * 
 */
function IniciarSesion() {
    
    data = validar();

    if (data!="") {
        $.ajax({
            type: "post",
            url: "/employee/validarlogin",
            data: data,            
            success: function (response) {
                cli = response;
                //var cli = JSON.parse(JSON.stringify(response));
                //console.log(input[0])
               /* if (input[0]) {
                    console.log("True : SI hay valores");
                } else{
                    console.log("False : NO hay valores");                    
                }*/
                console.log("usuario  ->",cli)
                if(cli[0]){
                    usuario=$('#employee-user').val();
                    contrasena=$('#employee-password').val();
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
    
}


function validar(){
	employeeUser=$('#employee-user').val();
	employeePassword=$('#employee-password').val();
    
	v=0;
	if(employeeUser=="")
	{	v=1;
        $('#employee-user').attr("class","form-control is-invalid");     
	}
	else
		$('#employee-user').attr("class","form-control");
	if(employeePassword=="")
	{	v=1;
        $('#employee-password').attr("class","form-control is-invalid");
	}
	else
		$('#employee-password').attr("class","form-control");
	
	datos="";
	if(v==0)
	{	//Los datos se ingresaron correctamente
		datos="employeeUser="+employeeUser+"&employeePassword="+employeePassword;
	}
	//reg=new Array(id,dni,ape,nom,fec,cla);
	return datos;
}
// validar los datos de inicio de sessión
function ValidarSesion(condition) {
    //Para validar el inicio de sesión,
    // validamos la cuenta del usuario.
    if (condition) {
      //si todo está correcto, redireccionamos
      location.href = "/employee/index"
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