import { mostrarMensaje, mostrarCitas } from './ui.js';
import { cargarCitaEnFormulario, setEditandoIndex } from './formulario.js';
import { mostrarModalConfirmacion } from './modal.js';

let citas = JSON.parse(localStorage.getItem('citas')) || [];

// Obtener todas las citas
export function obtenerCitas() {
  return citas;
}

// Guardar en localStorage
export function guardarCitasEnStorage() {
  localStorage.setItem('citas', JSON.stringify(citas));
}

// Agregar o actualizar una cita
export function agregarCita(nuevaCita, index = null) {
  // Validar duplicado (excepto en edición de la misma posición)
  const duplicada = citas.find((cita, i) =>
    i !== index && cita.fecha === nuevaCita.fecha && cita.hora === nuevaCita.hora
  );

  if (duplicada) {
    mostrarMensaje("Ya hay una cita registrada para esa fecha y hora", "error");
    return false;
  }

  if (index !== null) {
    // Actualizar cita existente
    citas[index] = nuevaCita;
    mostrarMensaje("Cita actualizada exitosamente", "exito");
  } else {
    // Agregar nueva cita
    citas.push(nuevaCita);
    mostrarMensaje("Cita registrada exitosamente", "exito");
    mostrarModalConfirmacion(nuevaCita); // ✅ Solo en nueva cita
  }

  guardarCitasEnStorage();
  mostrarCitas();
  return true;
}

// Eliminar cita por índice
export function eliminarCita(index) {
  citas.splice(index, 1);
  guardarCitasEnStorage();
  mostrarMensaje("Cita eliminada", "exito");
  mostrarCitas();
}

// Editar cita (cargar en formulario)
export function editarCita(index) {
  const cita = citas[index];
  cita.index = index;
  cargarCitaEnFormulario(cita);
  setEditandoIndex(index);
}
