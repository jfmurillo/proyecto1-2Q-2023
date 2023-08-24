

let ListPuestos = [];
let idEmpleoSelect;
window.onload = async function () {
  if (!localStorage.getItem('iduser')) {
    window.location.href = '../../Login/login.html';
  }
  loadpuestos()
    .then(list => RenderApplications(list))

  document.getElementById("LogoEmpresa").setAttribute("src", localStorage.getItem("CompanyLogo"))
  document.getElementById("AvatarUser").setAttribute("src", localStorage.getItem("Avatar"))
};

var app = app || {};
let listErrors = []


async function loadpuestos() {

  let list = []
  const RepuestaPuestos = await fetch("http://localhost:5000/puesto/" + localStorage.getItem('idempresa'));
  const Puestos = await RepuestaPuestos.json();
  const RepuestaEmpresa = await fetch("http://localhost:5000/empresas/" + Puestos[0].Empresa);
  const Empresa = await RepuestaEmpresa.json();


  console.log(Puestos)
  Puestos.forEach(function (puesto) {
    let puestoOrder = {
      id: puesto._id,
      Titulo: puesto.nombrePuesto,
      Rango: puesto.RangoSalarialPuesto,
      Requisitos: puesto.RequisitosPuesto,
      Atributos: puesto.AtributosPuesto,
      Tipo: puesto.TipoPuesto,
      Imagen: Empresa.ImgEmpresa,
      Descripcion: puesto.DescripcionPuesto,
      Postulantes: puesto.AplicantesPuesto,
    };

    const fecha = new Date(puesto.updatedAt);

    const dia = fecha.getDate().toString().padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son indexados desde 0, por lo que sumamos 1
    const anio = fecha.getFullYear();

    puestoOrder.Fecha = `${dia}/${mes}/${anio}`;

    list.push(puestoOrder)
  });

  return list
}

function RenderApplications(ListApplications) {
  ListPuestos = ListApplications
  let mainbox = document.getElementById("Aplicaciones")
  mainbox.innerHTML = "";

  document.getElementById("AplicationButton").innerHTML = " ";
  document.getElementById("AplicationButton").innerHTML = '<button class="AddButton" data-modal-target="AddAplicanteModal"><i class="fa-solid fa-plus"></i></button>';


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
    let DescripcionApplication = document.createElement("p");

    FechaApplication.textContent = application.Fecha;
    TituloApplication.textContent = application.Titulo;
    DescripcionApplication.textContent = application.Descripcion;
    ImagenApplication.src = application.Imagen;


    Puesto.appendChild(FechaApplication);
    Puesto.appendChild(TituloApplication);
    Puesto.appendChild(ImagenApplication);
    Puesto.appendChild(DescripcionApplication);
    container.appendChild(Puesto)

    mainbox.appendChild(container)
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
  } else {
    app.ui.cleanDOM();
    if (modalId == "EmpleoModal") {
      document.getElementById("NombreEmpleoAdd").value = "";
      document.getElementById("RangoEmpleoAdd").value = "";
      document.getElementById("RequisitosEmpleoAdd").value = "";
      document.getElementById("AtributosEmpleoAdd").value = "";
      document.getElementById("TipoEmpleoAdd").selectedIndex = 0;
    }

    if (modalId == "AddAplicanteModal") {
      document.getElementById("InviteAplicCorreo").value = "";
    }
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
}

document
  .getElementById("SendInviteAplic")
  .addEventListener("click", function (event) {
    event.preventDefault();
    toggleModal("AddAplicanteModal");
  });

async function invitarPuesto() {
  try {
    console.log("invitarPuesto");
    const emailInv = document.getElementById("InviteAplicCorreo").value;
    console.log(emailInv);
    const empresa_id = localStorage.getItem("idempresa");

    const valoresHtml = await fetch(`http://localhost:5000/invitarPuesto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInv,
        empresa_id: empresa_id,
        rol: "finalUser",
      }),
    });
  } catch (error) {
    console.error(error);
  }
}
