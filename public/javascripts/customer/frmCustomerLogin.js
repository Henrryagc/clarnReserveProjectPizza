var customerUser = '1';
function IniciarSesion() {
    
    data = validar();

    if (data!="") {
        $.ajax({
            type: "post",
            url: "/customer/validarlogin",
            data: data,            
            success: function (response) {
                var input = JSON.parse(JSON.stringify(response));
                //console.log(input[0])
                if (input[0]) {
                    console.log("True : SI hay valores");
                    //document.getElementById("form-1").hidden = true;
					//document.getElementById("form-2").hidden = false;
					$('#form-1').hide();
					$('#form-3').show();
					$('#nombreUsuario').html(customerUser);
					$("#pedido-content").hide();
					$("#card-main").show();
					$("#ubicacion-content").hide();
					$("#registrar-content").hide();
                } else{
                    console.log("False : NO hay valores");
					//document.getElementById("alert").hidden = false;
					$('#alert').show();
					setTimeout(function() { $("#alert").hide(); }, 2000);
                }                
            }
        });    
    }
}
function validar(){
	customerUser=$('#customer-user').val();
	customerPassword=$('#customer-password').val();
    
	v=0;
	if(customerUser=="")
	{	v=1;
        $('#customer-user').attr("class","form-control is-invalid");     
	}
	else
		$('#customer-user').attr("class","form-control");
	if(customerPassword=="")
	{	v=1;
        $('#customer-password').attr("class","form-control is-invalid");
	}
	else
		$('#customer-password').attr("class","form-control");
	
	datos="";
	if(v==0)
	{	//Los datos se ingresaron correctamente
		datos="customerUser="+customerUser+"&customerPassword="+customerPassword;
	}
	//reg=new Array(id,dni,ape,nom,fec,cla);
	return datos;
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

function EditarCuenta() {
	data = 
	$.ajax({
		type: "get",
		url: "/customer/cuenta",
		data: "usuario="+customerUser,		
		success: function (response) {
			console.log(response)
		}
	});
}