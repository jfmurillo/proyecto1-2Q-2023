let ListPuestos = [];
let idEmpleoSelect;
window.onload = async function () {
  if (!localStorage.getItem("iduser")) {
    window.location.href = "../../Login/login.html";
  }
  loadpuestos().then((list) => RenderApplications(list));

  document.getElementById("LogoEmpresa").setAttribute("src", localStorage.getItem("CompanyLogo"))
  document.getElementById("AvatarUser").setAttribute("src", localStorage.getItem("Avatar"))

};

var app = app || {};
let listErrors = [];

async function loadpuestos() {
  let list = [];
  const RepuestaPuestos = await fetch(
    "http://localhost:5000/puesto/" + localStorage.getItem("idempresa")
  );
  const Puestos = await RepuestaPuestos.json();

  const RepuestaEmpresa = await fetch("http://localhost:5000/empresas/" + Puestos[0].Empresa);
  const Empresa = await RepuestaEmpresa.json();

  console.log(Puestos)

  console.log(Puestos);

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

    const dia = fecha.getDate().toString().padStart(2, "0"); // Agregar ceros a la izquierda si es necesario
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript son indexados desde 0, por lo que sumamos 1
    const anio = fecha.getFullYear();

    puestoOrder.Fecha = `${dia}/${mes}/${anio}`;

    list.push(puestoOrder);
  });

  return list;
}

function RenderApplications(ListApplications) {
  ListPuestos = ListApplications;
  let mainbox = document.getElementById("Aplicaciones");
  mainbox.innerHTML = "";

  document.getElementById("BotonAddmodal").innerHTML = " ";
  document.getElementById("BotonAddmodal").innerHTML =
    "<div class='Botonera'><button class='modal-Back ButtonDesign' type='reset'>Regresar</ ><button class='ButtonDesign' type='submit'id='CreatePuesto'>Crear puesto</button></div >";
  document.getElementById("AddEmployed").innerHTML = " ";
  document.getElementById("AddEmployed").innerHTML =
    "<button class='AddButton' data-modal-target='EmpleoModal'><i class='fa-solid fa-plus'></i></button>";
  document.getElementById("AplicationButton").innerHTML = " ";
  document.getElementById("AplicationButton").innerHTML =
    '<button class="AddButton" data-modal-target="AddAplicanteModal"><i class="fa-solid fa-plus"></i></button>';

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

    container.appendChild(EditButton);
    container.appendChild(Puesto);

    mainbox.appendChild(container);
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
}

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
      document.getElementById("DescripEmpleo").innerText = empleo.Descripcion;
      idEmpleoSelect = empleo.id;
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
      // document.getElementById("InviteAplicMensaje").value = ""
      document.getElementById("InviteAplicCorreo").value = "";
    }
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
}

document
  .getElementById("AddEmpleoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    app.ui.cleanDOM();

    let puesto = {
      nombre: document.getElementById("NombreEmpleoAdd").value,
      Rango: document.getElementById("RangoEmpleoAdd").value,
      Requisitos: document.getElementById("RequisitosEmpleoAdd").value,
      Atributos: document.getElementById("AtributosEmpleoAdd").value,
      Tipo: document.getElementById("TipoEmpleoAdd").selectedIndex,
      Descripcion: " ",
      Aplicantes: [],
      Empresa: localStorage.getItem("idempresa"),
    };

    try {
      const PuestoCreado = await fetch("http://localhost:5000/puesto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(puesto),
      });

      if (PuestoCreado.ok) {
        alert("Puesto creado exitosamente");
        const puesto = await PuestoCreado.json();
        let reporte = {
          Tipo: "Creacion puesto",
          Descripcion: "Se a creado el puesto " + puesto.nombrePuesto,
          Titulo: "Creacion de puesto",
          empresa: localStorage.getItem("idempresa"),
        };

        try {
          const reporteCreado = await fetch("http://localhost:5000/reporte", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reporte),
          });
          if (reporteCreado.ok) {
            window.location.reload();
          } else {
            console.error("Error al crear el reporte");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Error al crear el puesto");
        alert("Error al crear el puesto");
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear el puesto");
    }

    toggleModal("EmpleoModal");
  });

document.getElementById("AddEmpleoForm").addEventListener(
  "invalid",
  function (event) {
    event.preventDefault();
    const invalidElement = event.target;
    OrderErrors(invalidElement);
  },
  true
);

let formapli = document.getElementById("InvitarAplicanteForm");

formapli.addEventListener("submit", function (event) {
  event.preventDefault();
  app.ui.cleanDOM();
  toggleModal("AddAplicanteModal");
});

formapli.addEventListener(
  "invalid",
  function (event) {
    event.preventDefault();
    const invalidElement = event.target;
    OrderErrors(invalidElement);
  },
  true
);

document
  .getElementById("ModifyEmpleoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    app.ui.cleanDOM();

    let formModify = document.getElementById("ModifyEmpleoForm");

    let puesto = {
      id: idEmpleoSelect,
      nombre: formModify.NombreEmpleo.value,
      Rango: formModify.RangoEmpleo.value,
      Requisitos: formModify.RequisitosEmpleo.value,
      Atributos: formModify.AtributosEmpleo.value,
      Tipo: formModify.TipoEmpleo.selectedIndex,
      Descripcion: formModify.DescripEmpleo.value,
      Aplicantes: {},
    };

    try {
      const UpdatePuesto = await fetch("http://localhost:5000/puesto/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(puesto),
      });

      if (UpdatePuesto.ok) {
        alert("Puesto actualizado");

        let reporte = {
          Tipo: "Actualizar puesto",
          Descripcion: "Se a actualizado el puesto " + puesto.nombre,
          Titulo: "Actualización de puesto",
          empresa: localStorage.getItem("idempresa"),
        };

        try {
          const reporteCreado = await fetch("http://localhost:5000/reporte", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reporte),
          });

          if (reporteCreado.ok) {
            window.location.reload();
          } else {
            console.error("Error al crear el reporte");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Error al actualizar un puesto");
        alert("Error al actualizar un puesto");
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar un puesto");
    }

    toggleModal("ModifyEmpleoModal");
  });

document.getElementById("ModifyEmpleoForm").addEventListener(
  "invalid",
  function (event) {
    event.preventDefault();
    const invalidElement = event.target;
    OrderErrors(invalidElement);
  },
  true
);

function OrderErrors(ElementHtml) {
  if (listErrors.length > 0) {
    if (!listErrors.includes(ElementHtml)) {
      listErrors.push(ElementHtml);
    }
    app.ui.AlertError();
    app.ui.AddError(listErrors);
  } else {
    listErrors.push(ElementHtml);
    app.ui.AlertError();
    app.ui.AddError(listErrors);
  }

  listErrors = [];
}

document
  .getElementById("deletePuesto")
  .addEventListener("click", async function () {
    event.preventDefault();

    try {
      const DeletePuesto = await fetch(
        "http://localhost:5000/puesto/delete/" + idEmpleoSelect,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (DeletePuesto.ok) {
        alert("Puesto Eliminado");
        const puesto = await DeletePuesto.json();

        let reporte = {
          Tipo: "Eliminación puesto",
          Descripcion: "Se a eliminado el puesto " + puesto.nombrePuesto,
          Titulo: "Eliminación de puesto",
          empresa: localStorage.getItem("idempresa"),
        };

        try {
          const reporteCreado = await fetch("http://localhost:5000/reporte", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reporte),
          });
          if (reporteCreado.ok) {
            window.location.reload();
          } else {
            console.error("Error al crear el reporte");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Error al eliminar un puesto");
        alert("Error al eliminar un puesto");
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar un puesto");
    }

    toggleModal("ModifyEmpleoModal");
  });

async function invitarUsuario() {
  try {
    console.log("invitarUsuario");
    const emailInv = document.getElementById("EmailInvitacion").value;
    const rolInv = document.getElementById("RolInvitacion").value;
    console.log(emailInv, rolInv);

    const valoresHtml = await fetch(
      "http://localhost:5000/invitarUsuario/" +
      localStorage.getItem("idempresa"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInv,
          rol: rolInv,
        }),
      }
    );
  } catch (error) {
    console.error(error);
  }
}
