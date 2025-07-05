const db = require("../../BD/sqlite3.js");

const tabla = process.env.DB_TABLE_CONTACTS || "contacts";

const obtenerComentarios = (callback) => {
  const sql = `SELECT * FROM ${tabla} ORDER BY id DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

const eliminarComentario = (id, callback) => {
  const sql = `DELETE FROM ${tabla} WHERE id = ?`;
  db.run(sql, [id], function(err) {
    if (err) return callback(err);
    callback(null);
  });
};

module.exports = { obtenerComentarios, eliminarComentario };
