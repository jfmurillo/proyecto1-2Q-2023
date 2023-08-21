var app = app || {};
let PerfilActual = {
  Titulo: "Nombre de la empresa",
  Logo: "/proyecto1-2Q-2023/vista-manager/assets/imagenDefault.png",
  Informacion: "Información de la empresa",
  Correo: "empresa@gmail.com",
  Imagen: "/proyecto1-2Q-2023/vista-manager/assets/imagenDefault.png",
  Estado: 1,
};

function RenderPerfil(Perfil) {
  let mainbox = document.getElementById("PerfilMain");
  mainbox.innerHTML = "";

  let TitlePerfil = document.createElement("div");
  TitlePerfil.classList.add("TitlePerfil");
  let title = document.createElement("h2");
  title.innerHTML = Perfil.Titulo;

  let Logo = document.createElement("img");
  Logo.setAttribute("src", Perfil.Logo);
  TitlePerfil.appendChild(title);
  TitlePerfil.appendChild(Logo);

  let InfoPerfil = document.createElement("div");
  InfoPerfil.classList.add("InfoPerfil");
  InfoPerfil.innerHTML =
    "<strong>" +
    Perfil.Correo +
    "</strong><p>" +
    Perfil.Informacion +
    '</p><button class="ButtonDesign" style="margin-bottom: 20px;"data-modal-target="ModifyPerfilModal">Editar perfil</button>';

  mainbox.appendChild(TitlePerfil);
  mainbox.appendChild(InfoPerfil);
}

RenderPerfil(PerfilActual);

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
  if (modalId == "ModifyPerfilModal") {
    document.getElementById("NombreEmpresa").value = PerfilActual.Titulo;
    document.getElementById("EmailEmpresa").value = PerfilActual.Correo;
    document.getElementById("InfoEmpresa").value = PerfilActual.Informacion;
    document.getElementById("EstadoEmpresa").selectedIndex =
      PerfilActual.Estado;
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
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
}

document
  .getElementById("UpdatePerfil")
  .addEventListener("click", function (event) {
    event.preventDefault();
    toggleModal("ModifyPerfilModal");
  });
