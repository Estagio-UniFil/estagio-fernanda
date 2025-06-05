const model = require('../models/categoriaModel');

exports.createCategoria = (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });
  if (/[^a-zA-ZÀ-ÿ\s]/.test(nome)) return res.status(400).json({ erro: "O nome da categoria não pode conter números ou caracteres especiais." });

  model.insertCategoria(nome, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ erro: "Categoria já existente!" });
      return res.status(500).json({ erro: err });
    }
    res.status(201).json({ id: result.insertId, nome });
  });
};

exports.getCategorias = (_, res) => {
  model.findAllCategorias((err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};

exports.getCategoriaById = (req, res) => {
  const { id } = req.params;
  model.findCategoriaById(id, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length === 0) return res.status(404).json({ erro: "Categoria não encontrada" });
    res.json(results[0]);
  });
};

exports.updateCategoria = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });
  if (/[^a-zA-ZÀ-ÿ\s]/.test(nome)) return res.status(400).json({ erro: "O nome da categoria não pode conter números ou caracteres especiais." });

  model.findCategoriaByNome(nome, id, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length > 0) return res.status(400).json({ erro: "Categoria já existente!" });

    model.updateCategoria(nome, id, (err) => {
      if (err) return res.status(500).json({ erro: err });
      res.json({ id, nome });
    });
  });
};

exports.deleteCategoria = (req, res) => {
  const { id } = req.params;
  model.deleteCategoria(id, (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(204).send();
  });
};
