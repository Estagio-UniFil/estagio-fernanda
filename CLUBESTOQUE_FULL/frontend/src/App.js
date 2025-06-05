import React, { useEffect, useState } from 'react';
import CategoriaForm from './components/CategoriaForm';
import CategoriaLista from './components/CategoriaLista';
import './style.css';
import { getCategorias } from './services/api';
import { mostrarToast } from './utils/toast';

const logo = process.env.PUBLIC_URL + '/logo sem fundo.png';

function App() {
  const [categorias, setCategorias] = useState([]);

  const carregarCategorias = async () => {
    try {
      const res = await getCategorias();
      setCategorias(res);
    } catch {
      mostrarToast('Erro ao carregar categorias!', 'erro');
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const toggleSidebar = () => {
    document.getElementById('sidebar').classList.toggle('minimized');
  };

  const toggleUserDropdown = () => {
    const d = document.getElementById('userDropdown');
    d.style.display = d.style.display === 'block' ? 'none' : 'block';
  };

  return (
    <>
      <div className="sidebar" id="sidebar">
        <button className="toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <ul>
          <li><i className="fas fa-arrow-down"></i><span className="label">Entradas</span></li>
          <li><i className="fas fa-arrow-up"></i><span className="label">Saídas</span></li>
          <li><i className="fas fa-box"></i><span className="label">Produtos</span></li>
          <li><i className="fas fa-tags"></i><span className="label">Categorias</span></li>
          <li><i className="fas fa-truck"></i><span className="label">Fornecedores</span></li>
          <li><i className="fas fa-users"></i><span className="label">Usuários</span></li>
          <li><i className="fas fa-chart-line"></i><span className="label">Relatórios</span></li>
        </ul>
      </div>

      <div className="main-content">
        <header>
          <div className="header-left"></div>
          <div className="header-center">
            <h1 className="program-title">CLUBESTOQUE</h1>
            <img src={logo} alt="Logo AABB Londrina-PR" />
            <CategoriaForm onRefresh={carregarCategorias} />
          </div>
          <div className="header-right">
            <div className="user-menu">
              <i className="fas fa-user user-icon" onClick={toggleUserDropdown}></i>
              <div className="user-dropdown" id="userDropdown">
                <a href="#">Meu Perfil</a>
                <a href="#">Sair</a>
              </div>
            </div>
          </div>
        </header>

        <CategoriaLista categorias={categorias} onRefresh={carregarCategorias} />
        <div className="toast-container" id="toastContainer"></div>
      </div>
    </>
  );
}

export default App;