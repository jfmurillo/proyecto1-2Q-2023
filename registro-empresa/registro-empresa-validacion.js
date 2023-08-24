window.onload = function () {
  const boton = document.getElementById("subir-imagen");
  const previstaImagen = document.getElementById("prevista-imagen");

  let myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dk2x7l0kq",
      uploadPreset: "m6fhzjcs",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        //                    result.url
        previstaImagen.src = result.info.url;
      }
    }
  );

  boton.addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );

  const botonE = document.getElementById("subir-imagenE");
  const previstaImagenE = document.getElementById("prevista-imagenE");

  let myWidgetE = cloudinary.createUploadWidget(
    {
      cloudName: "dk2x7l0kq",
      uploadPreset: "m6fhzjcs",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        //                    result.url
        previstaImagenE.src = result.info.url;
      }
    }
  );

  botonE.addEventListener(
    "click",
    function () {
      myWidgetE.open();
    },
    false
  );
};


let formulario = document.getElementById("RegistroEmpresa");


let empresa = {};
let adminImage;




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
  if (!file) {
    alert("Por favor, selecciona una imagen.");
    return false
  }
  return true;
}


document.getElementById("RegistroEmpresa").addEventListener("submit", async function (event) {
  event.preventDefault()
  if (validarFormulario) {
    const nombre = formulario.nombre_admin.value;
    const email = formulario.email.value;
    const password = formulario.contrasena.value;

    let usuario = {
      nombre: nombre,
      email: email,
      role: "admin",
      password: password,
      avatar: document.getElementById("prevista-imagen").src
    };

    empresa.nombre = formulario.nombre_empresa.value
    empresa.email = formulario.emailEmpre.value
    empresa.informacion = formulario.info_empresa.value
    empresa.image = document.getElementById("prevista-imagenE").src;
    try {
      const CheckUser = await fetch("http://localhost:5000/users/email/" + usuario.email);
      let UserFound;
      let EmpreseFound;
      try {
        UserFound = await CheckUser.json();
      }
      catch (error) {
        UserFound = {}
      }
      const CheckEmpresa = await fetch("http://localhost:5000/empresas/email/" + empresa.email);
      try {
        EmpreseFound = await CheckEmpresa.json();
      }
      catch (error) {
        EmpreseFound = {}
      }

      if (UserFound._id) {
        alert("Correo electronico de usuario ya fue utilizado")
      }
      else {

        if (EmpreseFound._id) {
          alert("Correo electronico de empresa ya fue utilizado")
        }
        else {
          let EmpresaRequest = await fetch("http://localhost:5000/empresa", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(empresa),
          })

          if (EmpresaRequest.ok) {
            // La solicitud POST se completó con éxito (código de respuesta 200-299)
            const empresa = await EmpresaRequest.json();

            usuario.Empresa = empresa._id;

            const adminCreado = await fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(usuario),
            });

            if (adminCreado.ok) {
              const usuarioCreado = await adminCreado.json();
              localStorage.setItem('iduser', usuarioCreado._id);
              localStorage.setItem('idempresa', usuarioCreado.Empresa);
              localStorage.setItem('CompanyName', empresa.nombreEmpresa);
              localStorage.setItem('CompanyLogo', empresa.ImgEmpresa);
              localStorage.setItem('Avatar', usuario.avatar);

              window.location.href = '../Vista Administrador/Inicio/InicioAdministrador.html';
            }

          } else {
            // La solicitud POST no se completó correctamente (código de respuesta fuera de rango 200-299)
            console.error("Error al crear el usuario");
            alert("Error al crear el usuario");
          }
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear la empresa");
    }
  }
});
