const adminModel = require("../controllers/model/admin.module.js");

const mostrarComentarios = (req, res) => {
  adminModel.obtenerComentarios((err, comentarios) => {
    if (err) {
      console.error("Error al obtener comentarios:", err);
      return res.status(500).send("Error interno del servidor");
    }
    res.render("admin.view.ejs", { comentarios });
  });
};

const eliminarComentario = (req, res) => {
  const id = req.params.id;
  adminModel.eliminarComentario(id, (err) => {
    if (err) {
      console.error("Error al eliminar comentario:", err);
      return res.status(500).send("Error interno del servidor");
    }
    res.redirect("/admin");
  });
};

module.exports = { mostrarComentarios, eliminarComentario };
