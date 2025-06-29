const ComentarioModel = require("./model/formulariomodel.js");

const index = async (req, res) => {
    
      res.render("main.view.ejs");
    
  };

const submitComentario = async (req, res) => {
  const { nombre, correo, comentario } = req.body;

  if (!nombre || !correo || !comentario) {
    return res.status(400).send("Faltan datos en el formulario");
  }

  const fechaHora = new Date();
  const fecha = fechaHora.toLocaleDateString();
  const hora = fechaHora.toLocaleTimeString();
  const ip = req.ip;

  ComentarioModel.guardarComentario(nombre, correo, comentario, fecha, hora, ip, (err, id) => {
    if (err) {
      console.error("Error al guardar en BD:", err);
      return res.status(500).send("Error al guardar el comentario");
    }

      res.redirect('/');
    });
  }

module.exports = {
  index,
  submitComentario,
};