let Reportes = [
  {
    Fecha: "7/7/2023",
    Titulo: "Nombre del puesto 1",
    Empresa: "Nombre de la empresa",
    Descripcion: "Descripción del puesto",
    Estado: "Estado del puesto",
    tipo: 0,
  },
  {
    Fecha: "7/7/2023",
    Titulo: "Nombre del puesto 2",
    Empresa: "Nombre de la empresa",
    Descripcion: "Descripción del puesto",
    Estado: "Estado del puesto",
    tipo: 0,
  },
  {
    Fecha: "7/7/2023",
    Titulo: "Nombre del puesto 3",
    Empresa: "Nombre de la empresa",
    Descripcion: "Descripción del puesto",
    Estado: "Estado del puesto",
    tipo: 0,
  },
];

function RenderReportes(Reportes, tipo) {
  let mainbox = document.getElementById("Reportes");
  mainbox.innerHTML = "";
  if (tipo == 0) {
    for (let reporte of Reportes) {
      if (reporte.tipo == 0) {
        let container = document.createElement("div");
        container.classList.add("Reporte");

        let FechaReporte = document.createElement("small");
        let TituloReporte = document.createElement("h4");
        let EmpresaReporte = document.createElement("p");
        let DescripcionReporte = document.createElement("p");
        let EstadoReporte = document.createElement("p");

        FechaReporte.textContent = reporte.Fecha;
        TituloReporte.textContent = reporte.Titulo;
        EmpresaReporte.textContent = reporte.Empresa;
        DescripcionReporte.textContent = reporte.Descripcion;
        EstadoReporte.textContent = reporte.Estado;

        container.appendChild(FechaReporte);
        container.appendChild(TituloReporte);
        container.appendChild(EmpresaReporte);
        container.appendChild(DescripcionReporte);
        container.appendChild(EstadoReporte);

        mainbox.appendChild(container);
      }
    }
  } else if (tipo == 1) {
    for (let reporte of Reportes) {
      if (reporte.tipo == 1) {
        let container = document.createElement("div");
        container.classList.add("Reporte");
        container.classList.add("d-flex");
        let InfoBox = document.createElement("div");

        let userimg = document.createElement("img");
        userimg.src = reporte.imagen;

        let FechaReporte = document.createElement("small");
        let TituloReporte = document.createElement("h4");
        let DescripcionReporte = document.createElement("p");

        FechaReporte.textContent = reporte.Fecha;
        TituloReporte.textContent = reporte.Titulo;
        DescripcionReporte.textContent = reporte.Descripcion;

        InfoBox.appendChild(FechaReporte);
        InfoBox.appendChild(TituloReporte);
        InfoBox.appendChild(DescripcionReporte);
        container.appendChild(userimg);
        container.appendChild(InfoBox);

        mainbox.appendChild(container);
      }
    }
  }
}

RenderReportes(Reportes, 0);

document
  .getElementById("TipReporte")
  .addEventListener("change", function (event) {
    event.preventDefault();

    RenderReportes(Reportes, event.target.value);
  });


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
  