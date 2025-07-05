const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller.js");

// GET /admin - Listar comentarios
router.get("/admin", adminController.mostrarComentarios);

// POST /admin/:id/eliminar - Eliminar comentario
router.post("/admin/:id/eliminar", adminController.eliminarComentario);

module.exports = router;
