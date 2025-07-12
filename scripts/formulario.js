import { mostrarMensaje } from './ui.js';

let editandoIndex = null;

export function obtenerDatosFormulario() {
  const nombre = document.getElementById('nombre').value.trim();
  const servicio = document.getElementById('servicio').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const personal = document.getElementById('personal').value;

  if (!nombre || !servicio || !fecha || !hora || !personal) {
    mostrarMensaje("Todos los campos son obligatorios", "error");
    return null;
  }

  return {
    nombre,
    servicio,
    fecha,
    hora,
    personal,
    index: editandoIndex
  };
}

export function limpiarFormulario() {
  document.getElementById('formulario').reset();
  editandoIndex = null;
  document.getElementById('btnSubmit').textContent = 'Agendar cita';

  const cancelarBtn = document.getElementById('cancelarEdicion');
  if (cancelarBtn) cancelarBtn.remove();
}

export function setEditandoIndex(index) {
  editandoIndex = index;
}

export function getEditandoIndex() {
  return editandoIndex;
}

export function cargarCitaEnFormulario(cita) {
  document.getElementById('nombre').value = cita.nombre;
  document.getElementById('servicio').value = cita.servicio;
  document.getElementById('fecha').value = cita.fecha;
  document.getElementById('hora').value = cita.hora;
  document.getElementById('personal').value = cita.personal;

  setEditandoIndex(cita.index);
  document.getElementById('btnSubmit').textContent = 'Actualizar cita';

  // Botón "Cancelar edición"
  if (!document.getElementById('cancelarEdicion')) {
    const cancelarBtn = document.createElement('button');
    cancelarBtn.textContent = 'Cancelar edición';
    cancelarBtn.id = 'cancelarEdicion';
    cancelarBtn.classList.add('btn-principal');
    cancelarBtn.style.backgroundColor = '#999';
    cancelarBtn.style.marginTop = '10px';

    cancelarBtn.onclick = () => {
      limpiarFormulario();
      import('./ui.js').then(({ mostrarCitas }) => mostrarCitas());
    };

    document.getElementById('formulario').appendChild(cancelarBtn);
  }
}
