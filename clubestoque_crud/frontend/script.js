const form = document.getElementById('categoria-form');
const lista = document.getElementById('lista-categorias');
let editarId = null;

function carregarCategorias() {
    fetch('http://localhost:3000/api/categorias')
        .then(res => res.json())
        .then(data => {
            lista.innerHTML = '';
            data.forEach(cat => {
                const li = document.createElement('li');
                li.innerHTML = `${cat.nome} <button onclick="editar(${cat.id}, '${cat.nome}')">Editar</button> <button onclick="remover(${cat.id})">Excluir</button>`;
                lista.appendChild(li);
            });
        });
}

form.onsubmit = (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;

    const metodo = editarId ? 'PUT' : 'POST';
    const url = editarId ? `http://localhost:3000/api/categorias/${editarId}` : 'http://localhost:3000/api/categorias';

    fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    })
    .then(res => {
        if (!res.ok) return res.json().then(e => { throw e });
        return res.json();
    })
    .then(() => {
        document.getElementById('nome').value = '';
        editarId = null;
        carregarCategorias();
    })
    .catch(err => alert(err.erro || 'Erro'));
};

function editar(id, nome) {
    document.getElementById('nome').value = nome;
    editarId = id;
}

function remover(id) {
    fetch(`http://localhost:3000/api/categorias/${id}`, { method: 'DELETE' })
        .then(() => carregarCategorias());
}

carregarCategorias();
