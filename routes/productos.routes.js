const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productos.controller.js");

router.get("/productos", productoController.mostrarProductos);
router.get("/productos/:id", productoController.detalleProducto); // Ruta dinámica


module.exports = router;
