const db = require('../models/db');

exports.createCategoria = (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });

    db.query('INSERT INTO categorias (nome) VALUES (?)', [nome], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ erro: "Nome da categoria já existe" });
            }
            return res.status(500).json({ erro: err });
        }
        res.status(201).json({ id: result.insertId, nome });
    });
};

exports.getCategorias = (_, res) => {
    db.query('SELECT * FROM categorias', (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        res.json(results);
    });
};

exports.getCategoriaById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM categorias WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        if (results.length === 0) return res.status(404).json({ erro: "Categoria não encontrada" });
        res.json(results[0]);
    });
};

exports.updateCategoria = (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    db.query('UPDATE categorias SET nome = ? WHERE id = ?', [nome, id], (err, result) => {
        if (err) return res.status(500).json({ erro: err });
        res.json({ id, nome });
    });
};

exports.deleteCategoria = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categorias WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ erro: err });
        res.status(204).send();
    });
};
