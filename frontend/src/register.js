import { supabase } from './supabase.js';
import { cargarMenu } from './main.js';
import { mostrarLogin } from './login.js';

export function mostrarRegistro() {
  const app = document.getElementById('app');
  if (!app) return console.warn('Contenedor #app no encontrado');

  app.innerHTML = `
    <section>
      <h2>Crear cuenta</h2>
      <form id="register-form">
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="email" name="correo" placeholder="Correo" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <input type="text" name="telefono" placeholder="Teléfono (opcional)" />
        <button type="submit">Registrarse</button>
      </form>
      <p id="register-error" style="color:red;"></p>
      <button id="ir-login">Ir a iniciar sesión</button>
    </section>
  `;

  const form = document.getElementById('register-form');
  const errorMsg = document.getElementById('register-error');
  const irLogin = document.getElementById('ir-login');

  irLogin.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarLogin();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';

    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const password = form.password.value.trim();
    const telefono = form.telefono.value.trim();

    if (!correo || !password || !nombre) {
      errorMsg.textContent = 'Completa nombre, correo y contraseña.';
      return;
    }

    if (!supabase || !supabase.auth || typeof supabase.auth.signUp !== 'function') {
      errorMsg.textContent = 'Servicio de autenticación no disponible.';
      console.warn('Supabase auth no disponible', supabase);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: correo,
        password: password
      });

      if (error) {
        errorMsg.textContent = error.message || 'Error registrando usuario';
        return;
      }

      // opcional: guardar datos adicionales en tabla si usas una (supabase.from(...).insert(...))
      // await supabase.from('usuarios').insert([{ id: data.user.id, nombre, correo, telefono }]);

      // actualizar menú y mostrar login
      await cargarMenu();
      mostrarLogin();
    } catch (err) {
      console.error('Error en registro:', err);
      errorMsg.textContent = 'Error inesperado. Revisa la consola.';
    }
  });
}