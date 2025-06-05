const API = 'http://localhost:3000/api/categorias';

export const getCategorias = () =>
  fetch(API).then(res => res.json());

export const criarCategoria = (nome) =>
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  }).then(res => res.json());

export const atualizarCategoria = (id, nome) =>
  fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  }).then(res => res.json());

export const deletarCategoria = (id) =>
  fetch(`${API}/${id}`, { method: 'DELETE' });
