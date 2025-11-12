import { supabase } from './supabase.js';
import { mostrarRegistro } from './register.js';
import { mostrarLogin } from './login.js';

// rutas que usan funciones exportadas desde los módulos de vista
const routes = {
  registro: mostrarRegistro,
  login: mostrarLogin,
};

async function CerrarSesion() {
  if (supabase && supabase.auth && typeof supabase.auth.signOut === 'function') {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Error cerrando sesión:', err);
    }
  } else {
    console.warn('Supabase no disponible para cerrar sesión.');
  }
  await cargarMenu();
  if (routes.registro) routes.registro();
}

function waitFor(selector, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);
    const observer = new MutationObserver(() => {
      const found = document.querySelector(selector);
      if (found) {
        observer.disconnect();
        resolve(found);
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      reject(new Error('timeout waiting for ' + selector));
    }, timeout);
  });
}

export async function cargarMenu() {
  let menu;
  try {
    menu = await waitFor('#menu', 3000);
  } catch (err) {
    console.warn('Elemento "#menu" no encontrado tras esperar:', err.message);
    return;
  }

  let user = null;
  try {
    if (supabase && supabase.auth && typeof supabase.auth.getUser === 'function') {
      const { data } = await supabase.auth.getUser();
      user = data?.user || null;
    }
  } catch (err) {
    console.warn('Error al obtener usuario con Supabase:', err);
    user = null;
  }

  if (!user) {
    menu.innerHTML = `
      <div>
        <button data-action="registro">Registrarse</button>
        <button data-action="login">Iniciar sesión</button>
      </div>
    `;
  } else {
    menu.innerHTML = `
      <div>
        <button data-action="usuarios">Usuarios</button>
        <button data-action="logout">Cerrar sesión</button>
        ${user.email === 'admin@mail.com' ? '<button data-action="admin">Admin</button>' : ''}
      </div>
    `;
  }

  menu.querySelectorAll('button').forEach(button => {
    const action = button.getAttribute('data-action');
    if (!action) return;
    if (action === 'logout') {
      button.addEventListener('click', (e) => { e.preventDefault(); CerrarSesion(); });
    } else if (routes[action]) {
      button.addEventListener('click', (e) => { e.preventDefault(); routes[action](); });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Llamada segura: si index.js ya llama a cargarMenu() no pasa nada
  cargarMenu().catch(() => {});
});