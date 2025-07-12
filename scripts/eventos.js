import {
  mostrarSeccionFormulario,
  mostrarCitas,
  cerrarModal
} from './ui.js';

import {
  agregarCita,
  eliminarCita,
  editarCita,
  obtenerCitas
} from './citas.js';

import {
  obtenerDatosFormulario,
  limpiarFormulario,
  getEditandoIndex,
  setEditandoIndex
} from './formulario.js';

import { mostrarModalConfirmacion } from './modal.js';

// Mostrar citas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  mostrarSeccionFormulario(false);
  mostrarCitas();
});

// Botón principal "Reservar ahora"
document.getElementById('btnReservar')?.addEventListener('click', () => {
  mostrarSeccionFormulario(true);
});

// Botón cerrar modal (ya importado y escuchado en modal.js)

// Botones de "Reservar" desde cards de personal
document.querySelectorAll('.personal-card .reservar-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.personal-card');
    const nombre = card.querySelector('h3').textContent;
    document.getElementById('personal').value = nombre;
    mostrarSeccionFormulario(true);
  });
});

// Botones "Reservar" desde cards de servicio (opcional)
document.querySelectorAll('.servicio-card .reservar-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.servicio-card');
    const servicio = card.querySelector('h3').textContent;
    document.getElementById('servicio').value = servicio;
    mostrarSeccionFormulario(true);
  });
});

// Envío del formulario
const formulario = document.getElementById('formulario');
formulario?.addEventListener('submit', e => {
  e.preventDefault();

  const datos = obtenerDatosFormulario();
  if (!datos) return;

  const index = getEditandoIndex();
  const exito = agregarCita(datos, index);

  if (exito) {
    limpiarFormulario();
    setEditandoIndex(null);
    mostrarModalConfirmacion(datos); // Mostrar el modal solo al éxito
  }
});

// Delegación de eventos para botones dinámicos (editar y eliminar)
document.getElementById('citas')?.addEventListener('click', e => {
  const card = e.target.closest('.cita-card');
  if (!card) return;

  const index = [...card.parentElement.children].indexOf(card);

  if (e.target.classList.contains('btn-eliminar')) {
    eliminarCita(index);
  }

  if (e.target.classList.contains('btn-editar')) {
    editarCita(index);
  }
});
