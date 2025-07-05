const Producto = require("./model/productosmodel.js");
const axios = require("axios");

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const productoController = {
  mostrarProductos: (req, res) => {
    Producto.getAll((err, productos) => {
      if (err) return res.status(500).send("Error al obtener productos");
      res.render("products.view.ejs", { productos });
    });
  },

  detalleProducto: (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send("ID no proporcionado");

    Producto.getById(id, (err, producto) => {
      if (err || !producto) {
        return res.status(404).send("Producto no encontrado");
      }
      res.render("detalleProducto.view.ejs", {
        producto,
        errorMsg: null,
        nombre: "",
        correo: "",
        titular: "",
        tarjeta: "",
        mes: "",
        anio: "",
        cvv: "",
        moneda: ""
      });
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

    Producto.getById(productoId, async (err, producto) => {
      if (err || !producto) {
        return res.status(404).send("Producto no encontrado.");
      }

      // Variables para renderizar
      const renderData = {
        producto,
        errorMsg: null,
        nombre,
        correo,
        titular,
        tarjeta,
        mes,
        anio,
        cvv,
        moneda
      };

      if (!captcha) {
        renderData.errorMsg = "Por favor, completa el reCAPTCHA.";
        return res.render("detalleProducto.view.ejs", renderData);
      }

      try {
        const verifyURL = "https://www.google.com/recaptcha/api/siteverify";
        const params = new URLSearchParams();
        params.append("secret", RECAPTCHA_SECRET_KEY);
        params.append("response", captcha);

        const response = await axios.post(verifyURL, params.toString(), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        if (!response.data.success) {
          renderData.errorMsg = "Verificación reCAPTCHA fallida.";
          return res.render("detalleProducto.view.ejs", renderData);
        }

        const tarjetasValidas = [
          "4111111111111111",
          "5555555555554444",
          "378282246310005",
          "6011111111111117",
          "3530111333300000",
          "30569309025904"
        ];

        if (!tarjetasValidas.includes(tarjeta)) {
          renderData.errorMsg = "Número de tarjeta inválido (error 001).";
          return res.render("detalleProducto.view.ejs", renderData);
        }

        const nombresRechazados = ["REJECTED", "ERROR", "INSUFFICIENT"];
        if (nombresRechazados.includes(titular.toUpperCase())) {
          const mensajes = {
            "REJECTED": "Pago rechazado (error 002).",
            "ERROR": "Error en el pago (error 003).",
            "INSUFFICIENT": "Fondos insuficientes (error 004)."
          };
          renderData.errorMsg = mensajes[titular.toUpperCase()];
          return res.render("detalleProducto.view.ejs", renderData);
        }

        // Pago aprobado (simulado)
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (ip === "::1" || ip === "127.0.0.1") ip = "8.8.8.8";

        let geoInfo = {};
        try {
          const geoResponse = await axios.get(`http://ip-api.com/json/${ip}`);
          geoInfo = geoResponse.data;
        } catch {
          geoInfo = { message: "No se pudo obtener geolocalización" };
        }

        return res.render("pagorealizado.ejs", {
          nombre,
          correo,
          producto,
          moneda,
          geoInfo,
          pago: {
            status: "APPROVED",
            message: "Pago aprobado exitosamente."
          }
        });

      } catch (error) {
        renderData.errorMsg = "Error al procesar el pago. Intenta nuevamente.";
        return res.render("detalleProducto.view.ejs", renderData);
      }
    });
  }
};

module.exports = productoController;
