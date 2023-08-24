const express = require("express");
const mongoose = require("mongoose");
const Users = require("./models/UserModel");
const Puestos = require("./models/PuestosModel");
const Empresa = require("./models/EmpresaModel");
const UsuarioFinal = require("./models/UsuarioFinalModel");
const Reclutador = require("./models/ReclutadorModel");
const Manager = require("./models/ManagerModel");
const cors = require("cors");
const reportes = require("./models/Reportes");

const multer = require("multer");
const path = require("path");

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Files"); // Ruta donde se almacenará la imagen
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"]; // Agrega aquí las extensiones permitidas
    if (allowedExtensions.includes(fileExt)) {
      cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
    } else {
      cb(new Error("Tipo de archivo no permitido"));
    }
  },
});

const upload = multer({ storage: storage });

const username = 'vmorat';
const password = 'Mora2023';

const connectionURI = `mongodb+srv://${username}:${password}@cluster0.h03de4d.mongodb.net/CodeWarrior?retryWrites=true&w=majority`;

mongoose
  .connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

app.post("/images", upload.single("image"), async function (req, res) {
  if (!req.file) {
    res.status(400).send("No se ha proporcionado ninguna imagen.");
  }
  console.log(req.file.path);
  res.send({ path: req.file.path });
});

app.post("/users", async function (req, res) {
  console.log("Atendiendo Post /users con: ", req.body);

  if (!req.body || req.body == {}) {
    console.log("No hay body en la peticion");
    res.status(400).send("No hay body en la peticion");
  }

  console.log("Creando al usuario: ", req.body);

  const user = new Users({
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    Empresa: req.body.Empresa,
    avatar: req.body.avatar,
  });

  try {
    console.log("Guardando al usuario: ", req.body);
    const usuarioGuardado = await user.save();
    console.log("Usuario guardado: ", usuarioGuardado);
    res.status(201).send(usuarioGuardado);
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(500).send("Ya se encuentra registrado el correo");
    } else {
      console.log("error creando al usuario: ", error);
      res.status(500).send("Error creando al usuario: ", error);
    }
  }
});

app.get("/users", async function (req, res) {
  console.log("Atendiendo Get /users");

  try {
    console.log("Obteniendo los usuarios de la base de datos");
    const usuarios = await Users.find({});
    console.log("Usuarios encontrados");
    res.status(200).send(usuarios);
  } catch (error) {
    console.log("Error al obtener los usuarios");
    res.status(500).send("Error al obtener los usuarios");
  }
});

app.get("/users/:id", async function (req, res) {
  console.log("Atendiendo Get /users/:id");
  const id = req.params.id;
  try {
    console.log("Buscando el usuario con id:", id);
    const usuario = await Users.findOne({ _id: id });
    console.log("Usuario encontrado");
    res.status(200).send(usuario);
  } catch (error) {
    console.log("Error al obtener el usuario");
    res.status(500).send("Error al obtener el usuario");
  }
});

app.post("/users/update", async function (req, res) {
  const usuariofind = await Users.findOne({ email: req.body.email });
  const usuarioActualizar = await Users.findOne({ _id: req.body.id });

  if (req.body.password) {
    try {
      const usuario = await Users.updateOne(
        { _id: req.body.id },
        {
          $set: {
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password
          },
        }
      );
      res.status(200).send(usuario);
    } catch (error) {
      console.log("Error al obtener el usuario");
      res.status(500).send("Error al obtener el usuario");
    }
  }
  else {
    if (usuariofind == undefined) {
      try {
        const usuario = await Users.updateOne(
          { _id: req.body.id },
          {
            $set: {
              nombre: req.body.nombre,
              email: req.body.email,
              role: req.body.role,
            },
          }
        );
        res.status(200).send(usuario);
      } catch (error) {
        console.log("Error al obtener el usuario");
        res.status(500).send("Error al obtener el usuario");
      }
    } else {
      console.log(usuariofind._id);
      console.log(usuarioActualizar._id);
      if (usuariofind._id.toString() == usuarioActualizar._id.toString()) {
        try {
          const usuario = await Users.updateOne(
            { _id: req.body.id },
            {
              $set: {
                nombre: req.body.nombre,
                email: req.body.email,
                role: req.body.role,
              },
            }
          );
          res.status(200).send(usuario);
        } catch (error) {
          console.log("Error al obtener el usuario");
          res.status(500).send("Error al obtener el usuario");
        }
      } else {
        res.status(400).send("Correo ya utilizado");
      }
    }
  }

});
app.post("/users/update/Logo", async function (req, res) {
  try {
    console.log(req.body)
    const usuario = await Users.updateOne(
      { _id: req.body.id },
      {
        $set: {
          avatar: req.body.img,
        },
      }
    );
    res.status(200).send(usuario);
  } catch (error) {
    console.log("Error al actualizar el usuario");
    res.status(500).send("Error al actualizar el usuario");
  }
});

app.get("/users/email/:email", async function (req, res) {
  const email = req.params.email;
  try {
    const usuario = await Users.findOne({ email: email });
    console.log("Usuario encontrado");
    res.status(200).send(usuario);
  } catch (error) {
    console.log("Error al obtener el usuario");
    res.status(500).send("Error al obtener el usuario");
  }
});

app.get("/users/empresa/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const usuario = await Users.find({ Empresa: id });
    res.status(200).send(usuario);
  } catch (error) {
    console.log("Error al obtener el usuario");
    res.status(500).send("Error al obtener el usuario");
  }
});

app.post("/puesto", async function (req, res) {
  if (!req.body || req.body == {}) {
    res.status(400).send("No hay body en la peticion");
  }
  console.log(req.body);

  const puesto = new Puestos({
    nombrePuesto: req.body.nombre,
    RangoSalarialPuesto: req.body.Rango,
    RequisitosPuesto: req.body.Requisitos,
    AtributosPuesto: req.body.Atributos,
    TipoPuesto: req.body.Tipo,
    DescripcionPuesto: req.body.Descripcion,
    AplicantesPuesto: req.body.Aplicantes,
    Empresa: req.body.Empresa,
  });

  try {
    const PuestoGuardado = await puesto.save();
    res.status(201).send(PuestoGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creando el puesto");
  }
});

app.post("/puesto/update", async function (req, res) {
  try {
    const Puesto = await Puestos.updateOne(
      { _id: req.body.id },
      {
        $set: {
          nombrePuesto: req.body.nombre,
          RangoSalarialPuesto: req.body.Rango,
          RequisitosPuesto: req.body.Requisitos,
          AtributosPuesto: req.body.Atributos,
          TipoPuesto: req.body.Tipo,
          DescripcionPuesto: req.body.Descripcion,
        },
      }
    );
    res.status(200).send(Puesto);
  } catch (error) {
    console.log("Error al actualizar puesto");
    res.status(500).send("Error al actualizar puesto");
  }
});

app.get("/puesto", async function (req, res) {
  try {
    const puestos = await Puestos.find({});
    res.status(200).send(puestos);
  } catch (error) {
    res.status(500).send("Error al obtener los puestos");
  }
});

app.get("/puesto/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const puesto = await Puestos.find({ Empresa: id }).sort({ createdAt: -1 });
    res.status(200).send(puesto);
  } catch (error) {
    res.status(500).send("Error al obtener el puesto");
  }
});

app.post("/puesto/delete/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const puesto = await Puestos.findOneAndDelete({ _id: id });
    res.status(200).send(puesto);
  } catch (error) {
    res.status(500).send("Error al eliminar el puesto " + error);
  }
});

app.post("/empresa", async function (req, res) {

  if (!req.body || req.body == {}) {
    res.status(400).send("No hay body en la peticion");
  }

  const empresa = new Empresa({
    nombreEmpresa: req.body.nombre,
    email: req.body.email,
    InfoEmpresa: req.body.informacion,
    ImgEmpresa: req.body.image,
  });

  try {
    console.log(empresa);
    const empresaGuardado = await empresa.save();
    res.status(201).send(empresaGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creando la empresa");
  }
});

app.get("/empresa", async function (req, res) {
  try {
    const empresa = await Empresa.find({});
    res.status(200).send(empresa);
  } catch (error) {
    res.status(500).send("Error al obtener las empresas");
  }
});

app.post("/empresa/update", async function (req, res) {
  try {
    const empresa = await Empresa.updateOne(
      { _id: req.body.id },
      {
        $set: {
          nombreEmpresa: req.body.nombre,
          email: req.body.email,
          InfoEmpresa: req.body.info,
        },
      }
    );


    const empresapassword = await Users.updateOne(
      { _id: req.body.iduser },
      {
        $set: {
          password: req.body.password,
          email: req.body.emailuser,
          nombre: req.body.usuario,
        },
      }
    );

    console.log(empresapassword)
    res.status(200).send(empresa);
  } catch (error) {
    console.log("Error al actualizar la empresa");
    res.status(500).send("Error al actualizar la empresa");
  }
});


app.post("/empresa/update/Logo", async function (req, res) {
  try {
    console.log(req.body)
    const empresa = await Empresa.updateOne(
      { _id: req.body.id },
      {
        $set: {
          ImgEmpresa: req.body.img,

        },
      }
    );
    res.status(200).send(empresa);
  } catch (error) {
    console.log("Error al actualizar la empresa");
    res.status(500).send("Error al actualizar la empresa");
  }
});

app.get("/empresas/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const empresa = await Empresa.findOne({ _id: id });
    res.status(200).send(empresa);
  } catch (error) {
    res.status(500).send("Error al obtener la empresa");
  }
});



app.get("/empresas/email/:email", async function (req, res) {
  const email = req.params.email;
  try {
    const empresa = await Empresa.findOne({ email: email });
    res.status(200).send(empresa);
  } catch (error) {
    res.status(500).send("Error al obtener la empresa");
  }
});

app.post("/LogAuth", async function (req, res) {
  if (!req.body || req.body == {}) {
    console.log("No hay body en la peticion");
    res.status(400).send("No hay body en la peticion");
  }

  const correo = req.body.email;

  try {
    const usuario = await Users.findOne({ email: correo });
    if (usuario != undefined) {
      if (usuario.password == req.body.password) {
        res.status(200).send(usuario);
      } else {
        res.status(400).send("Contraseña invalidad");
      }
    } else {
      res.status(400).send("Correo no registrado");
    }
  } catch (error) {
    res.status(500).send("Error al autenticar");
  }
});

const nodemailer = require("nodemailer");
const correoOrigen = "jmurillocr@ucenfotec.ac.cr";

app.post("/invitarUsuario/:id_empresa", async (req, res) => {
  const { email, rol } = req.body;
  const id_empresa = req.params.id_empresa;

  try {
    console.log("Enviando correo a: ", email);
    console.log(email, rol);
    await sendEmail({ correo: email, rol: rol, empresa_id: id_empresa });
    res.status(200).send("Correo enviado");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al enviar el correo");
  }
});

app.post("/invitarPuesto", async (req, res) => {
  const { email } = req.body;

  try {
    console.log("Enviando correo de invitacion de puesto a: ", email);
    console.log(email);
    await emailPuestoTrabajo({
      correo: email,
      empresa_id: req.body.empresa_id,
      role: "finalUser",
    });
    res.status(200).send("Correo enviado");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al enviar el correo");
  }
});

const smtpOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: correoOrigen,
    pass: "ihjplcxbxuabhelz",
  },
};

async function sendEmail(datosCorreo) {
  console.log("Enviando invitacion de equipo", datosCorreo);
  const transporter = nodemailer.createTransport({ ...smtpOptions });
  const { correo, rol } = datosCorreo;
  console.log(rol);
  try {
    await transporter.sendMail({
      from: correoOrigen,
      subject: "CodeWarriors: Welcome! 🚀 - Invite received ",
      to: correo,
      html: `
          <h1>👨‍💻 Bienvenido a CodeWarrios👨‍💻 </h1>
          <p>Espero que estés teniendo un excelente día. Me complace mucho extenderte una cordial invitación para unirte a nuestro equipo de trabajo. 
          Hemos estado siguiendo tus logros y habilidades, y creemos que tu experiencia y conocimientos serían una adición valiosa a nuestro equipo.</p>
          <p>Antes de la entrevista, necesitamos recopilar más información sobre ti a través de un formulario en línea.  </p>
          <p>Por favor, complete el formulario en el siguiente enlace:</p>
          <p>ID de la empresa: ${datosCorreo.empresa_id}</p></p>
          <p><strong>${rol === "reclutador"
          ? "http://localhost:5500/proyecto1-2Q-2023/registro-reclutador/registro-reclutador.html"
          : "http://localhost:5500/proyecto1-2Q-2023/registro-manager/registro-manager.html"
        }</strong></p>
        `,
    });
  } catch (error) {
    console.error(error);
  }
}

async function emailPuestoTrabajo(datosCorreo) {
  console.log("Enviando invitacion de puesto de trabajo", datosCorreo);
  const transporter = nodemailer.createTransport({ ...smtpOptions });
  const { correo } = datosCorreo;

  try {
    await transporter.sendMail({
      from: correoOrigen,
      subject: "CodeWarriors: Welcome! 🚀 ",
      to: correo,
      html: `
          <h1>👨‍💻 Bienvenido a CodeWarrios👨‍💻 </h1>
          <p>Nos complace informarte que has sido seleccionado/a para participar en la siguiente etapa del proceso de selección. 
          Estamos impresionados/as por tu perfil y creemos que podrías hacer una contribución valiosa a nuestro equipo.</p>
          <p>Antes de la entrevista, necesitamos recopilar más información sobre ti a través de un formulario en línea.  </p>
          <p>ID de la empresa: ${(datosCorreo.empresa_id, datosCorreo.role === "finalUser")
        }</p>
          <p>Por favor, complete el formulario en el siguiente enlace:</p>
          <p><strong>
          http://localhost:5500/proyecto1-2Q-2023/registro-usuario-final/registro-usuario-final.html
          </strong></p>
        `,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendEmail;
module.exports = emailPuestoTrabajo;

app.post("/reporte", async function (req, res) {
  if (!req.body || req.body == {}) {
    res.status(400).send("No hay body en la peticion");
  }
  console.log(req.body);

  const reporte = new reportes({
    Titulo: req.body.Titulo,
    Descripcion: req.body.Descripcion,
    Tipo: req.body.Tipo,
    empresa: req.body.empresa,
  });

  try {
    const reporteGuardado = await reporte.save();
    res.status(201).send(reporteGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creando el reporte");
  }
});

app.get("/reporte/:idEmpresa", async function (req, res) {
  const id = req.params.idEmpresa;
  try {
    const reportedata = await reportes
      .find({ empresa: id })
      .sort({ createdAt: -1 });
    res.status(200).send(reportedata);
  } catch (error) {
    res.status(500).send("Error al obtener los reportes");
  }
});

/* USUARIO FINAL */
app.post("/registroUserFinal", async function (req, res) {
  if (!req.body || req.body == {}) {
    res.status(400).send("No hay body en la peticion");
  }

  const newUser = new UsuarioFinal({
    foto: req.body.foto,
    cv: req.body.cv,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    contrasena: req.body.contrasena,
    genero: req.body.genero,
    experiencia: req.body.experiencia,
    estudios: req.body.estudios,
  });

  try {
    const usuarioGuardado = await newUser.save();
    res.status(201).send(usuarioGuardado);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("El email ya existe.");
    } else {
      console.log(error);
      res.status(500).send("Error creando el usuario final.");
    }
  }
});

app.get("/registroUserFinal", async function (req, res) {
  try {
    const usuarios = await UsuarioFinal.find({});
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send("Error al obtener los usuarios");
  }
});

app.get("/registroUserFinal/:id", async function (req, res) {
  const id = req.params.id;

  try {
    const usuario = await UsuarioFinal.findById(id);

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.status(200).send(usuario);
  }
  catch (error) {
    res.status(500).send("Error al obtener el usuario");
  }
});

//put para actualizar información de los estudiantes
app.put("/registroUserFinal", async function (req, response) {
  console.log("Atendiendo solicitud PUT a /registroUserFinal");

  if (!req.body) {
    console.log("No se recibó el usuario");
    return response.status(400).send("No se recibió el usuario");
  }

  try {
    console.log("Guardando usuario en la base de datos");
    const resultado = await UsuarioFinal.findByIdAndUpdate(req.body.id, {
      foto: req.body.foto,
      cv: req.body.cv,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      contrasena: req.body.contrasena,
      genero: req.body.genero,
      experiencia: req.body.experiencia,
      estudios: req.body.estudios,
    });
    console.log("Usuario guardado:", resultado);

    response.status(201).send(resultado);
  } catch (error) {
    console.log("Error al guardar el usuario:", error);
    response.status(500).send(error);
  }
});

// REGISTRO RECLUTADOR
app.post("/registro-reclutador", async function (req, res) {
  if (!req.body || req.body == {}) {
    res.status(400).send("No hay body en la peticion");
  }

  const newRec = new Reclutador({
    foto: req.body.foto,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    empresaid: req.body.empresaid,
    contrasena: req.body.password,
    genero: req.body.genero,
  });

  const usuario = new Users({
    nombre: req.body.nombre,
    email: req.body.email,
    role: "reclutador",
    password: req.body.password,
    avatar: req.body.foto,
  });

  try {
    const reclutadorGuardado = await newRec.save();
    const usuarioGuardado = await usuario.save();
    res.status(201).send({ reclutadorGuardado, usuarioGuardado });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("El email ya existe.");
    } else {
      console.log(error);
      res.status(500).send("Error creando el reclutador.");
    }
  }
});

app.get("/registro-reclutador", async function (req, res) {
  try {
    const usuarios = await Reclutador.find({});
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send("Error al obtener los usuarios");
  }
});

// REGISTRO MANAGER
app.post("/registro-manager", async function (req, res) {
  if (!req.body || req.body == {}) {
    res.status(400).send("No hay body en la peticion");
  }

  const newManager = new Manager({
    foto: req.body.foto,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    empresaid: req.body.empresaid,
    contrasena: req.body.password,
    genero: req.body.genero,
  });

  const usuario = new Users({
    nombre: req.body.nombre,
    email: req.body.email,
    role: "manager",
    password: req.body.password,
    avatar: req.body.foto,
  });

  try {
    const managerGuardado = await newManager.save();
    const usuarioGuardado = await usuario.save();
    res.status(201).send({ managerGuardado, usuarioGuardado });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("El email ya existe.");
    } else {
      console.log(error);
      res.status(500).send("Error creando el manager.");
    }
  }
});

app.get("/registro-manager", async function (req, res) {
  try {
    const usuarios = await Manager.find({});
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send("Error al obtener los usuarios");
  }
});

// app.post("/registro", async function (request, response) {
//   if (!request.body) {
//     // manejar el error
//     response.status(400).json({
//       error: "No hay body en la petición",
//     });
//   }

//   try {
//     const usuario = await Usuario.create({
//       // campos usuario
//     });

//     const reclutador = await Reclutador.create({
//       // Campos reclutador
//     });

//     response.status(200).json(usuario);
//   } catch (error) {
//     response.status(500).json(error);
//   }
// });

const port = 5000;

app.listen(port, () => {
  console.log(`Servidor proxy en http://localhost:${port}`);
});
