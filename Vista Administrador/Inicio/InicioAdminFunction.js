let ListPuestos = [
    {
        Fecha: "7/7/2023",
        Titulo: "Nombre del empleo",
        Imagen: "../assets/imagenDefault.png",
        Descripcion: "Descripcion"
    }, {
        Fecha: "7/7/2023",
        Titulo: "Nombre del empleo",
        Imagen: "../assets/imagenDefault.png",
        Descripcion: "Descripcion"
    }
]

function RenderApplications(ListApplications) {
    let mainbox = document.getElementById("Publicaciones")

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

        mainbox.appendChild(container)
    }

}

RenderApplications(ListPuestos)