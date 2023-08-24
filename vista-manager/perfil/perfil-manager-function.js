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
    Titulo: usuario.nombre,
    Logo: "../../NodeServer/" + localStorage.getItem("CompanyLogo"),
    Informacion: Empresa.nombreEmpresa,
    Correo: usuario.email,
    Imagen: "../../NodeServer/" + localStorage.getItem("CompanyLogo"),
    Estado: 0,
    Rol: usuario.role
  }

  RenderPerfil(PerfilActual)

  document.getElementById("LogoEmpresa").setAttribute("src", localStorage.getItem("CompanyLogo"))
  document.getElementById("AvatarUser").setAttribute("src", localStorage.getItem("Avatar"))

}


function RenderPerfil(Perfil) {
  let mainbox = document.getElementById("PerfilMain")
  mainbox.innerHTML = "";

  let TitlePerfil = document.createElement("div");
  TitlePerfil.classList.add("TitlePerfil");
  let title = document.createElement("h2");
  title.innerHTML = Perfil.Titulo;


  TitlePerfil.appendChild(title);

  let InfoPerfil = document.createElement("div");
  InfoPerfil.classList.add("InfoPerfil");
  InfoPerfil.innerHTML = '<div class="UserLogo" > <img style="height: 300px;width: 300px;" src = ' + localStorage.getItem('Avatar') + ' /></div><button style="background: #1e3231;color: white;width: 130px;height: 30px;" id="UserBTN">Cambiar Avatar</button>' + '<strong>' + Perfil.Correo + '</strong><p>' + Perfil.Informacion + '</strong><p>' + Perfil.Rol
  let myWidgetUsuario = cloudinary.createUploadWidget(
    {
      cloudName: "dk2x7l0kq",
      uploadPreset: "m6fhzjcs",
    },
    async (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        try {
          const UpdatUser = await fetch("http://localhost:5000/users/update/Logo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: localStorage.getItem('iduser'), img: result.info.url }),
          });

          if (UpdatUser.ok) {
            let reporte = {
              Tipo: "Actualizar avatar usuario",
              Descripcion: "Se a actualizado el avatar del usuario " + Perfil.NombreUsuario,
              Titulo: "Actualización de avatar usuario",
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
                localStorage.setItem("Avatar", result.info.url);
                window.location.reload()
              } else {
                console.error("Error al crear el reporte");
              }

            } catch (error) {
              console.error(error);
            }
          } else {
            alert("Error al actualizar el usuario");
          }
        } catch (error) {
          console.error(error);
          alert("Error al actualizar el usuario");
        }

      }
    }
  );

  mainbox.appendChild(TitlePerfil)
  mainbox.appendChild(InfoPerfil)

  document.getElementById("UserBTN").addEventListener(
    "click",
    function () {
      myWidgetUsuario.open();
    },
    false
  );
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
  if (modalId == "ModifyPerfilModal") {
    document.getElementById("NombreUser").value = PerfilActual.Titulo
    document.getElementById("EmailUser").value = PerfilActual.Correo
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

  let User = {
    id: localStorage.getItem('iduser'),
    nombre: formModify.NombreUser.value,
    email: formModify.EmailUser.value,
    password: formModify.contraUser.value,
  }


  try {
    const UpdateUser = await fetch("http://localhost:5000/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    });

    if (UpdateUser.ok) {
      alert("usuario actualizado");

      let reporte = {
        Tipo: "Actualizar perfil",
        Descripcion: "Se a actualizado el perfil de usuario " + User.nombre,
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
