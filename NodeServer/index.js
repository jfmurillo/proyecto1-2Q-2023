const express = require('express');
const mongoose = require('mongoose');
const Users = require('./models/UserModel')
const Puestos = require('./models/PuestosModel')
const Empresa = require('./models/EmpresaModel')
const cors = require("cors")

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const username = 'salvarados';
const password = 'sebastian2023';


const connectionURI = `mongodb+srv://${username}:${password}@cluster0.h03de4d.mongodb.net/CodeWarrior?retryWrites=true&w=majority`;

mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
    });


app.post("/users", async function (req, res) {

    console.log("Atendiendo Post /users con: ", req.body)

    if (!req.body || req.body == {}) {
        console.log("No hay body en la peticion")
        res.status(400).send("No hay body en la peticion")
    }

    console.log("Creando al usuario: ", req.body)

    const user = new Users({
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        Empresa: req.body.Empresa
    })

    try {
        console.log("Guardando al usuario: ", req.body)
        const usuarioGuardado = await user.save()
        console.log("Usuario guardado: ", usuarioGuardado)
        res.status(201).send(usuarioGuardado)
    }
    catch (error) {
        console.log("error creando al usuario: ", error)
        res.status(500).send("Error creando al usuario: ", error)
    }
});

app.get("/users", async function (req, res) {

    console.log("Atendiendo Get /users")

    try {
        console.log("Obteniendo los usuarios de la base de datos")
        const usuarios = await Users.find({});
        console.log("Usuarios encontrados")
        res.status(200).send(usuarios)
    }
    catch (error) {
        console.log("Error al obtener los usuarios")
        res.status(500).send("Error al obtener los usuarios")
    }
});


app.get("/users/:id", async function (req, res) {

    console.log("Atendiendo Get /users/:id")
    const id = req.params.id;
    try {
        console.log("Buscando el usuario con id:", id)
        const usuario = await Users.findOne({ _id: id });
        console.log("Usuario encontrado")
        res.status(200).send(usuario)
    }
    catch (error) {
        console.log("Error al obtener el usuario")
        res.status(500).send("Error al obtener el usuario")
    }
});


app.post("/puesto", async function (req, res) {


    if (!req.body || req.body == {}) {
        res.status(400).send("No hay body en la peticion")
    }
    console.log(req.body)

    const puesto = new Puestos({
        nombrePuesto: req.body.nombre,
        RangoSalarialPuesto: req.body.Rango,
        RequisitosPuesto: req.body.Requisitos,
        AtributosPuesto: req.body.Atributos,
        TipoPuesto: req.body.Tipo,
        DescripcionPuesto: req.body.Descripcion,
        AplicantesPuesto: req.body.Aplicantes,
        Empresa: req.body.Empresa,
    })

    try {
        const PuestoGuardado = await puesto.save()
        res.status(201).send(PuestoGuardado)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Error creando el puesto")
    }
});

app.get("/puesto", async function (req, res) {

    try {
        const puestos = await Puestos.find({});
        res.status(200).send(puestos)
    }
    catch (error) {
        res.status(500).send("Error al obtener los puestos")
    }
});


app.get("/puesto/:id", async function (req, res) {
    const id = req.params.id;
    try {
        const puesto = await Puestos.find({ Empresa: id }).sort({ createdAt: -1 });
        res.status(200).send(puesto)
    }
    catch (error) {
        res.status(500).send("Error al obtener el puesto")
    }
});



app.post("/empresa", async function (req, res) {


    if (!req.body || req.body == {}) {
        res.status(400).send("No hay body en la peticion")
    }

    const empresa = new Empresa({
        nombreEmpresa: req.body.nombre,
        email: req.body.email,
        InfoEmpresa: req.body.informacion,
    })

    try {
        const empresaGuardado = await empresa.save()
        res.status(201).send(empresaGuardado)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Error creando la empresa")
    }
});

app.get("/empresa", async function (req, res) {

    try {
        const empresa = await Empresa.find({});
        res.status(200).send(empresa)
    }
    catch (error) {
        res.status(500).send("Error al obtener las empresas")
    }
});


app.get("/empresas/:id", async function (req, res) {
    const id = req.params.id;
    try {
        const empresa = await Empresa.findOne({ _id: id });
        res.status(200).send(empresa)
    }
    catch (error) {
        res.status(500).send("Error al obtener la empresa")
    }
});


app.post("/LogAuth", async function (req, res) {

    if (!req.body || req.body == {}) {
        console.log("No hay body en la peticion")
        res.status(400).send("No hay body en la peticion")
    }

    const correo = req.body.email;

    try {
        const usuario = await Users.findOne({ email: correo });
        if (usuario != undefined) {
            if (usuario.password == req.body.password) {
                res.status(200).send(usuario)
            }
            else {
                res.status(400).send("Contraseña invalidad")
            }
        }
        else {
            res.status(400).send("Correo no registrado")
        }

    }
    catch (error) {
        res.status(500).send("Error al autenticar")
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Servidor proxy en http://localhost:${port}`);
});