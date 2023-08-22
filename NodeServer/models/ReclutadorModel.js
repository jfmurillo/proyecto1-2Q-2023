const mongoose = require("mongoose");

const reclutadorSchema = new mongoose.Schema(
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

const Reclutador = mongoose.model("Reclutador", reclutadorSchema);

module.exports = Reclutador;
