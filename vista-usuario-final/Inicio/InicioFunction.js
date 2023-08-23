let ListPuestos = [];

window.onload = async function () {
    if (!localStorage.getItem('iduser')) {
        window.location.href = '../../Login/login.html';
    }
    
    loadPuestosFromAPI();
    document.getElementById("CompanyName").innerHTML = localStorage.getItem("CompanyName");
    document.getElementById("LogoEmpresa").setAttribute("src", "../../NodeServer/" + localStorage.getItem("CompanyLogo"));
    document.getElementById("PerfilEmpresa").setAttribute("src", "../../NodeServer/" + localStorage.getItem("CompanyLogo"));
    document.getElementById("AvatarUser").setAttribute("src", "../../NodeServer/" + localStorage.getItem("Avatar"));
};
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
  
async function loadPuestosFromAPI() {
    const RepuestaPuestos = await fetch("http://localhost:5000/puesto/");
    const Puestos = await RepuestaPuestos.json();
    console.log(Puestos);

    let contador = 0;

    Puestos.forEach(function (puesto) {
        if (contador < 4) {
            let puestoOrder = {
                Imagen: "../assets/imagenDefault.png",
                Descripcion: puesto.DescripcionPuesto,
                Titulo: puesto.nombrePuesto,
            };

            const fecha = new Date(puesto.updatedAt);

            const dia = fecha.getDate().toString().padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son indexados desde 0, por lo que sumamos 1
            const anio = fecha.getFullYear();

            puestoOrder.Fecha = `${dia}/${mes}/${anio}`;

            ListPuestos.push(puestoOrder);
            contador++;
        }
    });

    RenderApplications(ListPuestos);
}

function RenderApplications(ListApplications) {
    let mainbox = document.getElementById("Publicaciones");
    mainbox.innerHTML = "";

    for (let application of ListApplications) {
        let container = document.createElement("div");
        container.classList.add("Puesto");

        let FechaApplication = document.createElement("small");
        let TituloApplication = document.createElement("h3");
        let ImagenApplication = document.createElement("img");
        let DescripcionApplication = document.createElement("p");

        FechaApplication.textContent = application.Fecha;
        TituloApplication.textContent = application.Titulo;
        DescripcionApplication.textContent = application.Descripcion;
        ImagenApplication.src = application.Imagen;

        container.appendChild(FechaApplication);
        container.appendChild(TituloApplication);
        container.appendChild(ImagenApplication);
        container.appendChild(DescripcionApplication);

        mainbox.appendChild(container);
    }
}
