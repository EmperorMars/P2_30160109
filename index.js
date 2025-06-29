require("dotenv").config();
const express = require("express");
const app = express();
const patch = require("path");
const layouts = require("express-ejs-layouts");
app.use(express.static(patch.join(__dirname, "public")));

const main = require("./routes/main.routes");
const productos = require("./routes/productos.routes");

app.use(layouts);

app.set("layout", "layouts/layout");
app.use(layouts);
app.set("view engine", "ejs");

app.use(express.static(patch.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(main);
app.use(productos);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));