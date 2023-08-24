let Reportes = [
]

window.onload = async function () {
  if (!localStorage.getItem('iduser')) {
    window.location.href = '../../Login/login.html';
  }

  const ReportesRequest = await fetch("http://localhost:5000/reporte/" + localStorage.getItem('idempresa'));
  const reportes = await ReportesRequest.json();

  let tipos = [];
  let count = 0;

  reportes.forEach(element => {
    let addbool = true;
    if (count == 0) {
      tipos.push({ titulo: element.Tipo, index: count })
      count++
    }
    for (let i = 0; i < tipos.length; i++) {
      if (tipos[i].titulo == element.Tipo) {
        addbool = false;
      }
    }

    if (addbool) {
      tipos.push({ titulo: element.Tipo, index: count })
      count++
    }
  });

  let innerSelect = "";
  tipos.forEach(element => {
    innerSelect += "<option value='" + element.index + "'>" + element.titulo + "</option>"
  });

  reportes.forEach(element => {
    let repor = {
      Fecha: element.createdAt,
      Titulo: element.Titulo,
      Descripcion: element.Descripcion,
      tipo: 0
    }

    for (let i = 0; i < tipos.length; i++) {
      if (tipos[i].titulo == element.Tipo) {
        repor.tipo = tipos[i].index
      }
    }
    Reportes.push(repor)
  });


  document.getElementById("TipReporte").innerHTML = innerSelect;
  document.getElementById("LogoEmpresa").setAttribute("src", localStorage.getItem("CompanyLogo"))
  document.getElementById("AvatarUser").setAttribute("src", localStorage.getItem("Avatar"))
  RenderReportes(Reportes, 0)
};

function RenderReportes(Reportes, tipo) {
  let mainbox = document.getElementById("Reportes")
  mainbox.innerHTML = "";

  for (let reporte of Reportes) {
    if (reporte.tipo == tipo) {
      let container = document.createElement("div");
      container.classList.add("Reporte");

      let FechaReporte = document.createElement("small");
      let TituloReporte = document.createElement("h4");
      let DescripcionReporte = document.createElement("p");

      FechaReporte.textContent = reporte.Fecha;
      TituloReporte.textContent = reporte.Titulo;
      DescripcionReporte.textContent = reporte.Descripcion;

      container.appendChild(FechaReporte);
      container.appendChild(TituloReporte);
      container.appendChild(DescripcionReporte);

      mainbox.appendChild(container)
    }
  }
}



document.getElementById("TipReporte").addEventListener("change", function (event) {
  event.preventDefault()

  RenderReportes(Reportes, event.target.value)

});