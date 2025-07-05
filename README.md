Este proyecto es una aplicación web que permite gestionar comentarios y productos relacionados con ciberseguridad. Utiliza SQLite como base de datos y está construido con Node.js y Express.

Base de Datos: Utiliza SQLite para almacenar datos de comentarios y productos.
Rutas: Define rutas para manejar comentarios y productos.
Modelos: Contiene modelos para interactuar con la base de datos.
Vistas: Utiliza EJS para renderizar las vistas.

1) Clonar el repositorio:
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>

2) Instalar dependencias:
npm install

3) Configurar variables de entorno: Crea un archivo .env en la raíz del proyecto y añade las siguientes variables:
DB_FOLDER=BD
DB_NAME=Database.db
DB_TABLE_CONTACTS=contacts
DB_TABLE_PRODUCTS=productos
RECAPTCHA_SECRET_KEY=6Ldu8HYrAAAAACUH-1xAIQRLwDJfw0ZLZBZ8lzd0
FAKEPAYMENT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmFrZSBwYXltZW50IiwiZGF0ZSI6IjIwMjUtMDctMDRUMjE6NTU6MjIuMDkxWiIsImlhdCI6MTc1MTY2NjEyMn0.5JpFVj29XYmxf78P4KryYj3JyFa-mzJSzWCT-p6V1eo

4) Iniciar el servidor:
   npm start

Uso:
Comentarios: Los usuarios pueden dejar comentarios que se almacenan en la base de datos.
Productos: Los productos de ciberseguridad se pueden visualizar y comprar.
Administración: Los administradores pueden ver y eliminar comentarios.

- Estrutura de la Base de Datos:

1) Tabla de Comentarios:
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL,
  comentario TEXT NOT NULL,
  fecha TEXT NOT NULL,
  hora TEXT NOT NULL,
  ip TEXT NOT NULL
);

2) Tabla de Productos:
CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  precio REAL NOT NULL,
  descripcion TEXT NOT NULL
);

- Conexión a la Base de Datos:
const path = require("path");
const sqlite = require("sqlite3");

const dbPath = path.resolve(__dirname, "..", process.env.DB_FOLDER || "BD", process.env.DB_NAME || "Database.db");

const db = new sqlite.Database(dbPath, (error) => {
  if (error) return console.error("❌ Error al conectar:", error);
  console.log("✅ Conectado a la base de datos:", dbPath);
});

Guardar Comentario:
const ComentarioModel = {
  guardarComentario: (nombre, correo, comentario, fecha, hora, ip, callback) => {
    const sql = `INSERT INTO ${tabla} (nombre, correo, comentario, fecha, hora, ip) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [nombre, correo, comentario, fecha, hora, ip], function (error) {
      if (error) return callback(error);
      callback(null, { id: this.lastID });
    });
  }
};

Contribuciones:
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un "issue" o un "pull request".

Licencia:
Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.

Contacto:
Para más información, puedes contactar a [tu_email@example.com].
