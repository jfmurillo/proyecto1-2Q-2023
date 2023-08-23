const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
  {
    foto: {
      type: String,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "El email ya existe"],
    },
    empresaid: {
      type: String,
      required: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
