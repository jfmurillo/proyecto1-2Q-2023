var app = app || {};
let PerfilActual;
let imgEmpresa;

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
    Logo: localStorage.getItem("CompanyLogo"),
    Informacion: Empresa.InfoEmpresa,
    Correo: Empresa.email,
    Imagen: localStorage.getItem("CompanyLogo"),
    Estado: 0,
    NombreUsuario: usuario.nombre,
    EmailUsuario: usuario.email,
  }

  document.getElementById("LogoEmpresa").setAttribute("src", localStorage.getItem("CompanyLogo"))
  document.getElementById("AvatarUser").setAttribute("src", localStorage.getItem("Avatar"))
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
  Logo.setAttribute("id", "ImgEmpresa");
  let buton = document.createElement("button");
  buton.setAttribute("id", "BtnEmpresa");
  buton.setAttribute("style", "background: #1e3231;color: white;width: 130px;height: 30px;");
  buton.innerHTML = "Cambiar Logo"

  let myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dk2x7l0kq",
      uploadPreset: "m6fhzjcs",
    },
    async (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        try {
          const Updateempresa = await fetch("http://localhost:5000/empresa/update/Logo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: localStorage.getItem('idempresa'), img: result.info.url }),
          });

          if (Updateempresa.ok) {
            let reporte = {
              Tipo: "Actualizar Logo empresa",
              Descripcion: "Se a actualizado el logo de la empresa " + Perfil.Titulo,
              Titulo: "Actualización de Logo empresa",
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
                localStorage.setItem("CompanyLogo", result.info.url);
                window.location.reload()
              } else {
                console.error("Error al crear el reporte");
              }

            } catch (error) {
              console.error(error);
            }
          } else {
            alert("Error al actualizar la empresa");
          }
        } catch (error) {
          console.error(error);
          alert("Error al actualizar la empresa");
        }

      }
    }
  );



  TitlePerfil.appendChild(title);
  TitlePerfil.appendChild(Logo);
  TitlePerfil.appendChild(buton);


  TitlePerfil.innerHTML += '<strong>' + Perfil.Correo + '</strong><p>' + Perfil.Informacion + '</p>'

  let InfoPerfil = document.createElement("div");
  InfoPerfil.classList.add("InfoPerfil");
  InfoPerfil.innerHTML = '<div class="UserLogo" > <img style="height: 300px;width: 300px;" src = ' + localStorage.getItem('Avatar') + ' /></div><button style="background: #1e3231;color: white;width: 130px;height: 30px;" id="UserBTN">Cambiar Avatar</button><p>' + Perfil.NombreUsuario + '</p><p>' + Perfil.EmailUsuario + '</p><button class="ButtonDesign" style="margin-bottom: 20px;"data-modal-target="ModifyPerfilModal">Editar perfil</button>'
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
            alert("Error al actualizar la empresa");
          }
        } catch (error) {
          console.error(error);
          alert("Error al actualizar la empresa");
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

  document.getElementById("BtnEmpresa").addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );
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
