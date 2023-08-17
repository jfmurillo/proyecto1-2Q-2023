const mongoose = require('mongoose');

// Definir el esquema para el modelo de usuarios
const ReporteSchema = new mongoose.Schema({
    Titulo: {
        type: String,
        required: true,
    },
    Descripcion: {
        type: String,
        required: true,
    },
    Tipo: {
        type: String,
        required: true,
    },
    empresa: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Crear el modelo de usuarios a partir del esquema
const reportes = mongoose.model('reportes', ReporteSchema);


module.exports = reportes;