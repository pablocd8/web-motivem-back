const express = require("express");
const router = express.Router();
const tallerController = require("../controllers/tallerController");

// Listar 
router.get("/", tallerController.getTalleres);

router.post("/", tallerController.createTaller);

// Editar 
router.get("/editar/:id", tallerController.formEditarTaller);
router.put("/:id", tallerController.updateTaller);

// Eliminar 
router.delete("/:id", tallerController.deleteTaller);

// Ficha 
//router.get("/:id", tallerControllers.getTallerById);

module.exports = router;