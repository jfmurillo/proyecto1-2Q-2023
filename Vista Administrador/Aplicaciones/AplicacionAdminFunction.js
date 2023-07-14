var app = app || {};
let listErrors = []
let ListPuestos = [
  {
    Fecha: "7/7/2023",
    Titulo: "Nombre del empleo 1",
    Rango: "Rango 1",
    Requisitos: "Requesitos 1",
    Atributos: "Atributos 1",
    Tipo: 0,
    Imagen: "../assets/imagenDefault.png",
    Descripcion: "Descripcion",
    Postulantes: [
      { Nombre: "Sebastian", Estado: "Enviado" },
      { Nombre: "Douglas", Estado: "En revision" }
    ],
  }, {
    Fecha: "7/7/2023",
    Titulo: "Nombre del empleo 2",
    Rango: "Rango 2",
    Requisitos: "Requesitos 2",
    Atributos: "Atributos 2",
    Tipo: 1,
    Imagen: "../assets/imagenDefault.png",
    Descripcion: "Descripcion",
    Postulantes: [
      { Nombre: "Eliot", Estado: "En revision" }
    ],
  }, {
    Fecha: "7/7/2023",
    Titulo: "Nombre del empleo 3",
    Rango: "Rango 3",
    Requisitos: "Requesitos 3",
    Atributos: "Atributos 3",
    Tipo: 0,
    Imagen: "../assets/imagenDefault.png",
    Descripcion: "Descripcion",
    Postulantes: []
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

    let EditButton = document.createElement("button");
    EditButton.classList.add("EditButton");
    EditButton.setAttribute("data-modal-target", "ModifyEmpleoModal");
    EditButton.setAttribute("data-id", ListApplications.indexOf(application));


    let FechaApplication = document.createElement("small");
    let TituloApplication = document.createElement("h3");
    let ImagenApplication = document.createElement("img");
    let DescripcionApplication = document.createElement("p");

    FechaApplication.textContent = application.Fecha;
    TituloApplication.textContent = application.Titulo;
    DescripcionApplication.textContent = application.Descripcion;
    ImagenApplication.src = application.Imagen;


    Puesto.appendChild(FechaApplication);
    Puesto.appendChild(TituloApplication);
    Puesto.appendChild(ImagenApplication);
    Puesto.appendChild(DescripcionApplication);

    container.appendChild(EditButton)
    container.appendChild(Puesto)

    mainbox.appendChild(container)
  }

}

RenderApplications(ListPuestos)



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

      let tabla = document.getElementById("AplicationTable");
      tabla.innerHTML = "<thead><th>Usuario</th><th>Estado</th></thead>";
      for (let i = 0; i < empleo.Postulantes.length; i++) {
        let fila = document.createElement("tr");


        let celdaUsuario = document.createElement("td");
        celdaUsuario.textContent = empleo.Postulantes[i].Nombre;
        fila.appendChild(celdaUsuario);

        let celdaEstado = document.createElement("td");
        celdaEstado.textContent = empleo.Postulantes[i].Estado;
        fila.appendChild(celdaEstado);

        tabla.appendChild(fila);
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

    if (modalId == "AddAplicanteModal") {
      document.getElementById("InviteAplicMensaje").value = ""
      document.getElementById("InviteAplicCorreo").value = ""
    }
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
}


document.getElementById("AddEmpleoForm").addEventListener("submit", function (event) {
  event.preventDefault()
  app.ui.cleanDOM()
  toggleModal("EmpleoModal")
});

document.getElementById("AddEmpleoForm").addEventListener('invalid', function (event) {
  event.preventDefault();
  const invalidElement = event.target;
  OrderErrors(invalidElement)
}, true);



document.getElementById("InvitarAplicanteForm").addEventListener("submit", function (event) {
  event.preventDefault()
  app.ui.cleanDOM()
  toggleModal("AddAplicanteModal")
});

document.getElementById("InvitarAplicanteForm").addEventListener('invalid', function (event) {
  event.preventDefault();
  const invalidElement = event.target;
  OrderErrors(invalidElement)
}, true);



document.getElementById("ModifyEmpleoForm").addEventListener("submit", function (event) {
  event.preventDefault()
  app.ui.cleanDOM()
  toggleModal("ModifyEmpleoModal")
});

document.getElementById("ModifyEmpleoForm").addEventListener('invalid', function (event) {
  event.preventDefault();
  const invalidElement = event.target;
  OrderErrors(invalidElement)
}, true);

function OrderErrors(ElementHtml) {

  if (listErrors.length > 0) {
    if (!(listErrors.includes(ElementHtml))) {
      listErrors.push(ElementHtml)
    }
    app.ui.AlertError();
    app.ui.AddError(listErrors);
  } else {
    listErrors.push(ElementHtml)
    app.ui.AlertError();
    app.ui.AddError(listErrors);
  }

  listErrors = [];
};

