const moongose = require("mongoose");

const ClientSchema = moongose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  empresa: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  vendedor: {
    type: moongose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
});

module.exports = moongose.model("Client", ClientSchema);
