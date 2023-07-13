let Reportes = [
    {
        Fecha: "7/7/2023",
        Titulo: "Envio de invitacion a empresa a: pruebas@gmail.com",
        Descripcion: "Mensaje de la invitacion",
        tipo: 0
    }, {
        Fecha: "7/7/2023",
        Titulo: "Envio de invitacion a empresa a: pruebas@gmail.com",
        Descripcion: "Mensaje de la invitacion",
        tipo: 0
    },
    {
        Fecha: "7/7/2023",
        Titulo: "Usuario registrado a la empresa",
        Descripcion: "Nombre Apellido Correo Rol",
        imagen: "../assets/avatar.png",
        tipo: 1
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