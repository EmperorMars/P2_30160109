const db = require("../../BD/sqlite3.js");

const tabla = process.env.DB_TABLE_CONTACTS || "contacts";

const ComentarioModel = {
  guardarComentario: (nombre, correo, comentario, fecha, hora, ip, callback) => {
    const sql = `INSERT INTO ${tabla} (nombre, correo, comentario, fecha, hora, ip) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [nombre, correo, comentario, fecha, hora, ip], function (error) {
      if (error) return callback(error);
      callback(null, { id: this.lastID });
    });
  }
};

module.exports = ComentarioModel;
