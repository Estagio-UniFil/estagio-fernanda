import React, { useEffect, useState } from 'react';
import { getCategorias, atualizarCategoria, deletarCategoria } from '../services/api';
import { mostrarToast } from '../utils/toast';

function CategoriaLista({ onRefresh }) {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [carregando, setCarregando] = useState(false);

  const carregar = async () => {
    try {
      const res = await getCategorias();
      setCategorias(res);
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

  const cancelarEdicao = () => {
    setEditando(null);
    setNovoNome('');
  };

  const handleUpdate = async (id) => {
    if (!novoNome.trim()) {
      mostrarToast('Preencha este campo.', 'erro');
      return;
    }
    
    if (/[^a-zA-ZÀ-ÿ\s]/.test(novoNome)) {
      mostrarToast('O nome da categoria não pode conter números ou caracteres especiais.', 'erro');
      return;
    }

    setCarregando(true);
    try {
      const res = await atualizarCategoria(id, novoNome);
      if (res.erro) {
        mostrarToast(res.erro, 'erro');
        return;
      }
      mostrarToast('Categoria atualizada com sucesso!');
      setEditando(null);
      if (onRefresh) await onRefresh();
    } catch {
      mostrarToast('Erro ao atualizar!', 'erro');
    } finally {
      setCarregando(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletarCategoria(id);
      mostrarToast('Categoria excluída com sucesso!');
      if (onRefresh) await onRefresh();
    } catch {
      mostrarToast('Erro ao excluir!', 'erro');
    }
  };

  return (
    <div id="categorias">
      {categorias.map(cat => (
        <div className="categoria" key={cat.id}>
          {editando === cat.id ? (
            <input
              type="text"
              value={novoNome}
              onChange={e => setNovoNome(e.target.value)}
              disabled={carregando}
              autoFocus
            />
          ) : (
            <span>{cat.nome}</span>
          )}
          <div>
            {editando === cat.id ? (
              <>
                <button 
                  onClick={() => handleUpdate(cat.id)}
                  disabled={carregando}
                >
                  <i className="fas fa-save"></i>
                </button>
                <button 
                  onClick={cancelarEdicao}
                  disabled={carregando}
                >
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