const Producto = require("./model/productosmodel.js");
const axios = require("axios");

const productoController = {
  mostrarProductos: (req, res) => {
    Producto.getAll((err, productos) => {
      if (err) return res.status(500).send("Error al obtener productos");
      res.render("products.view.ejs", { productos });
    });
  },

  detalleProducto: (req, res) => {
    const id = req.params.id;
    Producto.getById(id, (err, producto) => {
      if (err || !producto) return res.status(404).send("Producto no encontrado");
      res.render("detalleProducto.view.ejs", { producto });
    });
  },

  procesarPago: async (req, res) => {
    const {
      nombre,
      correo,
      titular,
      tarjeta,
      mes,
      anio,
      cvv,
      moneda,
      productoId,
      'g-recaptcha-response': captcha
    } = req.body;

    if (!captcha) {
      return res.status(400).send("Por favor, completa el reCAPTCHA.");
    }

    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
      const response = await axios.post(verifyURL);
      const data = response.data;

      if (!data.success) {
        return res.status(403).send("Verificación reCAPTCHA fallida.");
      }

      Producto.getById(productoId, (err, producto) => {
        if (err || !producto) {
          return res.status(404).send("Producto no encontrado.");
        }

        // Aquí puedes registrar la compra o simplemente mostrar confirmación
        res.render("confirmacion.view.ejs", {
          nombre,
          correo,
          producto,
          moneda
        });
      });
    } catch (error) {
      console.error("Error al verificar reCAPTCHA:", error);
      res.status(500).send("Error en la validación del captcha.");
    }
  }
};

module.exports = productoController;
