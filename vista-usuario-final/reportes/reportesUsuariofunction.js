document.addEventListener("DOMContentLoaded", function() {
  // Obtener los reportes del usuario final
  fetch("http://localhost:5000/reportes") // Cambia esta URL si es diferente
      .then(response => response.json())
      .then(data => {
          renderReportes(data);
      })
      .catch(error => {
          console.error("Hubo un error al obtener los reportes:", error);
      });
});

function renderReportes(reportes) {
  let mainbox = document.getElementById("Reportes");
  mainbox.innerHTML = ""; // Limpiar cualquier contenido existente

  for (let reporte of reportes) {
      let container = document.createElement("div");
      container.classList.add("Reporte");

      let fechaAplicacion = document.createElement("small");
      let nombrePuesto = document.createElement("h4");
      let nombreEmpresa = document.createElement("p");
      let descripcionPuesto = document.createElement("p");
      let estadoPuesto = document.createElement("p");

      fechaAplicacion.textContent = reporte.createdAt; // Asumiendo que usas 'timestamps: true' en tu modelo Mongoose
      nombrePuesto.textContent = reporte.Titulo;
      nombreEmpresa.textContent = reporte.empresa; // Asegúrate de que la propiedad coincide con el modelo
      descripcionPuesto.textContent = reporte.Descripcion;
      estadoPuesto.textContent = reporte.Estado; // Asumo que agregaste esta propiedad, ya que no estaba en el modelo original

      container.appendChild(fechaAplicacion);
      container.appendChild(nombrePuesto);
      container.appendChild(nombreEmpresa);
      container.appendChild(descripcionPuesto);
      container.appendChild(estadoPuesto);

      mainbox.appendChild(container);
  }
}

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
  
  