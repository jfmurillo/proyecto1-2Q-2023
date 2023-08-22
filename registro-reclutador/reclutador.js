let formulario = document.getElementById("RegistroReclutador");

function validarForm() {
  let formulario = document.querySelector("form");

  if (formulario.foto.value == "") {
    alert("Por favor ingrese una foto de perfil.");
    return false;
  }

  if (formulario.nombre.value == "") {
    alert("Por favor ingrese su nombre");
    return false;
  }

  if (formulario.apellido.value == "") {
    alert("Por favor ingrese su apellido");
    return false;
  }

  if (formulario.email.value == "") {
    alert("Por favor ingrese su email");
    return false;
  }

  if (formulario.password.value == "") {
    alert("Por favor ingrese su contraseña");
    return false;
  }

  if (formulario.password2.value == "") {
    alert("Por favor confirme su contraseña");
    return false;
  }

  if (formulario.password.value != formulario.password2.value) {
    alert("Las contraseñas no coinciden");
    return false;
  }

  if (formulario.genero.value == "") {
    alert("Por favor ingrese su género.");
    return false;
  }

  return true;
}

console.log(formulario);
formulario.addEventListener("submit", async function (event) {
  console.log("hola");
  event.preventDefault();

  const foto = document.getElementById("foto").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("password").value;
  const genero = document.getElementById("genero").value;

  let reclutador = {
    foto: foto,
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: contrasena,
    genero: genero,
    role: "reclutador",
  };
  console.log(reclutador);
  try {
    const reclutadorCreado = await fetch(
      "http://localhost:5000/registro-reclutador",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reclutador),
      }
    );

    if (reclutadorCreado.ok) {
      const reclutadorFinal = await reclutadorCreado.json();

      alert("reclutador registrado.");
      window.location.href = "../Vista Reclutador/Inicio/InicioReclutador.html";
    } else {
      console.error("Error al crear el reclutador");
      alert("Error al crear el reclutador");
    }
  } catch (error) {
    console.error(error);
    alert("Error al crear reclutador");
  }
});
