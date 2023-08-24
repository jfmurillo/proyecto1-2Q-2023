const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aplicacionSchema = Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    puestoDescription: {
        type: String,
        required: true,
        trim: true
    },
    puestoStatus: {
        type: String,
        required: true,
        enum: ['Enviada', 'En revisión', 'Aceptada', 'Denegada'], 
        default: 'Enviada'
    },
    dateApplied: {  // Fecha en la que se realizó la aplicación.
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UsuarioFinalModel',
        required: true
    }
});

const Aplicaciones = mongoose.model('Aplicaciones', aplicacionSchema);

module.exports = Aplicaciones;