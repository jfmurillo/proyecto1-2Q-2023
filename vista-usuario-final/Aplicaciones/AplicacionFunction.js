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

async function loadPuestosFromAPI() {
    const RepuestaPuestos = await fetch("http://localhost:5000/puesto/");
    const Puestos = await RepuestaPuestos.json();
    console.log(Puestos);

    let contador = 0;

    Puestos.forEach(function (puesto) {
        if (contador < 10) {
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
  let mainbox = document.getElementById("Aplicaciones");

  for (let application of ListApplications) {
    let container = document.createElement("div");
    container.classList.add("AplicacionBox");

    let Puesto = document.createElement("div");
    Puesto.classList.add("Puesto");
    Puesto.setAttribute("data-modal-target", "InfoEmpleoModal");
    Puesto.setAttribute("data-id", ListApplications.indexOf(application));

    let FechaApplication = document.createElement("small");
    let TituloApplication = document.createElement("h3");
    let ImagenApplication = document.createElement("img");
    let EmpresaApplication = document.createElement("p");
    let DescripcionApplication = document.createElement("p");

    FechaApplication.textContent = application.Fecha;
    TituloApplication.textContent = application.Titulo;
    EmpresaApplication.textContent = application.Empresa;
    DescripcionApplication.textContent = application.Descripcion;
    ImagenApplication.src = application.Imagen;

    Puesto.appendChild(FechaApplication);
    Puesto.appendChild(TituloApplication);
    Puesto.appendChild(ImagenApplication);
    Puesto.appendChild(EmpresaApplication);
    Puesto.appendChild(DescripcionApplication);

    // Create Apply Button
    let ApplyButton = document.createElement("button");
    ApplyButton.classList.add("apply-btn");
    ApplyButton.textContent = "Aplicar Puesto";
    ApplyButton.addEventListener("click", function () {
      window.alert("Se ha aplicado al puesto");
    });

    container.appendChild(Puesto);
    container.appendChild(ApplyButton); // Append Apply Button to the container

    mainbox.appendChild(container);
  }
}

RenderApplications(ListPuestos);

// Escuchamos el evento click en los botones de Aplicar Puesto
const applyButtons = document.querySelectorAll(".apply-btn");
applyButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const id = event.target.parentElement.getAttribute("data-id");
    applyForJob(id);
  });
});

async function applyForJob(id) {
  try {
    const selectedPuesto = ListPuestos[id];

    // Aquí podrías construir los datos que deseas enviar al servidor, como el ID del puesto y otros detalles relevantes
    const data = {
      puestoId: selectedPuesto.ID, // Supongo que tu objeto tiene una propiedad "ID" para el ID del puesto
      userId: localStorage.getItem('iduser'), // Supongo que obtienes el ID del usuario de algún lugar, como el almacenamiento local
      // ... otros datos relevantes para la aplicación
    };

    // Realizar una solicitud POST al servidor para enviar la solicitud de aplicación
    const response = await fetch('http://localhost:5000/aplicar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al aplicar al puesto.');
    }

    // Aquí podemos manejar la respuesta del servidor si es necesario

    // Mostrar una alerta al usuario para indicar que se ha aplicado correctamente
    window.alert(`Se ha aplicado al puesto "${selectedPuesto.Titulo}"`);
  } catch (error) {
    console.error(error);
    // Mostrar una alerta de error al usuario si la aplicación falla
    window.alert('Ha ocurrido un error al aplicar al puesto. Por favor, intenta nuevamente.');
  }
}

const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modal");
const modalCloseButtons = document.querySelectorAll(".modal-close");
const ButtonBack = document.querySelectorAll(".modal-Back");
modalTriggerButtons.forEach((elem) => {
  elem.addEventListener("click", (event) =>
    toggleModal(
      event.currentTarget.getAttribute("data-modal-target"),
      event.target
    )
  );
});
modalCloseButtons.forEach((elem) => {
  elem.addEventListener("click", (event) =>
    toggleModal(event.currentTarget.closest(".modal").id)
  );
});

ButtonBack.forEach((elem) => {
  elem.addEventListener("click", (event) =>
    toggleModal(event.currentTarget.closest(".modal").id)
  );
});
modals.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    if (event.currentTarget === event.target)
      toggleModal(event.currentTarget.id);
  });
});

function toggleModal(modalId, button) {
  if (modalId == "ModifyEmpleoModal") {
    if (button != undefined) {
      let id = button.dataset.id;
      if (id == undefined) {
        let puesto = button.parentNode;
        id = puesto.dataset.id;
      }
      let empleo = ListPuestos[id];
      document.getElementById("NombreEmpleo").value = empleo.Titulo;
      document.getElementById("RangoEmpleo").value = empleo.Rango;
      document.getElementById("RequisitosEmpleo").value = empleo.Requisitos;
      document.getElementById("AtributosEmpleo").value = empleo.Atributos;
      document.getElementById("TipoEmpleo").selectedIndex = empleo.Tipo;
    }
  }

  if (modalId == "InfoEmpleoModal") {
    if (button != undefined) {
      let id = button.dataset.id;
      if (id == undefined) {
        let puesto = button.parentNode;
        id = puesto.dataset.id;
      }

      let empleo = ListPuestos[id];
      document.getElementById("TitlePostulacion").innerText = empleo.Titulo;
      document.getElementById("RangoSalarialInfo").innerText = empleo.Rango;
      document.getElementById("RequesitoInfo").innerText = empleo.Requisitos;
      document.getElementById("AtributosInfo").innerText = empleo.Atributos;
      if (empleo.Tipo == 0) {
        document.getElementById("TipoInfo").innerText = "Privado";
      } else {
        document.getElementById("TipoInfo").innerText = "Publico";
      }
    }
  }

  const modal = document.getElementById(modalId);

  if (getComputedStyle(modal).display === "flex") {
    app.ui.cleanAlert();
    modal.classList.add("modal-hide");
    setTimeout(() => {
      document.body.style.overflow = "initial";
      modal.classList.remove("modal-show", "modal-hide");
      modal.style.display = "none";
    }, 200);
  } else {
    app.ui.cleanDOM();
    if (modalId == "EmpleoModal") {
      document.getElementById("NombreEmpleoAdd").value = "";
      document.getElementById("RangoEmpleoAdd").value = "";
      document.getElementById("RequisitosEmpleoAdd").value = "";
      document.getElementById("AtributosEmpleoAdd").value = "";
      document.getElementById("TipoEmpleoAdd").selectedIndex = 0;
    }
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
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
