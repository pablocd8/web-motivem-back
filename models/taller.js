const mongoose = require('mongoose');

const tallerSchema = new mongoose.Schema({
  nombre_taller: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  duracion: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Taller', tallerSchema);
