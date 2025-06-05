import React, { useEffect, useState } from 'react';
import { getCategorias, atualizarCategoria, deletarCategoria } from '../services/api';
import { mostrarToast } from '../utils/toast';

function CategoriaLista() {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState('');

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

  const handleUpdate = async (id) => {
    if (!novoNome) return mostrarToast('Preencha este campo.', 'erro');
    if (/[^a-zA-ZÀ-ÿ\s]/.test(novoNome)) {
      return mostrarToast('O nome da categoria não pode conter números ou caracteres especiais.', 'erro');
    }
    try {
      const res = await atualizarCategoria(id, novoNome);
      if (res.erro) return mostrarToast(res.erro, 'erro');
      mostrarToast('Categoria atualizada com sucesso!');
      setEditando(null);
      carregar();
    } catch {
      mostrarToast('Erro ao atualizar!', 'erro');
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
            defaultValue={cat.nome}
            disabled={editando !== cat.id}
            onChange={e => setNovoNome(e.target.value)}
          />
          <div>
            <button onClick={() => {
              if (editando === cat.id) {
                handleUpdate(cat.id);
              } else {
                setNovoNome(cat.nome);
                setEditando(cat.id);
              }
            }}>
              <i className={`fas ${editando === cat.id ? 'fa-save' : 'fa-pen'}`}></i>
            </button>
            <button onClick={() => handleDelete(cat.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ))}    </div>
  );
}

export default CategoriaLista;
