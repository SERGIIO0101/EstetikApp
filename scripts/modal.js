// modal.js

// Mostrar el modal con detalles de la cita
export function mostrarModalConfirmacion(cita) {
  const modal = document.getElementById('modalConfirmacion');
  const detalle = document.getElementById('detalleCita');
  const cerrarBtn = document.getElementById('btnCerrarModal');

  if (!modal || !detalle || !cerrarBtn) return;

  detalle.innerHTML = `
    <strong>Nombre:</strong> ${cita.nombre}<br>
    <strong>Servicio:</strong> ${cita.servicio}<br>
    <strong>Profesional:</strong> ${cita.personal}<br>
    <strong>Fecha:</strong> ${cita.fecha}<br>
    <strong>Hora:</strong> ${cita.hora}
  `;

  modal.classList.remove('oculto');

  cerrarBtn.onclick = () => {
    modal.classList.add('oculto');
    detalle.innerHTML = '';
  };
}

// Función extra para cerrar desde otros lugares si se requiere
export function cerrarModal() {
  const modal = document.getElementById('modalConfirmacion');
  const detalle = document.getElementById('detalleCita');
  if (modal) modal.classList.add('oculto');
  if (detalle) detalle.innerHTML = '';
}
