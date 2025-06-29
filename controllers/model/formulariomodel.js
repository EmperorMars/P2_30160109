const db = require("../../BD/sqlite3.js");

const ComentarioModel = {
    guardarComentario: (nombre, correo, comentario, fecha, hora, ip, callback) => {
        const sql = `INSERT INTO contacts (nombre, correo, comentario, fecha, hora, ip) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [nombre, correo, comentario, fecha, hora, ip], function (error) {
           
            callback(null, { id: this.lastID });
        });
    }
}

module.exports = ComentarioModel;