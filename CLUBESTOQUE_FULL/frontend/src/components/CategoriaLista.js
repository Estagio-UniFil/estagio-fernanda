import React, { useEffect, useState } from 'react';
import { getCategorias, atualizarCategoria, deletarCategoria } from '../services/api';
import { mostrarToast } from '../utils/toast';

function CategoriaLista() {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [nomesOriginais, setNomesOriginais] = useState({});

  const carregar = async () => {
    try {
      const res = await getCategorias();
      setCategorias(res);
      // Armazena os nomes originais para possível rollback
      const originais = {};
      res.forEach(cat => {
        originais[cat.id] = cat.nome;
      });
      setNomesOriginais(originais);
    } catch {
      mostrarToast('Erro ao carregar!', 'erro');
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const iniciarEdicao = (id, nome) => {
    setEditando(id);
    setNovoNome(nome);
  };

  const cancelarEdicao = (id) => {
    setEditando(null);
    // Restaura o nome original se houver
    if (nomesOriginais[id]) {
      setNovoNome(nomesOriginais[id]);
    }
  };

  const handleUpdate = async (id) => {
    if (!novoNome.trim()) {
      mostrarToast('Preencha este campo.', 'erro');
      cancelarEdicao(id);
      return;
    }
    
    if (/[^a-zA-ZÀ-ÿ\s]/.test(novoNome)) {
      mostrarToast('O nome da categoria não pode conter números ou caracteres especiais.', 'erro');
      cancelarEdicao(id);
      return;
    }

    try {
      const res = await atualizarCategoria(id, novoNome);
      if (res.erro) {
        mostrarToast(res.erro, 'erro');
        cancelarEdicao(id);
        return;
      }
      mostrarToast('Categoria atualizada com sucesso!');
      setEditando(null);
      carregar(); // Recarrega a lista após atualização
    } catch {
      mostrarToast('Erro ao atualizar!', 'erro');
      cancelarEdicao(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletarCategoria(id);
      mostrarToast('Categoria excluída com sucesso!');
      carregar();
    } catch {
      mostrarToast('Erro ao excluir!', 'erro');
    }
  };

  return (
    <div id="categorias">
      {categorias.map(cat => (
        <div className="categoria" key={cat.id}>
          <input
            type="text"
            value={editando === cat.id ? novoNome : cat.nome}
            disabled={editando !== cat.id}
            onChange={e => setNovoNome(e.target.value)}
            onBlur={() => editando === cat.id && handleUpdate(cat.id)}
          />
          <div>
            {editando === cat.id ? (
              <>
                <button onClick={() => handleUpdate(cat.id)}>
                  <i className="fas fa-save"></i>
                </button>
                <button onClick={() => cancelarEdicao(cat.id)}>
                  <i className="fas fa-times"></i>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => iniciarEdicao(cat.id, cat.nome)}>
                  <i className="fas fa-pen"></i>
                </button>
                <button onClick={() => handleDelete(cat.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoriaLista;