var app = app || {};
let listErrors = []
let datos = [
  {
    Rol: "Manager",
    CodRol: 1,
    Usuario: "Sebastian",
    Correo: "sebas.alba1236@gmail.com",
    id: 1
  },
  {
    Rol: "Reclutador",
    CodRol: 0,
    Usuario: "Eliot",
    Correo: "eliot.rojas221@gmail.com",
    id: 2
  }
];

let tabla = document.getElementById("TeamTable");

for (let i = 0; i < datos.length; i++) {
  let fila = document.createElement("tr");

  let celdaRol = document.createElement("td");
  celdaRol.textContent = datos[i].Rol;
  fila.appendChild(celdaRol);

  let celdaUsuario = document.createElement("td");
  celdaUsuario.textContent = datos[i].Usuario;
  fila.appendChild(celdaUsuario);

  let celdaAction = document.createElement("td");
  celdaAction.innerHTML = '<button class="EditButton" data-id="' + datos[i].id + '" data-modal-target="modalModifi"></button>'
  fila.appendChild(celdaAction)

  tabla.appendChild(fila);
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

  if (modalId == "modalModifi") {
    if (button != undefined) {

      let id = button.dataset.id
      let Member = datos.find(objeto => objeto.id == id);
      document.getElementById("NombreEmployed").value = Member.Usuario
      document.getElementById("CorreoEmployed").value = Member.Correo
      document.getElementById("RolEmployed").selectedIndex = Member.CodRol;
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
    if (modalId == "InviteModal") {
      document.getElementById("EmailInvitacion").value = "";
      document.getElementById("MensajeInvitacion").value = "";
      document.getElementById("RolInvitacion").selectedIndex = 0;
    }
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
}


document.getElementById("AddEmployedForm").addEventListener("submit", function (event) {
  event.preventDefault()
  toggleModal("InviteModal")
});

document.getElementById("AddEmployedForm").addEventListener("invalid", function (event) {
  event.preventDefault();
  const invalidElement = event.target;
  OrderErrors(invalidElement)
}, true);


document.getElementById("ModifyEmployedForm").addEventListener("submit", function (event) {
  event.preventDefault()
  app.ui.cleanDOM()
  toggleModal("modalModifi")
});

document.getElementById("ModifyEmployedForm").addEventListener('invalid', function (event) {
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







