const path = require("path");
const sqlite = require("sqlite3");

const dbPath = path.resolve(__dirname, "..", process.env.DB_FOLDER || "BD", process.env.DB_NAME || "Database.db");

const db = new sqlite.Database(dbPath, (error) => {
  if (error) return console.error("❌ Error al conectar:", error);

  console.log("✅ Conectado a la base de datos:", dbPath);

  const contactsTable = process.env.DB_TABLE_CONTACTS || "contacts";
  const productosTable = process.env.DB_TABLE_PRODUCTS || "productos";

  const createContactsTable = `
    CREATE TABLE IF NOT EXISTS ${contactsTable} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL,
      comentario TEXT NOT NULL,
      fecha TEXT NOT NULL,
      hora TEXT NOT NULL,
      ip TEXT NOT NULL
    )
  `;
  db.run(createContactsTable, (error) => {
    if (error) console.error("❌ Error creando tabla de contactos:", error.message);
  });

  const createProductosTable = `
    CREATE TABLE IF NOT EXISTS ${productosTable} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      precio REAL NOT NULL,
      descripcion TEXT NOT NULL
    )
  `;
  db.run(createProductosTable, (error) => {
    if (error) {
      return console.error("❌ Error creando tabla productos:", error.message);
    }

    // Verifica si ya existen productos
    db.get(`SELECT COUNT(*) AS total FROM ${productosTable}`, (err, row) => {
      if (err) return console.error("❌ Error comprobando productos existentes:", err);

      if (row.total === 0) {
        const insertProductos = `
          INSERT INTO ${productosTable} (nombre, precio, descripcion)
          VALUES 
            ('Antivirus ProShield', 29.99, 'Protección avanzada contra malware, ransomware y spyware.'),
            ('Curso de Hacking Ético', 59.99, 'Curso completo sobre técnicas de pentesting y ciberdefensa.'),
            ('Firewall Inteligente NetSecure', 99.99, 'Firewall de nueva generación para redes domésticas y pymes.'),
            ('Gestor de Contraseñas SafeVault', 19.99, 'Aplicación segura para almacenar y generar contraseñas.');
        `;
        db.run(insertProductos, (err) => {
          if (err) return console.error("❌ Error insertando productos:", err.message);
          console.log("✅ Productos insertados correctamente.");
        });
      }
    });
  });
});

module.exports = db;
