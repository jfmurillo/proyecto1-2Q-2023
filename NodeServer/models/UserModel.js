const mongoose = require('mongoose');

// Definir el esquema para el modelo de usuarios
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
    },
    avatar: {
        type: String
    }
}, { timestamps: true });

// Crear el modelo de usuarios a partir del esquema
const User = mongoose.model('Users', userSchema);


module.exports = User;