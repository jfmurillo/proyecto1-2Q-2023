let Reportes = [
    {
        Fecha: "7/7/2023",
        Titulo: "Nombre del puesto 1",
        Empresa: "Nombre de la empresa",
        Descripcion: "Descripcion del puesto",
        Estado: "Estado del puesto",
        tipo: 0
    }, {
        Fecha: "7/7/2023",
        Titulo: "Nombre del puesto 2",
        Empresa: "Nombre de la empresa",
        Descripcion: "Descripcion del puesto",
        Estado: "Estado del puesto",
        tipo: 0
    },
    {
        Fecha: "7/7/2023",
        Titulo: "Nombre del puesto 3",
        Empresa: "Nombre de la empresa",
        Descripcion: "Descripcion del puesto",
        Estado: "Estado del puesto",
        tipo: 0
    },
]

function RenderReportes(Reportes, tipo) {
    let mainbox = document.getElementById("Reportes")
    mainbox.innerHTML = "";
    if (tipo == 0) {
        for (let reporte of Reportes) {
            if (reporte.tipo == 0) {
                let container = document.createElement("div");
                container.classList.add("Reporte");

                let FechaReporte = document.createElement("small");
                let TituloReporte = document.createElement("h4");
                let EmpresaReporte = document.createElement("p");
                let DescripcionReporte = document.createElement("p");
                let EstadoReporte = document.createElement("p");

                FechaReporte.textContent = reporte.Fecha;
                TituloReporte.textContent = reporte.Titulo;
                EmpresaReporte.textContent = reporte.Empresa;
                DescripcionReporte.textContent = reporte.Descripcion;
                EstadoReporte.textContent = reporte.Estado;

                container.appendChild(FechaReporte);
                container.appendChild(TituloReporte);
                container.appendChild(EmpresaReporte);
                container.appendChild(DescripcionReporte);
                container.appendChild(EstadoReporte);

                mainbox.appendChild(container)
            }
        }
    }
    else if (tipo == 1) {
        for (let reporte of Reportes) {
            if (reporte.tipo == 1) {
                let container = document.createElement("div");
                container.classList.add("Reporte");
                container.classList.add("d-flex");
                let InfoBox = document.createElement("div");

                let userimg = document.createElement("img");
                userimg.src = reporte.imagen;

                let FechaReporte = document.createElement("small");
                let TituloReporte = document.createElement("h4");
                let DescripcionReporte = document.createElement("p");

                FechaReporte.textContent = reporte.Fecha;
                TituloReporte.textContent = reporte.Titulo;
                DescripcionReporte.textContent = reporte.Descripcion;

                InfoBox.appendChild(FechaReporte);
                InfoBox.appendChild(TituloReporte);
                InfoBox.appendChild(DescripcionReporte);
                container.appendChild(userimg)
                container.appendChild(InfoBox)

                mainbox.appendChild(container)
            }
        }
    }


}

RenderReportes(Reportes, 0)

document.getElementById("TipReporte").addEventListener("change", function (event) {
    event.preventDefault()

    RenderReportes(Reportes, event.target.value)

});