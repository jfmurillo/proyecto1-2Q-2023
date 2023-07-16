let Reportes = [
    {
        Fecha: "7/7/2023",
        Titulo: "Nombre del puesto 1",
        Descripcion: "Descripción del puesto",
        Usuario1: "Usuario 1",
        Usuario2: "Usuario 2",
        Usuario3: "Usuario 3",
        tipo: 0
    }, {
        Fecha: "7/7/2023",
        Titulo: "Nombre del puesto 1",
        Descripcion: "Descripción del puesto",
        Usuario1: "Usuario 1",
        Usuario2: "Usuario 2",
        Usuario3: "Usuario 3",
        Usuario4: "Usuario 4",
        tipo: 0
    },
    {
        Fecha: "7/7/2023",
        Titulo: "Nombre del puesto 1",
        Descripcion: "Descripción del puesto",
        Usuario1: "Usuario 1",
        Usuario2: "Usuario 2",
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
                let DescripcionReporte = document.createElement("p");
                let Usuario1Reporte = document.createElement("p");
                let Usuario2Reporte = document.createElement("p");
                let Usuario3Reporte = document.createElement("p");
                let Usuario4Reporte = document.createElement("p");

                FechaReporte.textContent = reporte.Fecha;
                TituloReporte.textContent = reporte.Titulo;
                DescripcionReporte.textContent = reporte.Descripcion;
                Usuario1Reporte.textContent = reporte.Usuario1;
                Usuario2Reporte.textContent = reporte.Usuario2;
                Usuario3Reporte.textContent = reporte.Usuario3;
                Usuario4Reporte.textContent = reporte.Usuario4;

                container.appendChild(FechaReporte);
                container.appendChild(TituloReporte);
                container.appendChild(DescripcionReporte);
                container.appendChild(Usuario1Reporte);
                container.appendChild(Usuario2Reporte);
                container.appendChild(Usuario3Reporte);
                container.appendChild(Usuario4Reporte);

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