let formulario = document.getElementById("RegistroEmpresa");
const fileInput = document.getElementById("foto");
const fileavatar = document.getElementById("fotoAdmin");

let empresa = {};
let adminImage;

fileInput.addEventListener("input", async function (event) {
  event.preventDefault()
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  try {
    const response = await fetch("http://localhost:5000/images", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Ruta de la imagen en el servidor:", data.path);
      empresa.image = data.path;
      // Aquí puedes hacer lo que desees con la respuesta del servidor, en este caso, data.path es la ruta de la imagen en el servidor
    } else {
      console.error("Error al subir la imagen:", response.status);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }

})

fileavatar.addEventListener("input", async function (event) {
  event.preventDefault()
  const formData = new FormData();
  formData.append("image", fileavatar.files[0]);

  try {
    const response = await fetch("http://localhost:5000/images", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Ruta de la imagen en el servidor:", data.path);
      adminImage = data.path;
      // Aquí puedes hacer lo que desees con la respuesta del servidor, en este caso, data.path es la ruta de la imagen en el servidor
    } else {
      console.error("Error al subir la imagen:", response.status);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }

})



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
      avatar: adminImage
    };

    empresa.nombre = formulario.nombre_empresa.value
    empresa.email = formulario.emailEmpre.value
    empresa.informacion = formulario.info_empresa.value
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
