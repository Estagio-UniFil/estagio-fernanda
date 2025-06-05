import React, { useState } from 'react';
import { criarCategoria } from '../services/api';
import { mostrarToast } from '../utils/toast';

function CategoriaForm({ onRefresh }) {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valor = nome.trim();
    if (!valor) return mostrarToast('Preencha este campo.', 'erro');
    if (/[^a-zA-ZÀ-ÿ\s]/.test(valor)) {
      return mostrarToast('O nome da categoria não pode conter números ou caracteres especiais.', 'erro');
    }

    try {
      const res = await criarCategoria(valor);
      if (res.erro) return mostrarToast(res.erro, 'erro');
      setNome('');
      mostrarToast('Categoria cadastrada com sucesso!');
      onRefresh?.();
    } catch {
      mostrarToast('Erro ao salvar!', 'erro');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite o nome de uma nova categoria" required />
      <button type="submit">Salvar</button>
    </form>
  );
}

export default CategoriaForm;
