let ListPuestos = [];

window.onload = async function () {
    
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

    container.appendChild(Puesto);

    mainbox.appendChild(container);
  }
}

RenderApplications(ListPuestos);


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
