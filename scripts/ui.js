// Mostrar mensajes temporales (éxito o error)
export function mostrarMensaje(texto, tipo = "error") {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
  mensaje.classList.remove('oculto');

  setTimeout(() => {
    mensaje.classList.add('oculto');
    mensaje.textContent = '';
  }, 4000);
}

// Mostrar formulario y lista de citas
export function mostrarSeccionFormulario(mostrar = true) {
  const pantallaInicio = document.getElementById('pantalla-inicio');
  const seccionFormulario = document.querySelector('.formulario-seccion');
  const seccionLista = document.querySelector('.lista-citas');

  if (mostrar) {
    pantallaInicio.style.display = 'none';
    seccionFormulario.style.display = 'block';
    seccionLista.style.display = 'block';
    document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
  } else {
    pantallaInicio.style.display = 'flex';
    seccionFormulario.style.display = 'none';
    seccionLista.style.display = 'none';
  }
}

// Mostrar todas las citas en el DOM
import { obtenerCitas, eliminarCita, editarCita } from './citas.js';

export function mostrarCitas() {
  const contenedor = document.getElementById('citas');
  contenedor.innerHTML = '';

  const citas = obtenerCitas();

  if (citas.length === 0) {
    contenedor.innerHTML = '<p style="text-align:center; color:#777;">No hay citas registradas.</p>';
    return;
  }

  citas.forEach((cita, index) => {
    const card = document.createElement('div');
    card.classList.add('cita-card');

    card.innerHTML = `
      <div class="cita-info">
        <h3>${cita.nombre}</h3>
        <p><strong>Servicio:</strong> ${cita.servicio}</p>
        <p><strong>Profesional:</strong> ${cita.personal}</p>
        <p><strong>Fecha:</strong> ${cita.fecha}</p>
        <p><strong>Hora:</strong> ${cita.hora}</p>
      </div>
      <div class="cita-acciones">
        <button class="btn-editar" data-index="${index}">✏️ Editar</button>
        <button class="btn-eliminar" data-index="${index}">🗑️ Eliminar</button>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

// Alternar menú hamburguesa (modo responsive)
export function toggleMenu() {
  const menu = document.querySelector('.menu-principal ul');
  menu.classList.toggle('activo');
}
