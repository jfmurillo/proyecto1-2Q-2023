var app = app || {};
let ListPuestos = [
  {
    Fecha: "7/7/2023",
    Titulo: "Nombre del empleo 1",
    Rango: "Rango 1",
    Requisitos: "Requesitos 1",
    Atributos: "Atributos 1",
    Tipo: 0,
    Imagen: "../assets/imagenDefault.png",
    Empresa: "Nombre de la empresa",
    Descripcion: "Descripción"
  }, {
    Fecha: "7/7/2023",
    Titulo: "Nombre del empleo 2",
    Rango: "Rango 2",
    Requisitos: "Requesitos 2",
    Atributos: "Atributos 2",
    Tipo: 1,
    Imagen: "../assets/imagenDefault.png",
    Empresa: "Nombre de la empresa",
    Descripcion: "Descripción"
  }, {
    Fecha: "7/7/2023",
    Titulo: "Nombre del empleo 3",
    Rango: "Rango 3",
    Requisitos: "Requesitos 3",
    Atributos: "Atributos 3",
    Tipo: 0,
    Imagen: "../assets/imagenDefault.png",
    Empresa: "Nombre de la empresa",
    Descripcion: "Descripción"
  }
]

function RenderApplications(ListApplications) {
  let mainbox = document.getElementById("Aplicaciones")

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
    ApplyButton.addEventListener("click", function() {
      window.alert("Se ha aplicado al puesto");
    });

    container.appendChild(Puesto)
    container.appendChild(ApplyButton)  // Append Apply Button to the container

    mainbox.appendChild(container)
  }

}

RenderApplications(ListPuestos)

// Escuchamos el evento click en los botones de Aplicar Puesto
const applyButtons = document.querySelectorAll(".apply-btn");
applyButtons.forEach(button => {
  button.addEventListener("click", event => {
    const id = event.target.parentElement.getAttribute("data-id");
    applyForJob(id);
  });
});

function applyForJob(id) {
  // Aquí puedes escribir la lógica para que el usuario aplique a un empleo
  console.log(`El usuario está aplicando para el empleo con id ${id}`);
}



const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modal");
const modalCloseButtons = document.querySelectorAll(".modal-close");
const ButtonBack = document.querySelectorAll(".modal-Back");
modalTriggerButtons.forEach(elem => {
  elem.addEventListener("click", event => toggleModal(event.currentTarget.getAttribute("data-modal-target"), event.target));
});
modalCloseButtons.forEach(elem => {
  elem.addEventListener("click", event => toggleModal(event.currentTarget.closest(".modal").id));
});

ButtonBack.forEach(elem => {
  elem.addEventListener("click", event => toggleModal(event.currentTarget.closest(".modal").id));
});
modals.forEach(elem => {
  elem.addEventListener("click", event => {
    if (event.currentTarget === event.target) toggleModal(event.currentTarget.id);
  });
});


function toggleModal(modalId, button) {

  if (modalId == "ModifyEmpleoModal") {
    if (button != undefined) {
      let id = button.dataset.id
      if (id == undefined) {
        let puesto = button.parentNode;
        id = puesto.dataset.id
      }
      let empleo = ListPuestos[id];
      document.getElementById("NombreEmpleo").value = empleo.Titulo
      document.getElementById("RangoEmpleo").value = empleo.Rango
      document.getElementById("RequisitosEmpleo").value = empleo.Requisitos
      document.getElementById("AtributosEmpleo").value = empleo.Atributos
      document.getElementById("TipoEmpleo").selectedIndex = empleo.Tipo
    }

  }

  if (modalId == "InfoEmpleoModal") {
    if (button != undefined) {
      let id = button.dataset.id
      if (id == undefined) {
        let puesto = button.parentNode;
        id = puesto.dataset.id
      }

      let empleo = ListPuestos[id];
      document.getElementById("TitlePostulacion").innerText = empleo.Titulo
      document.getElementById("RangoSalarialInfo").innerText = empleo.Rango
      document.getElementById("RequesitoInfo").innerText = empleo.Requisitos
      document.getElementById("AtributosInfo").innerText = empleo.Atributos
      if (empleo.Tipo == 0) {
        document.getElementById("TipoInfo").innerText = "Privado"
      }
      else {
        document.getElementById("TipoInfo").innerText = "Publico"
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
  }
  else {
    app.ui.cleanDOM();
    if (modalId == "EmpleoModal") {
      document.getElementById("NombreEmpleoAdd").value = ""
      document.getElementById("RangoEmpleoAdd").value = ""
      document.getElementById("RequisitosEmpleoAdd").value = ""
      document.getElementById("AtributosEmpleoAdd").value = ""
      document.getElementById("TipoEmpleoAdd").selectedIndex = 0
    }
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
};