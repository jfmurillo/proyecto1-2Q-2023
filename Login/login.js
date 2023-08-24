window.onload = function () {
  localStorage.clear();
};

document
  .getElementById("login-button")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    var emaildoc = document.getElementById("email").value;
    var passworddoc = document.getElementById("password").value;

    if (emaildoc === "" || passworddoc === "") {
      alert("Por favor rellene todos los campos");
    } else {
      let keysAuth = {
        email: emaildoc,
        password: passworddoc,
      };

      try {
        const LogAuth = await fetch("http://localhost:5000/LogAuth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(keysAuth),
        });

        if (LogAuth.ok) {
          // La solicitud POST se completó con éxito (código de respuesta 200-299)
          const Logeo = await LogAuth.json();
          localStorage.setItem("iduser", Logeo._id);
          localStorage.setItem("idempresa", Logeo.Empresa);
          localStorage.setItem("Avatar", Logeo.avatar);
          if (["admin", "manager", "reclutador"].includes(Logeo.role) && Logeo.Empresa) {
            const respuestaEmpresa = await fetch(
              "http://localhost:5000/empresas/" + Logeo.Empresa
            );
            if (respuestaEmpresa.ok) {
              const empresa = await respuestaEmpresa.json();
              localStorage.setItem("CompanyName", empresa.nombreEmpresa);
              localStorage.setItem("CompanyLogo", empresa.ImgEmpresa);
            } else {
              throw new Error("Error en la empresa");
            }
          }

          if (Logeo.role === "finalUser" && Logeo.Empresa) {
            const respuestaFinalUser = await fetch("http://localhost:5000/registroUserFinal/" + Logeo.Empresa);
            if (respuestaFinalUser.ok) {
                const finalUser = await respuestaFinalUser.json();
                localStorage.setItem('Foto', finalUser.foto);
            } else {
                throw new Error("Error al obtener información del usuario final");
            }
          }

          if (Logeo.role == "admin") {
            window.location.href =
              "../Vista Administrador/Inicio/InicioAdministrador.html";
          } else if (Logeo.role == "manager") {
            window.location.href =
              "../vista-manager/inicio/iniciomanager.html";
          } else if (Logeo.role == "reclutador") {
            window.location.href =
              "../Vista Reclutador/Inicio/InicioReclutador.html";
          } else if (Logeo.role == "finalUser") {
            window.location.href =
              "../vista-usuario-final/Inicio/InicioUsuario.html";
          }
        } else {
          const errorAuth = await LogAuth.text();
          console.error(errorAuth);
          alert(errorAuth);
        }
      } catch (error) {
        console.error(error);
        alert("Error al autenticar");
      }
    }
  });
