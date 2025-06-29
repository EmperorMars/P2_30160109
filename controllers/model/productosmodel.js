const db = require("../../BD/sqlite3.js");

const Producto = {
  getAll: (callback) => {
    const sql = "SELECT * FROM productos";
    db.all(sql, [], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM productos WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    });
  }
};

module.exports = Producto;
