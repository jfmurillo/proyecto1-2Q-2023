document.getElementById("Buscador").addEventListener("input", function (event) {
    event.preventDefault()
    let searchbox = document.getElementById("searchResult")
    if (event.target.value == "") {
        searchbox.classList.add("d-none")
    }
    else {
        searchbox.classList.remove("d-none")
        searchbox.innerHTML = "";


        let searchInfo = [
            {
                Nombre: "Usuario",
                Titulo: "",
                Imagen: "../assets/avatar.png",
                Empresa: false
            },
            {
                Nombre: "Empresa",
                Titulo: "Descripcion",
                Imagen: "../assets/imagenDefault.png",
                Empresa: true
            }
        ]

        for (let search of searchInfo) {
            let Resultado = document.createElement("div");
            Resultado.classList.add("ResultadoBusqueda");
            let NombreResult = document.createElement("h3");
            let ImagenResult = document.createElement("img");
            let InfoResult = document.createElement("p");

            NombreResult.textContent = search.Nombre;
            InfoResult.textContent = search.Titulo;
            ImagenResult.src = search.Imagen;

            if (search.Empresa) {
                let EmpresaTitle = document.createElement("div");
                EmpresaTitle.classList.add("EmpresaTitle");
                EmpresaTitle.appendChild(ImagenResult)
                EmpresaTitle.appendChild(NombreResult)
                Resultado.appendChild(EmpresaTitle)
                Resultado.appendChild(InfoResult)
            }
            else {
                Resultado.appendChild(NombreResult)
                Resultado.appendChild(ImagenResult)

            }


            searchbox.appendChild(Resultado)
        }
    }

})


function cleanAlertErrors() {
    let errores = document.querySelectorAll(".danger.alert");
    errores.forEach(function (elemento) {
        elemento.remove();
    });
}


function cleanDomErrors() {

    let TextAreas = document.querySelectorAll('textarea.error');
    for (let i = 0; i < TextAreas.length; i++) {
        TextAreas[i].classList.remove('error');
    }

    let Inputs = document.querySelectorAll('input.error');
    for (let i = 0; i < Inputs.length; i++) {
        Inputs[i].classList.remove('error');
    }

    let Labels = document.querySelectorAll("label.error");
    for (let i = 0; i < Labels.length; i++) {
        Labels[i].classList.remove('error');
    }
}


function ShowError() {
    cleanAlertErrors()

    var dangerDiv = document.createElement("div");
    dangerDiv.className = "danger alert fade-in";

    var contentDiv = document.createElement("div");
    contentDiv.className = "content";


    var iconDiv = document.createElement("div");
    iconDiv.className = "icon";


    var svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("height", "50");
    svgIcon.setAttribute("width", "50");
    svgIcon.setAttribute("viewBox", "0 0 512 512");


    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "white");
    path.setAttribute("d", "M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z");


    svgIcon.appendChild(path);

    iconDiv.appendChild(svgIcon);


    var messageText = document.createElement("div");
    messageText.className = "MessageError";
    messageText.setAttribute("id", "MessageErrorBox")



    var closeButton = document.createElement("button");
    closeButton.className = "close";

    closeButton.addEventListener("click", function () {
        var parentElement = closeButton.parentNode;
        parentElement.style.opacity = "0";
        parentElement.style.transition = "opacity 0.5s";

        setTimeout(function () {
            parentElement.remove();
        }, 500);
    })


    var closeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    closeIcon.setAttribute("height", "18px");
    closeIcon.setAttribute("width", "18px");
    closeIcon.setAttribute("id", "Layer_1");
    closeIcon.setAttribute("viewBox", "0 0 512 512");


    var closePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    closePath.setAttribute("fill", "white");
    closePath.setAttribute("d", "M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z");


    closeIcon.appendChild(closePath);

    closeButton.appendChild(closeIcon);


    contentDiv.appendChild(iconDiv);
    contentDiv.appendChild(messageText);


    dangerDiv.appendChild(contentDiv);
    dangerDiv.appendChild(closeButton);

    document.body.appendChild(dangerDiv);
}


function ShowErrorMessage(message) {
    cleanAlertErrors()

    var dangerDiv = document.createElement("div");
    dangerDiv.className = "danger alert fade-in";

    var contentDiv = document.createElement("div");
    contentDiv.className = "content";


    var iconDiv = document.createElement("div");
    iconDiv.className = "icon";


    var svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("height", "50");
    svgIcon.setAttribute("width", "50");
    svgIcon.setAttribute("viewBox", "0 0 512 512");


    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "white");
    path.setAttribute("d", "M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z");


    svgIcon.appendChild(path);

    iconDiv.appendChild(svgIcon);


    var messageText = document.createElement("div");
    messageText.className = "MessageError";
    messageText.setAttribute("id", "MessageErrorBox")
    messageText.innerHTML = message


    var closeButton = document.createElement("button");
    closeButton.className = "close";

    closeButton.addEventListener("click", function () {
        var parentElement = closeButton.parentNode;
        parentElement.style.opacity = "0";
        parentElement.style.transition = "opacity 0.5s";

        setTimeout(function () {
            parentElement.remove();
        }, 500);
    })


    var closeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    closeIcon.setAttribute("height", "18px");
    closeIcon.setAttribute("width", "18px");
    closeIcon.setAttribute("id", "Layer_1");
    closeIcon.setAttribute("viewBox", "0 0 512 512");


    var closePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    closePath.setAttribute("fill", "white");
    closePath.setAttribute("d", "M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z");


    closeIcon.appendChild(closePath);

    closeButton.appendChild(closeIcon);


    contentDiv.appendChild(iconDiv);
    contentDiv.appendChild(messageText);


    dangerDiv.appendChild(contentDiv);
    dangerDiv.appendChild(closeButton);

    document.body.appendChild(dangerDiv);
}

var app = app || {};

app.ui = (function () {

    return {
        AlertError: function () {
            let alerterror = document.getElementById("MessageErrorBox");
            if (alerterror == null) {
                ShowError()
            }
        },
        AlertErrorShow: function (text) {
            ShowErrorMessage(text)
        },
        AddError: function (ListErros) {
            const errorbox = document.getElementById("MessageErrorBox");
            errorbox.innerHTML = "";
            cleanDomErrors();
            for (let elementError of ListErros) {
                elementError.classList.add("error");
                const label = elementError.labels[0]
                label.classList.add("error");
                const labelText = label.textContent;
                let Message = labelText + ": " + elementError.validationMessage

                let ElementText = document.createElement("p");
                ElementText.innerText = Message;
                errorbox.appendChild(ElementText)
            }
            ListErros = [];


        },
        cleanAlert: function () {
            cleanAlertErrors()
        },
        cleanDOM: function () {
            cleanDomErrors()
        },
    };
})();