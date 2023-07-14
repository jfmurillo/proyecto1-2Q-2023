var app = app || {};
let PerfilActual =
{
  Titulo: "Nombre del reclutador",
  Logo: "../assets/imagenDefault.png",
  Informacion: "Nombre de la empresa a la que pertenece",
  Correo: "reclutador@gmail.com",
  Rol: "Puesto en la empresa",
  Imagen: "../assets/imagenDefault.png",
  Estado: 1
}


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
  InfoPerfil.innerHTML = '<strong>' + Perfil.Correo + '</strong><p>' + Perfil.Informacion + '</strong><p>' + Perfil.Rol

  mainbox.appendChild(TitlePerfil)
  mainbox.appendChild(InfoPerfil)
}

RenderPerfil(PerfilActual)




