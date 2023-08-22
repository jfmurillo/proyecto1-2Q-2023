var app = app || {};
let PerfilActual;


window.onload = async function () {
  if (!localStorage.getItem('iduser')) {
    window.location.href = '../../Login/login.html';
  }
  const RepuestaEmpresa = await fetch("http://localhost:5000/empresas/" + localStorage.getItem('idempresa'));
  const Empresa = await RepuestaEmpresa.json();

  const Repuestausuario = await fetch("http://localhost:5000/users/" + localStorage.getItem('iduser'));
  const usuario = await Repuestausuario.json();
  PerfilActual = {
    Titulo: localStorage.getItem("CompanyName"),
    Logo: "../../NodeServer/" + localStorage.getItem("CompanyLogo"),
    Informacion: Empresa.InfoEmpresa,
    Correo: Empresa.email,
    Imagen: "../../NodeServer/" + localStorage.getItem("CompanyLogo"),
    Estado: 0,
    NombreUsuario: usuario.nombre,
    EmailUsuario: usuario.email,
  }

  document.getElementById("LogoEmpresa").setAttribute("src", "../../NodeServer/" + localStorage.getItem("CompanyLogo"))
  document.getElementById("AvatarUser").setAttribute("src", "../../NodeServer/" + localStorage.getItem("Avatar"))
  RenderPerfil(PerfilActual)

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
};



function RenderPerfil(Perfil) {
  let mainbox = document.getElementById("PerfilMain")
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
  InfoPerfil.innerHTML = '<strong>' + Perfil.Correo + '</strong><p>' + Perfil.Informacion + '</p><button class="ButtonDesign" style="margin-bottom: 20px;"data-modal-target="ModifyPerfilModal">Editar perfil</button>'

  mainbox.appendChild(TitlePerfil)
  mainbox.appendChild(InfoPerfil)


}







function toggleModal(modalId, button) {
  if (modalId == "ModifyPerfilModal") {
    document.getElementById("NombreEmpresa").value = PerfilActual.Titulo
    document.getElementById("EmailEmpresa").value = PerfilActual.Correo
    document.getElementById("InfoEmpresa").value = PerfilActual.Informacion;
    document.getElementById("EstadoEmpresa").selectedIndex = PerfilActual.Estado;
    document.getElementById("NombreAdmin").value = PerfilActual.NombreUsuario;
    document.getElementById("Emailadmin").value = PerfilActual.EmailUsuario;
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
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
}

document.getElementById("ModifyPerfilForm").addEventListener("submit", async function (event) {
  event.preventDefault()



  let formModify = document.getElementById("ModifyPerfilForm")

  let perfilAdmin = {
    id: localStorage.getItem('idempresa'),
    iduser: localStorage.getItem('iduser'),
    nombre: formModify.NombreEmpresa.value,
    email: formModify.EmailEmpresa.value,
    info: formModify.InfoEmpresa.value,
    password: formModify.contraadmin.value,
    usuario: formModify.NombreAdmin.value,
    emailuser: formModify.Emailadmin.value,
  }


  try {
    const Updateempresa = await fetch("http://localhost:5000/empresa/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(perfilAdmin),
    });

    if (Updateempresa.ok) {
      alert("empresa actualizada");

      let reporte = {
        Tipo: "Actualizar perfil",
        Descripcion: "Se a actualizado el perfil de empresa " + perfilAdmin.nombre,
        Titulo: "Actualización de perfil",
        empresa: localStorage.getItem("idempresa")
      }

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
      alert("Error al actualizar el perfil");
    }
  } catch (error) {
    console.error(error);
    alert("Error al actualizar el perfil");
  }


  toggleModal("ModifyPerfilModal")

});
