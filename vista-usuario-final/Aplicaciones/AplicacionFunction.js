let ListPuestos = [];
let companyNamesCache = {};

window.onload = async function () {
  if (!localStorage.getItem('iduser')) {
      window.location.href = '../../Login/login.html';
  }

  loadPuestosFromAPI();
  let companyNameElem = document.getElementById("CompanyName");
  if(companyNameElem) {
      companyNameElem.innerHTML = localStorage.getItem("CompanyName");
  }

  let logoEmpresaElem = document.getElementById("LogoEmpresa");
  if(logoEmpresaElem) {
      logoEmpresaElem.setAttribute("src", "../../NodeServer/" + localStorage.getItem("CompanyLogo"));
  }

  let perfilEmpresaElem = document.getElementById("PerfilEmpresa");
  if(perfilEmpresaElem) {
      perfilEmpresaElem.setAttribute("src", "../../NodeServer/" + localStorage.getItem("CompanyLogo"));
  }

  let avatarUserElem = document.getElementById("AvatarUser");
  if(avatarUserElem) {
      avatarUserElem.setAttribute("src", "../../NodeServer/" + localStorage.getItem("Avatar"));
  }
  
};

async function loadPuestosFromAPI() {
  const RepuestaPuestos = await fetch("http://localhost:5000/puesto/");
  const Puestos = await RepuestaPuestos.json();
  console.log(Puestos);

  let contador = 0;

  for (let puesto of Puestos) {
      if (contador < 10) {
          let companyName = "";

          // Si el nombre de la empresa ya está en caché, úsalo. De lo contrario, realiza la solicitud.
          if(companyNamesCache[puesto.Empresa]) {
              companyName = companyNamesCache[puesto.Empresa];
          } else {

            const empresaResponse = await fetch(`http://localhost:5000/empresas/${puesto.Empresa}`);
            let contentType = empresaResponse.headers.get("Content-Type");
          
            const empresaData = await empresaResponse.text();
            try {
                const empresa = JSON.parse(empresaData);
                companyName = empresa.nombreEmpresa;
                companyNamesCache[puesto.Empresa] = companyName; // Guardar en caché
            } catch (error) {
                console.error("Error al parsear la respuesta:", empresaData);
            }

              
          }

          let puestoOrder = {
            _id: puesto._id,
            Imagen: "../assets/imagenDefault.png",
            Descripcion: puesto.DescripcionPuesto,
            Titulo: puesto.nombrePuesto,
            Empresa: companyName // Usar el nombre de la empresa en lugar del ID
          };
            const fecha = new Date(puesto.updatedAt);

            const dia = fecha.getDate().toString().padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son indexados desde 0, por lo que sumamos 1
            const anio = fecha.getFullYear();

            puestoOrder.Fecha = `${dia}/${mes}/${anio}`;

            ListPuestos.push(puestoOrder);
            contador++;
        }
    };
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

    let ApplyButton = document.createElement("button");
    ApplyButton.classList.add("apply-btn");
    ApplyButton.textContent = "Aplicar Puesto";
    ApplyButton.setAttribute("data-puesto-id", application._id);

    ApplyButton.addEventListener("click", async function() {
      const puestoId = this.getAttribute("data-puesto-id"); 
      console.log("puestoId:", puestoId); 
      try {
        const puestoResponse = await fetch(`http://localhost:5000/puestos/${puestoId}`);
        if (!puestoResponse.ok) {
          console.error("Error al obtener el puesto:", await puestoResponse.text());
          return;
        }
        const puesto = await puestoResponse.json();
        console.log("Datos del puesto:", puesto);

        const empresaResponse = await fetch(`http://localhost:5000/empresas/${puesto.Empresa}`);
        if (!empresaResponse.ok) {
          console.error("Error al obtener la empresa:", await empresaResponse.text());
          return;
        }
        const empresa = await empresaResponse.json();

        const applicationData = {
          companyName: empresa.nombreEmpresa,
          puestoDescription: application.Descripcion,
          puestoStatus: 'Enviada',
          userId: localStorage.getItem("idempresa")
        };

        await applyForJob(applicationData);
        
      } catch (error) {
        console.error("Error al aplicar para el puesto", error);
      }
    });

    container.appendChild(Puesto);
    container.appendChild(ApplyButton);
    mainbox.appendChild(container);
}}

RenderApplications(ListPuestos);

if(document.querySelector('.apply-btn')) {
  document.querySelector('.apply-btn').addEventListener('click', async function(e) {
    const puestoId = e.target.getAttribute('data-puesto-id');
    try {
      const response = await fetch(`http://localhost:5000/puesto/${puestoId}`);
      const puesto = await response.json();

      const applicationData = {
        companyName: localStorage.getItem("CompanyName"), // suponiendo que tienes el nombre de la empresa en localStorage
        puestoDescription: puesto.DescripcionPuesto,
        puestoStatus: 'Enviada' // ejemplo de estado, puedes adaptarlo según tus necesidades
      };

      applyForJob(applicationData);

    } catch (error) {
      console.error("Error al obtener el puesto", error);
    }
  });
}

async function applyForJob(data) {
  try {
    const response = await fetch('http://localhost:5000/aplicar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log("Aplicación guardada");
    } else {
      console.error("Error al guardar la aplicación");
    }
  } catch (error) {
    console.error("Error al enviar la aplicación", error);
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

      // Cambiar la imagen del avatar del usuario
      const avatarImg = document.querySelector(".UserLogo img");
      if (avatarImg) {
        avatarImg.src = data.foto;
        avatarImg.alt = "Avatar del usuario";
      }

    })
    .catch(error => {
      console.error("Hubo un error al obtener el perfil:", error);
    });
});


