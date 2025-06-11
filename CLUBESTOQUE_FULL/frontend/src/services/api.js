const API = 'http://localhost:3000/api/categorias';

export const getCategorias = async () => {
  const response = await fetch(API);
  if (!response.ok) throw new Error('Erro ao buscar categorias');
  return await response.json();
};

export const criarCategoria = async (nome) => {
  const response = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || 'Erro ao criar categoria');
  }

  return data;
};

export const atualizarCategoria = async (id, nome) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || 'Erro ao atualizar categoria');
  }

  return data;
};

export const deletarCategoria = async (id) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir categoria');
  }

  return true;
};
