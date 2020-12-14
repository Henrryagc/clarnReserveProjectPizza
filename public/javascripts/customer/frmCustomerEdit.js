
function verInicio() {
    //
    //$("#inicio").attr("class", "nav-link");
    //$("#ubicacion").attr("class", "nav-link");
    $("#inicio").attr("class", "nav-link border-bottom active");
    $('#editarDatos').attr('class','nav-link')
    $('#registrar-content').hide()
}

function verEditar() {
    $('#editarDatos').attr('class','nav-link border-bottom active')
    $("#inicio").attr("class", "nav-link");
    $('#registrar-content').show()
}