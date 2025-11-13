export default async function mostrarListaUsuarios() {
  const app = document.getElementById('app');
  if (!app) return console.warn('#app no encontrado');

  app.innerHTML = '<h2>Usuarios</h2><div id="usuarios-container">Cargando...</div>';

  try {
    const res = await fetch('/api/usuarios'); // usa proxy en package.json o URL completa
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const usuarios = await res.json();

    if (!Array.isArray(usuarios) || usuarios.length === 0) {
      document.getElementById('usuarios-container').innerHTML = '<p>No hay usuarios.</p>';
      return;
    }

    const rows = usuarios.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${escapeHtml(u.nombre || '')}</td>
        <td>${escapeHtml(u.email || '')}</td>
      </tr>
    `).join('');

    document.getElementById('usuarios-container').innerHTML = `
      <table border="1" cellpadding="6" cellspacing="0">
        <thead><tr><th>ID</th><th>Nombre</th><th>Email</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  } catch (err) {
    console.error('Error cargando usuarios:', err);
    document.getElementById('usuarios-container').innerHTML = `<p style="color:red">Error cargando usuarios</p>`;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}