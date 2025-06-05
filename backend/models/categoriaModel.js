const db = require('../config/db');

exports.insertCategoria = (nome, callback) => {
  db.query('INSERT INTO categorias (nome) VALUES (?)', [nome], callback);
};

exports.findAllCategorias = (callback) => {
  db.query('SELECT * FROM categorias', callback);
};

exports.findCategoriaById = (id, callback) => {
  db.query('SELECT * FROM categorias WHERE id = ?', [id], callback);
};

exports.findCategoriaByNome = (nome, id, callback) => {
  db.query('SELECT * FROM categorias WHERE nome = ? AND id <> ?', [nome, id], callback);
};

exports.updateCategoria = (nome, id, callback) => {
  db.query('UPDATE categorias SET nome = ? WHERE id = ?', [nome, id], callback);
};

exports.deleteCategoria = (id, callback) => {
  db.query('DELETE FROM categorias WHERE id = ?', [id], callback);
};
