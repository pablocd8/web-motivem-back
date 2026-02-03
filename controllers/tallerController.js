const Taller = require("../models/taller");

exports.getTalleres = async (req, res) => {
  try {
    const talleres = await Taller.find();
    res.json(talleres);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error de servidor");
  }
};


exports.createTaller = async (req, res) => {
  try {
    const nuevoTaller = new Taller(req.body);
    await nuevoTaller.save();
    res.json(nuevoTaller);
  } catch (err) {
    console.error("Error al insertar taller:", err.message);
    res.status(500).json({ message: "Error al insertar taller", error: err.message });
  }
};

exports.deleteTaller = async (req, res) => {
  try {
    await Taller.findByIdAndDelete(req.params.id);
    res.json({ message: "Taller eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar el taller");
  }
};

// Formulario editar
exports.formEditarTaller = async (req, res) => {
  try {
    const taller = await Taller.findById(req.params.id);
    if (!taller) return res.status(404).send("Taller no encontrado");
    res.json(taller);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error de servidor");
  }
};

// Actualizar
exports.updateTaller = async (req, res) => {
  try {
    const tallerActualizado = await Taller.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //devuelve el documento modificado
    );
    if (!tallerActualizado)
      return res.status(404).send("Taller no encontrado");
    res.json(tallerActualizado);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar el taller");
  }
};
