const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

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
const mainController = require('./controllers/main.controllers');
app.get('/', mainController.index);
app.post('/submit-comentario', mainController.submitComentario);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
