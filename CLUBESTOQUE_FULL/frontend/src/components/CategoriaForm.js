import React, { useState } from 'react';
import { criarCategoria } from '../services/api';
import { mostrarToast } from '../utils/toast';

function CategoriaForm({ onRefresh }) {
  const [nome, setNome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    const valor = nome.trim();
    if (!valor) {
      mostrarToast('Preencha este campo.', 'erro');
      return;
    }
    if (/[^a-zA-ZÀ-ÿ\s]/.test(valor)) {
      mostrarToast('O nome da categoria não pode conter números ou caracteres especiais.', 'erro');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await criarCategoria(valor);
      if (res.erro) {
        mostrarToast(res.erro, 'erro');
        return;
      }
      setNome('');
      mostrarToast('Categoria cadastrada com sucesso!');
      // Força a atualização da lista
      if (onRefresh) {
        await onRefresh();
      }
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
      mostrarToast('Erro ao salvar!', 'erro');
    } finally {
      setIsSubmitting(false);
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
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}

export default CategoriaForm;