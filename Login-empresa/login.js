  document.getElementById('login-button').addEventListener('click', function(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  if(email === "" || password === "") {
    alert("Por favor rellene todos los campos");
  } else {
    window.location.href = '../Vista Administrador/Inicio/InicioAdministrador.html';
  }
});
