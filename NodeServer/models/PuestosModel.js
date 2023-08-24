const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "El email ya existe"],
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    Empresa: {
        type: String
    }
}, { timestamps: true });

const PuestosSchema = new mongoose.Schema({
    nombrePuesto: {
        type: String,
        required: true,
    },
    RangoSalarialPuesto: {
        type: String,
        required: true,
    },
    RequisitosPuesto: {
        type: String,
        required: true,
    },
    AtributosPuesto: {
        type: String,
        required: true,
    },
    TipoPuesto: {
        type: Number,
        required: true,
    },
    DescripcionPuesto: {
        type: String,
        required: true,
    },
    AplicantesPuesto: {
        type: [userSchema],
        required: true,
    },
    Empresa: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Crear el modelo de usuarios a partir del esquema
const Puestos = mongoose.model('Puestos', PuestosSchema);


module.exports = Puestos;