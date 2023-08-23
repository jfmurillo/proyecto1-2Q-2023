const mongoose = require('mongoose');

// Definir el esquema para el modelo de usuarios
const EmpresaSchema = new mongoose.Schema({
    nombreEmpresa: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "El email ya existe"],
    },
    InfoEmpresa: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Crear el modelo de usuarios a partir del esquema
const Empresa = mongoose.model('Empresas', EmpresaSchema);


module.exports = Empresa;