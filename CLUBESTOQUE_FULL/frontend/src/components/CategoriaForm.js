import React, { useState } from 'react';
import { criarCategoria } from '../services/api';
import { mostrarToast } from '../utils/toast';

function CategoriaForm({ onRefresh }) {
  const [nome, setNome] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (carregando) return;

    const valor = nome.trim();
    if (!valor) {
      mostrarToast('Preencha este campo.', 'erro');
      return;
    }

    if (/[^a-zA-ZÀ-ÿ\s]/.test(valor)) {
      mostrarToast('O nome da categoria não pode conter números ou caracteres especiais.', 'erro');
      return;
    }

    setCarregando(true);

    try {
      const res = await criarCategoria(valor);

      if (res.erro) {
        mostrarToast(res.erro, 'erro');
      } else {
        setNome('');
        mostrarToast('Categoria cadastrada com sucesso!');
        if (onRefresh) await onRefresh();
      }
    } catch (err) {
      mostrarToast(err.message || 'Erro ao salvar!', 'erro');
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={nome} 
        onChange={e => setNome(e.target.value)} 
        placeholder="Digite o nome de uma nova categoria" 
        required 
        disabled={carregando}
      />
      <button type="submit" disabled={carregando}>
        Salvar
      </button>
    </form>
  );
}

export default CategoriaForm;
