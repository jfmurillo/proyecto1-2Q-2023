const mongoose = require('mongoose');

const experienciaSchema = new mongoose.Schema({
    nombre_empresa: {
      type: String,
      required: true
    },
    descripcion_puesto: {
      type: String,
      required: true
    }
}, { timestamps: true });
  
const estudiosSchema = new mongoose.Schema({
    nombre_institucion: {
      type: String,
      required: true
    },
    nombre_carrera: {
      type: String,
      required: true
    }
}, { timestamps: true });
  
const usuarioFinalSchema = new mongoose.Schema({
    foto:{
        type: String,
    },
   /* cv:{
        type: String,
    },*/
    nombre:{
        type: String,
        required: true,
    },
    apellido:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: [true, "El email ya existe"],
    },
    contrasena:{
        type: String,
        required: true,
    },
    genero:{
        type: String,
        required: true,
    },
    experiencia:{
        type: [experienciaSchema],
        required: true,
    },
    estudios:{
        type: [estudiosSchema],
        required: true,
    }
}, { timestamps: true });

const UsuarioFinal = mongoose.model('UsuarioFinal', usuarioFinalSchema);

module.exports = UsuarioFinal;