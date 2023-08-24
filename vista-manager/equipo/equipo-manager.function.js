var app = app || {};

let datos = [];
let idUserSelect;
window.onload = async function () {

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



    tabla.appendChild(fila);
  }
}
