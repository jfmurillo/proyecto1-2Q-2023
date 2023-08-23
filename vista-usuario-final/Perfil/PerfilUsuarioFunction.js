document.addEventListener("DOMContentLoaded", function() {
  const userId = localStorage.getItem('idempresa');

  fetch(`http://localhost:5000/registroUserFinal/${userId}`)
    .then(response => response.json())
    .then(data => {
      // Actualizar el DOM con la información de data
      setElementAttribute("user-photo-show", "src", data.foto); // Cambia el atributo src
      setElementText("nombre_cv_show", `${data.cv}`);
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
});
