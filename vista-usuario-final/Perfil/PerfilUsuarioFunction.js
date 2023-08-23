document.addEventListener("DOMContentLoaded", function() {
  const userId = localStorage.getItem('idempresa');

  fetch(`http://localhost:5000/registroUserFinal/${userId}`)
    .then(response => response.json())
    .then(data => {
      // Actualizar el DOM con la información de data
      setElementAttribute("user-photo-show", "src", data.foto); // Cambia el atributo src
      setElementInnerHtml("nombre_cv_show", `<a href="${data.cv}" target="_blank">Ver CV</a>`);
      setElementText("nombreShow", `${data.nombre}`);
      setElementText("apellidoShow", `${data.apellido}`);
      setElementText("emailShow", `${data.email}`);
      setElementText("generoShow", `${data.genero}`);

      // Cambiar la imagen del avatar del usuario
      const avatarImg = document.querySelector(".UserLogo img");
      if (avatarImg) {
        avatarImg.src = data.foto;
        avatarImg.alt = "Avatar del usuario";
      }

      // Para experiencia y estudios, suponiendo que son arrays
      let experienciaHTML = "";
      data.experiencia.forEach(exp => {
        experienciaHTML += `
          <label>Nombre de la Empresa:</label>
          <span>${exp.nombre_empresa}</span><br>
          <label>Descripción del Puesto:</label>
          <span>${exp.descripcion_puesto}</span><br><br>`;
      });
      setElementHTML("experienciaShow", experienciaHTML);

      let estudiosHTML = "";
      data.estudios.forEach(est => {
        estudiosHTML += `
          <label>Institución:</label>
          <span>${est.nombre_institucion}</span><br>
          <label>Nombre de carrera:</label>
          <span>${est.nombre_carrera}</span><br><br>`;
      });
      setElementHTML("estudiosShow", estudiosHTML);
    })
    .catch(error => {
      console.error("Hubo un error al obtener el perfil:", error);
    });

  function setElementAttribute(id, attribute, value) {
    const element = document.getElementById(id);
    if (element) {
      element.setAttribute(attribute, value);
    } else {
      console.error(`Elemento con ID '${id}' no encontrado`);
    }
  }

  function setElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
      element.innerText = text;
    } else {
      console.error(`Elemento con ID '${id}' no encontrado`);
    }
  }

  function setElementHTML(id, html) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    } else {
      console.error(`Elemento con ID '${id}' no encontrado`);
    }
  }

  function setElementInnerHtml(id, html) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = html;
    } else {
        console.error(`Elemento con ID '${id}' no encontrado`);
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  let userData = {}; // Para almacenar la información del usuario
  const userId = localStorage.getItem('idempresa');
  // Cargar la información del perfil
  fetch(`http://localhost:5000/registroUserFinal/${userId}`)
  .then(response => response.json())
  .then(data => {
      userData = data;
      populateProfileView(userData);
      populateEditFields(userData);
  })
  .catch(error => {
      console.error("Error al cargar la información del perfil:", error);
  });

  document.getElementById('btn-editar').addEventListener('click', function() {
    populateEditFields(userData);
  });

  // Evento de click para el botón de guardar
  document.getElementById('btn-guardar').addEventListener('click', function() {
      const updatedData = {
        id: userId,
        foto: imageURL || getInputElementValue("user-photo-edit"),
        cv: getInputElementValue("cv_url_edit"),
        nombre: getInputElementValue("nombreEdit"),
        apellido: getInputElementValue("apellidoEdit"),
        email: getInputElementValue("emailEdit"),
        genero: getInputElementValue("generoEdit"),
        contrasena: getInputElementValue("contrasenaEdit"),
        experiencia: gatherExperienceData(userData.experiencia.length),
        estudios: gatherStudiesData(userData.estudios.length)
      };

      // Enviar la información editada al servidor
      fetch(`http://localhost:5000/registroUserFinal`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            alert("Información actualizada con éxito!");
            userData = updatedData;
            populateProfileView(userData);
            alert("Cambios actualizados!"); 
        } else {
            alert("Hubo un error al actualizar la información. Inténtalo de nuevo.");
        }
    })
  });

  function populateProfileView(data) {
      setElementText("nombreEdit", data.nombre);
      setElementText("apellidoEdit", data.apellido);
      setElementText("emailEdit", data.email);
      setElementAttribute("user-photo-edit", "src", data.foto);
      setElementInnerHtml("nombre_cv_show", `<a href="${data.cv}" target="_blank">Ver CV</a>`);
      setElementText("generoShow", data.genero);
      setElementText("contrasenaEdit", data.contrasena);
      let experienciaHTML = "";
      data.experiencia.forEach(exp => {
          experienciaHTML += `
              <label>Nombre de la Empresa:</label>
              <span>${exp.nombre_empresa}</span><br>
              <label>Descripción del Puesto:</label>
              <span>${exp.descripcion_puesto}</span><br><br>`;
      });
      setElementHTML("experienciaShow", experienciaHTML);

      let estudiosHTML = "";
      data.estudios.forEach(est => {
          estudiosHTML += `
              <label>Institución:</label>
              <span>${est.nombre_institucion}</span><br>
              <label>Nombre de carrera:</label>
              <span>${est.nombre_carrera}</span><br><br>`;
      });
      setElementHTML("estudiosShow", estudiosHTML);
  }

  function populateEditFields(data) {
      setInputElementValue("user-photo-edit", data.foto);
      setInputElementValue("cv_url_edit", data.cv);
      setElementText("nombre_cv_edit", "Currículum cargado");
      setInputElementValue("nombreEdit", data.nombre);
      setInputElementValue("apellidoEdit", data.apellido);
      setInputElementValue("emailEdit", data.email);
      setInputElementValue("generoEdit", data.genero);
      setInputElementValue("contrasenaEdit", data.contrasena);
      populateExperienceEditFields(data.experiencia);
      populateStudiesEditFields(data.estudios);
  }
   
  function populateExperienceEditFields(experiencias) {
    if (!experiencias || !Array.isArray(experiencias)) {
      console.error('El parámetro experiencias no es un array válido:', experiencias);
      return;
    }
    let experienciaEditHTML = "";
    experiencias.forEach((exp, index) => {
        experienciaEditHTML += `
            <label>Nombre de la Empresa:</label>
            <input type="text" id="nombre_empresa_edit_${index}" value="${exp.nombre_empresa}"><br>
            <label>Descripción del Puesto:</label>
            <input type="text" id="descripcion_puesto_edit_${index}" value="${exp.descripcion_puesto}"><br><br>`;
    });
    setElementHTML("experienciaEdit", experienciaEditHTML);
  }

  function populateStudiesEditFields(estudios) {
      let estudiosEditHTML = "";
      estudios.forEach((est, index) => {
          estudiosEditHTML += `
              <label>Institución:</label>
              <input type="text" id="nombre_institucion_edit_${index}" value="${est.nombre_institucion}"><br>
              <label>Nombre de carrera:</label>
              <input type="text" id="nombre_carrera_edit_${index}" value="${est.nombre_carrera}"><br><br>`;
      });
      setElementHTML("estudiosEdit", estudiosEditHTML);
  }

  function gatherExperienceData() {
    const experiences = [];
    let i = 0;
    while (true) {
        const empresaElem = document.getElementById(`nombre_empresa_edit_${i}`);
        const puestoElem = document.getElementById(`descripcion_puesto_edit_${i}`);
        if (!empresaElem || !puestoElem) break;
        experiences.push({
            nombre_empresa: empresaElem.value,
            descripcion_puesto: puestoElem.value
        });
        i++;
    }
    return experiences;
  }

  function gatherStudiesData() {
    const studies = [];
    let i = 0;
    while (true) {
        const institucionElem = document.getElementById(`nombre_institucion_edit_${i}`);
        const carreraElem = document.getElementById(`nombre_carrera_edit_${i}`);
        if (!institucionElem || !carreraElem) break;
        studies.push({
            nombre_institucion: institucionElem.value,
            nombre_carrera: carreraElem.value
        });
        i++;
    }
    return studies;
  }

  function getInputElementValue(id) {
      const inputElement = document.getElementById(id);
      if (inputElement) {
          return inputElement.value;
      } else {
          console.error(`Elemento con ID '${id}' no encontrado`);
          return null;
      }
  }

  function setElementText(id, text) {
      const element = document.getElementById(id);
      if (element) {
          element.textContent = text;
      } else {
          console.error(`Elemento con ID '${id}' no encontrado`);
      }
  }

  function setElementAttribute(id, attribute, value) {
    const element = document.getElementById(id);
    if (element) {
      element.setAttribute(attribute, value);
    } else {
      console.error(`Elemento con ID '${id}' no encontrado`);
    }
  }
  
  function setElementHTML(id, html) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    } else {
      console.error(`Elemento con ID '${id}' no encontrado`);
    }
  }

  function setElementInnerHtml(id, html) {
      const element = document.getElementById(id);
      if (element) {
          element.innerHTML = html;
      } else {
          console.error(`Elemento con ID '${id}' no encontrado`);
      }
  }

  function setInputElementValue(id, value) {
      const inputElement = document.getElementById(id);
      if (inputElement) {
          inputElement.value = value;
      } else {
          console.error(`Elemento con ID '${id}' no encontrado`);
      }
  }

  document.querySelectorAll('.fa-plus.anadir-iconos').forEach(icon => {
    icon.addEventListener('click', function() {
        const parentDiv = icon.closest('.border-div');
        const experienceFields = parentDiv.querySelectorAll('[id^="nombre_empresa_edit_"]');
        const studyFields = parentDiv.querySelectorAll('[id^="nombre_institucion_edit_"]');
        
        if(experienceFields.length > 0) {
            const newIdx = experienceFields.length;  // Obtiene el siguiente índice para la experiencia
            let containerClass = 'experiencia-container';
            let newField = document.createElement('div');
            newField.classList.add(containerClass);
            newField.innerHTML = `
                <label for="nombre_empresaEdit">Nombre de la Empresa:</label>
                <input type="text" id="nombre_empresa_edit_${newIdx}" name="nombre_empresa" required><br>
                <label for="descripcion_puestoEdit">Descripción del Puesto:</label>
                <textarea id="descripcion_puesto_edit_${newIdx}" name="descripcion_puesto" rows="4" cols="50" required></textarea><br><br>
            `;
            parentDiv.insertBefore(newField, icon);
        } else if(studyFields.length > 0) {
            const newIdx = studyFields.length;  // Obtiene el siguiente índice para los estudios
            let containerClass = 'estudios-container';
            let newField = document.createElement('div');
            newField.classList.add(containerClass);
            newField.innerHTML = `
                <label for="nombre_institucionEdit">Institución:</label>
                <input type="text" id="nombre_institucion_edit_${newIdx}" name="nombre_institucion" required><br>
                <label for="nombre_carreraEdit">Nombre de carrera:</label>
                <input id="nombre_carrera_edit_${newIdx}" name="nombre_carrera" required></input><br><br>
            `;
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
  
});