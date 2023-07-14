function validarFormulario() {
  var formulario = document.getElementById("formulario");

  if (formulario.foto.value === "") {
    alert("Por favor, seleccione un logo para la empresa.");
    return false;
  }

  if (formulario.nombre_empresa.value === "") {
    alert("Por favor, ingrese el nombre de la empresa.");
    return false;
  }

  if (formulario.email.value === "") {
    alert("Por favor, ingrese su dirección de correo electrónico.");
    return false;
  }

  if (formulario.info_empresa.value === "") {
    alert("Por favor, ingrese información sobre la empresa.");
    return false;
  }

  return true;
}