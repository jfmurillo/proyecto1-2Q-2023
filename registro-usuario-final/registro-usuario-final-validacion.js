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
    const cvUrl = document.querySelector("#cv_url").value; 
    const nombre = formulario.nombre.value;
    const apellido = formulario.apellido.value;
    const email = formulario.email.value;
    const password = formulario.contrasena.value;
    const genero = formulario.genero.value;
    
    let usuario = {
        nombre: nombre,
        email: email,
        role: "finalUser",
        password: password,
    };

    // Recopilar todas las experiencias laborales
    const experiencias = [];
    document.querySelectorAll('.experiencia-container').forEach(container => {
        const nombreEmpresa = container.querySelector('[name="nombre_empresa"]').value;
        const descripcionPuesto = container.querySelector('[name="descripcion_puesto"]').value;
        experiencias.push({
            nombre_empresa: nombreEmpresa,
            descripcion_puesto: descripcionPuesto
        });
    });

    // Recopilar todos los estudios
    const estudiosList = [];
    document.querySelectorAll('.estudios-container').forEach(container => {
        const nombreInstitucion = container.querySelector('[name="nombre_institucion"]').value;
        const nombreCarrera = container.querySelector('[name="nombre_carrera"]').value;
        estudiosList.push({
            nombre_institucion: nombreInstitucion,
            nombre_carrera: nombreCarrera
        });
    });

    let usuarioFinal = {
        foto: foto,
        cv: cvUrl,
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasena: password,
        genero: genero,
        experiencia: experiencias,
        estudios: estudiosList
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
    
          usuario.Empresa = usuarioFinal._id;
    
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


document.querySelectorAll('.fa-plus.anadir-iconos').forEach(icon => {
    icon.addEventListener('click', function() {
        const parentDiv = icon.parentElement;

        if (parentDiv.classList.contains('border-div')) {
            let newField;
            let containerClass;
            if (parentDiv.querySelector('[name="nombre_empresa"]')) {
                // Para la sección de Experiencia Laboral
                containerClass = 'experiencia-container';
                newField = document.createElement('div');
                newField.classList.add(containerClass);
                newField.innerHTML = `
                    <label for="nombre_empresa">Nombre de la Empresa:</label>
                    <input type="text" name="nombre_empresa" required><br>
                    <label for="descripcion_puesto">Descripción del Puesto:</label>
                    <textarea name="descripcion_puesto" rows="4" cols="50" required></textarea><br><br>
                `;
            } else {
                // Para la sección de Estudios
                containerClass = 'estudios-container';
                newField = document.createElement('div');
                newField.classList.add(containerClass);
                newField.innerHTML = `
                    <label for="nombre_institucion">Institución:</label>
                    <input type="text" name="nombre_institucion" required><br>
                    <label for="nombre_carrera">Nombre de carrera:</label>
                    <input name="nombre_carrera" required></input><br><br>
                `;
            }

            parentDiv.insertBefore(newField, icon);
        }
    });
});

document.querySelectorAll('.fa-minus.quitar-iconos').forEach(icon => {
    icon.addEventListener('click', function() {
        console.log("Icono clickeado");
        const parentDiv = icon.closest('.border-div'); // Closest para obtener el contenedor correcto.

        if (parentDiv) {
            console.log("Parent div encontrado");
            let containerClass;

            if (parentDiv.querySelector('.experiencia-container')) {
                containerClass = 'experiencia-container';
            } else {
                containerClass = 'estudios-container';
            }

            const blocks = parentDiv.querySelectorAll(`.${containerClass}`);
            console.log(`Bloques encontrados de tipo ${containerClass}: ${blocks.length}`);

            // No eliminar si solo hay un bloque.
            if (blocks.length > 1) {
                const lastElement = blocks[blocks.length - 1];
                if (lastElement) {
                    lastElement.remove();
                    console.log("Bloque eliminado");
                }
            } else {
                alert('Debes especificar los datos de al menos un bloque de ' + (containerClass === 'experiencia-container' ? 'Experiencia Laboral' : 'Estudios'));
            }
        } else {
            console.log("Parent div no encontrado");
        }
    });
});

