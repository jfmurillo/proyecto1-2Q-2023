let formulario = document.getElementById("RegistroEmpresa");

function validarFormulario() {


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


document.getElementById("RegistroEmpresa").addEventListener("submit", async function (event) {
  event.preventDefault()
  if (validarFormulario) {

  }
  const nombre = formulario.nombre_admin.value;
  const email = formulario.email.value;
  const password = formulario.contrasena.value;

  let usuario = {
    nombre: nombre,
    email: email,
    role: "admin",
    password: password,
  };

  let empresa = {
    nombre: formulario.nombre_empresa.value,
    email: email,
    informacion: formulario.info_empresa.value,
  };

  try {
    const EmpresaCreado = await fetch("http://localhost:5000/empresa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empresa),
    });

    if (EmpresaCreado.ok) {
      // La solicitud POST se completó con éxito (código de respuesta 200-299)
      const empresa = await EmpresaCreado.json();

      usuario.Empresa = empresa._id;

      const adminCreado = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
    } else {
      // La solicitud POST no se completó correctamente (código de respuesta fuera de rango 200-299)
      console.error("Error al crear el usuario");
      alert("Error al crear el usuario");
    }
  } catch (error) {
    console.error(error);
    alert("Error al crear la empresa");
  }
});
