const express = require("express");
const router = express.Router();
const controller = require("../controllers/main.controllers.js");

router.get("/", controller.index);
router.post("/comentarios", controller.submitComentario);

module.exports = router;
