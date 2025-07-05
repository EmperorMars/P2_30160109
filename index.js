const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();
require('dotenv').config();

// Configura el motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "src",'views')); 
app.set("layout", "layouts/layout");
app.use(express.static(path.join(__dirname, 'public')));


// Configura express-ejs-layouts
app.use(expressLayouts);

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
const productosRouter = require('./routes/productos.routes');
app.use(productosRouter);
const mainRouter = require('./routes/main.routes');
app.use(mainRouter);
const adminRoutes = require("./routes/admin.routes.js");
app.use(adminRoutes);

// Inicia el servidor
const fakepayment = process.env.FAKEPAYMENT_API_KEY || 'default_fakepayment_api_key';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}
        console.log("Clave secreta reCAPTCHA:", ${process.env.RECAPTCHA_SECRET_KEY});
`);
});

