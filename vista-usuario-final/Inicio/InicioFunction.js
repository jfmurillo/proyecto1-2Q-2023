let ListPuestos = [];

window.onload = async function () {
    if (!localStorage.getItem('iduser')) {
        window.location.href = '../../Login/login.html';
    }
    
    loadPuestosFromAPI();
    document.getElementById("CompanyName").innerHTML = localStorage.getItem("CompanyName");
    document.getElementById("LogoEmpresa").setAttribute("src", "../../NodeServer/" + localStorage.getItem("CompanyLogo"));
    document.getElementById("PerfilEmpresa").setAttribute("src", "../../NodeServer/" + localStorage.getItem("CompanyLogo"));
    document.getElementById("AvatarUser").setAttribute("src", "../../NodeServer/" + localStorage.getItem("Avatar"));
};
document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem('idempresa');
  
    fetch(`http://localhost:5000/registroUserFinal/${userId}`)
      .then(response => response.json())
      .then(data => {
  
        // Cambiar la imagen del avatar del usuario
        const avatarImg = document.querySelector(".UserLogo img");
        if (avatarImg) {
          avatarImg.src = data.foto;
          avatarImg.alt = "Avatar del usuario";
        }
  
      })
      .catch(error => {
        console.error("Hubo un error al obtener el perfil:", error);
      });
  });
  
  
async function loadPuestosFromAPI() {
    const RepuestaPuestos = await fetch("http://localhost:5000/puesto/");
    const Puestos = await RepuestaPuestos.json();
    console.log(Puestos);

    let contador = 0;

    Puestos.forEach(function (puesto) {
        if (contador < 4) {
            let puestoOrder = {
                Imagen: "../assets/imagenDefault.png",
                Descripcion: puesto.DescripcionPuesto,
                Titulo: puesto.nombrePuesto,
            };

            const fecha = new Date(puesto.updatedAt);

            const dia = fecha.getDate().toString().padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son indexados desde 0, por lo que sumamos 1
            const anio = fecha.getFullYear();

            puestoOrder.Fecha = `${dia}/${mes}/${anio}`;

            ListPuestos.push(puestoOrder);
            contador++;
        }
    });

    RenderApplications(ListPuestos);
}

function RenderApplications(ListApplications) {
    let mainbox = document.getElementById("Publicaciones");
    mainbox.innerHTML = "";

    for (let application of ListApplications) {
        let container = document.createElement("div");
        container.classList.add("Puesto");

        let FechaApplication = document.createElement("small");
        let TituloApplication = document.createElement("h3");
        let ImagenApplication = document.createElement("img");
        let DescripcionApplication = document.createElement("p");

        FechaApplication.textContent = application.Fecha;
        TituloApplication.textContent = application.Titulo;
        DescripcionApplication.textContent = application.Descripcion;
        ImagenApplication.src = application.Imagen;

        container.appendChild(FechaApplication);
        container.appendChild(TituloApplication);
        container.appendChild(ImagenApplication);
        container.appendChild(DescripcionApplication);

        mainbox.appendChild(container);
    }
}
