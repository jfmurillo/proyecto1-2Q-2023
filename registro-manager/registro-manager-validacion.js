app = app || {};

function validarFormulario() {
  var formulario = document.getElementById("formulario");

  if (formulario.foto.value === "" || formulario.foto.value === null) {
    app.ui.AlertErrorShow("Por favor, seleccione un logo para la empresa.");
    return false;
  }
  if (formulario.nombre.value === "" || formulario.nombre.value === null || formulario.apellido.value === "" || formulario.apellido.value === null) {
    app.ui.AlertErrorShow("Por favor, complete la información de la empresa.");
    return false;
  }
  if (formulario.email.value === "" || formulario.email.value === null) {
    app.ui.AlertErrorShow("Por favor, ingrese su dirección de correo electrónico.");
    return false;
  }
  if (formulario.password.value === "" || formulario.password.value === null) {
    app.ui.AlertErrorShow("Por favor, ingrese una contraseña.");
    return false;
  }
  if (formulario.password2.value === "" || formulario.password2.value === null) {
    app.ui.AlertErrorShow("Por favor, confirme su contraseña.");
    return false;
  }
  return true;
};

document.getElementById("CrearButton").addEventListener("click", function () {
  validarFormulario();
})