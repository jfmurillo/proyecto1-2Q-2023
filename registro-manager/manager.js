let formulario = document.getElementById("RegistroManager");

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

  if (formulario.empresaid.value == "") {
    alert("Por favor ingrese su empresa");
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
  const empresaid = document.getElementById("empresaid").value;
  const password = document.getElementById("password").value;
  const genero = document.getElementById("genero").value;

  let manager = {
    foto: foto,
    nombre: nombre,
    apellido: apellido,
    email: email,
    empresaid: empresaid,
    password: password,
    genero: genero,
    role: "manager",
  };
  console.log(manager);
  try {
    const managerCreado = await fetch(
      "http://localhost:5000/registro-manager",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(manager),
      }
    );

    if (managerCreado.ok) {
      const managerFinal = await managerCreado.json();

      alert("reclutador registrado.");
      window.location.href = "../vista-manager/inicio/inicio-manager.html";
    } else {
      console.error("Error al crear el manager");
      alert("Error al crear el manager");
    }
  } catch (error) {
    console.error(error);
    alert("Error al crear manager");
  }
});
