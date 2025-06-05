export function mostrarToast(mensagem, tipo = 'sucesso') {
  const toast = document.createElement('div');
  toast.className = `toast ${tipo}`;
  toast.textContent = mensagem;
  const container = document.getElementById('toastContainer');
  if (container) {
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}
