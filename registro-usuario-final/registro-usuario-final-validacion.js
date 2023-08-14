let formulario = document.getElementById("RegistroUsuarioFinal");

function validarFormularioUsuarioFinal() {
    let formulario = document.querySelector('form');

    if (formulario.foto.value === "") {
        alert("Por favor, seleccione una foto.");
        return false;
    }

    if (formulario.cv.value === "") {
        alert("Por favor, seleccione un Curriculum/CV.");
        return false;
    }

    if (formulario.nombre.value === "") {
        alert("Por favor, ingrese su nombre.");
        return false;
    }

    if (formulario.apellido.value === "") {
        alert("Por favor, ingrese su apellido.");
        return false;
    }

    if (formulario.email.value === "") {
        alert("Por favor, ingrese su dirección de correo electrónico.");
        return false;
    }

    if (formulario.contrasena.value === "") {
        alert("Por favor, ingrese una contraseña.");
        return false;
    }

    if (formulario.confirmar_contrasena.value === "") {
        alert("Por favor, confirme su contraseña.");
        return false;
    }

    if (formulario.contrasena.value !== formulario.confirmar_contrasena.value) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    if (formulario.genero.value === "") {
        alert("Por favor, seleccione su género.");
        return false;
    }

    if (formulario.nombre_empresa.value === "") {
        alert("Por favor, ingrese el nombre de la empresa donde trabajó.");
        return false;
    }

    if (formulario.descripcion_puesto.value === "") {
        alert("Por favor, describa el puesto que tuvo en la empresa.");
        return false;
    }

    if (formulario.nombre_institucion.value === "") {
        alert("Por favor, ingrese el nombre de la institución donde estudió.");
        return false;
    }

    if (formulario.nombre_carrera.value === "") {
        alert("Por favor, ingrese el nombre de la carrera que estudió.");
        return false;
    }

    return true;
}


document.getElementById("RegistroUsuarioFinal").addEventListener("submit", async function (event) {
    event.preventDefault();

    const foto = document.querySelector("#user-photo").src;
    const nombre = formulario.nombre.value;
    const apellido = formulario.apellido.value;
    const email = formulario.email.value;
    const password = formulario.contrasena.value;
    const genero = formulario.genero.value;
    const nombre_empresa = formulario.nombre_empresa.value;
    const descripcion_puesto = formulario.descripcion_puesto.value;
    const nombre_institucion = formulario.nombre_institucion.value;
    const nombre_carrera = formulario.nombre_carrera.value;

    let usuario = {
        nombre: nombre,
        email: email,
        role: "finalUser",
        password: password,
    };

    let experiencia = {
        nombre_empresa: nombre_empresa,
        descripcion_puesto: descripcion_puesto,
    };

    let estudios = {
        nombre_institucion: nombre_institucion,
        nombre_carrera: nombre_carrera,
    };

    let usuarioFinal = {
        foto: foto,
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasena: password,
        genero: genero,
        experiencia: [experiencia],
        estudios: [estudios]
    };

    try {
        const usuarioFinalCreado = await fetch("http://localhost:5000/registroUserFinal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioFinal),
        });
    
        if (usuarioFinalCreado.ok) {
          // La solicitud POST se completó con éxito (código de respuesta 200-299)
          const usuarioFinal = await usuarioFinalCreado.json();
    
          usuario.UsuarioFinal = usuarioFinal._id;
    
          const finalUserCreado = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
          });
          alert("Usuario registrado.");
          window.location.href = "../Vista Principal/Inicio/Inicio.html";
        } else {
          // La solicitud POST no se completó correctamente (código de respuesta fuera de rango 200-299)
          console.error("Error al crear el usuario");
          alert("Error al crear el usuario");
        }
      } catch (error) {
        console.error(error);
        alert("Error al crear el usuario final");
      }
});
