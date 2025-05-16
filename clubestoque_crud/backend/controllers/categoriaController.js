const db = require('../models/db');

// Criar nova categoria com validações
exports.createCategoria = (req, res) => {
  const { nome } = req.body;

  if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });

  // Bloqueia números e caracteres especiais
  if (/[^a-zA-Z\u00C0-\u00FF\s]/.test(nome)) {
    return res.status(400).json({ erro: "O nome da categoria não pode conter números ou caracteres especiais." });
  }

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

// Listar todas
exports.getCategorias = (_, res) => {
  db.query('SELECT * FROM categorias', (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};

// Buscar por ID
exports.getCategoriaById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM categorias WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length === 0) return res.status(404).json({ erro: "Categoria não encontrada" });
    res.json(results[0]);
  });
};

// Atualizar com validações
exports.updateCategoria = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });

  // Bloqueia números e caracteres especiais
  if (/[^a-zA-Z\u00C0-\u00FF\s]/.test(nome)) {s
    return res.status(400).json({ erro: "O nome da categoria não pode conter números ou caracteres especiais." });
  }

  db.query('SELECT * FROM categorias WHERE nome = ? AND id <> ?', [nome, id], (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length > 0) {
      return res.status(400).json({ erro: "Nome da categoria já existe" });
    }

    db.query('UPDATE categorias SET nome = ? WHERE id = ?', [nome, id], (err) => {
      if (err) return res.status(500).json({ erro: err });
      res.json({ id, nome });
    });
  });
};

// Excluir
exports.deleteCategoria = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM categorias WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(204).send();
  });
};
