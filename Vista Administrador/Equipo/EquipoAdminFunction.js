var app = app || {};

let datos = [];
let idUserSelect;
window.onload = async function () {
  document
    .getElementById("SendEmployed")
    .addEventListener("click", invitarUsuario);
  if (!localStorage.getItem("iduser")) {
    window.location.href = "../../Login/login.html";
  }

  const EquipoRequest = await fetch(
    "http://localhost:5000/users/empresa/" + localStorage.getItem("idempresa")
  );
  const Equipo = await EquipoRequest.json();
  console.log(Equipo);

  let cont = 1;
  Equipo.forEach(function (colaborador) {
    let colaboradorOrder = {
      Rol: colaborador.role,
      CodRol: 1,
      Usuario: colaborador.nombre,
      Correo: colaborador.email,
      id: colaborador._id,
    };

    if (colaborador.role == "admin") {
      colaboradorOrder.CodRol = 2;
    } else if (colaborador.role == "reclutador") {
      colaboradorOrder.CodRol = 0;
    } else if (colaborador.role == "manager") {
      colaboradorOrder.CodRol = 1;
    }

    datos.push(colaboradorOrder);
    cont++;
  });
  renderTeam();
  document
    .getElementById("LogoEmpresa")
    .setAttribute(
      "src",
      localStorage.getItem("CompanyLogo")
    );
  document
    .getElementById("AvatarUser")
    .setAttribute("src", localStorage.getItem("Avatar"));
};

let listErrors = [];

function renderTeam() {
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
    if (!(celdaRol.textContent == "admin")) {
      celdaAction.innerHTML =
        '<button class="EditButton" data-id="' +
        datos[i].id +
        '" data-modal-target="modalModifi"></button>';
    }
    fila.appendChild(celdaAction);

    tabla.appendChild(fila);
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
  if (modalId == "modalModifi") {
    if (button != undefined) {
      let id = button.dataset.id;
      let Member = datos.find((objeto) => objeto.id == id);
      document.getElementById("NombreEmployed").value = Member.Usuario;
      document.getElementById("CorreoEmployed").value = Member.Correo;
      document.getElementById("RolEmployed").selectedIndex = Member.CodRol;
      idUserSelect = Member.id;
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
    if (modalId == "InviteModal") {
      document.getElementById("EmailInvitacion").value = "";
      document.getElementById("RolInvitacion").selectedIndex = 0;
    }
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
}

document
  .getElementById("AddEmployedForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    await invitarUsuario()
    toggleModal("InviteModal");
  });

document.getElementById("AddEmployedForm").addEventListener(
  "invalid",
  function (event) {
    event.preventDefault();
    const invalidElement = event.target;
    OrderErrors(invalidElement);
  },
  true
);

document
  .getElementById("ModifyEmployedForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    app.ui.cleanDOM();

    let formModify = document.getElementById("ModifyEmployedForm");

    let usuario = {
      id: idUserSelect,
      nombre: formModify.NombreEmployed.value,
      email: formModify.CorreoEmployed.value,
      role: formModify.RolEmployed.value == 1 ? "reclutador" : "manager",
    };

    if (UpdateUser.ok) {
      alert("Usuario actualizado");
      let reporte = {
        Tipo: "Usuario actualizado",
        Descripcion:
          "Se a actualizado al usuario " +
          usuario.nombre +
          "con el correo " +
          usuario.email,
        Titulo: "Actualización de usuario",
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

    toggleModal("modalModifi");
  });

document.getElementById("ModifyEmployedForm").addEventListener(
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

async function invitarUsuario() {
  try {
    console.log("invitarUsuario");
    const emailInv = document.getElementById("EmailInvitacion").value;
    const rolInv = document.getElementById("RolInvitacion").value;
    console.log(emailInv, rolInv);

    const valoresHtml = await fetch("http://localhost:5000/invitarUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInv,
        rol: rolInv,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}
