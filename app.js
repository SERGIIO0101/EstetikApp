// Obtener el contenedor de citas y el formulario
const formulario = document.getElementById('formulario');
const contenedorCitas = document.getElementById('citas');
let citas = JSON.parse(localStorage.getItem('citas')) || [];

// Función reutilizable para mostrar mensajes (error o éxito)
function mostrarMensaje(texto, tipo = "error") {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
  mensaje.classList.remove('oculto');

  setTimeout(() => {
    mensaje.classList.add('oculto');
    mensaje.textContent = '';
  }, 4000);
}

// Mostrar citas al cargar
document.addEventListener('DOMContentLoaded', mostrarCitas);

// Evento al enviar el formulario
formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtener valores
  const nombre = document.getElementById('nombre').value.trim();
  const servicio = document.getElementById('servicio').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;

  // Validaciones básicas
  if (!nombre || !servicio || !fecha || !hora) {
    mostrarMensaje("❗ Todos los campos son obligatorios.", "error");
    return;
  }

  // Validar cita duplicada (fecha + hora)
  const citaDuplicada = citas.find(cita =>
    cita.fecha === fecha && cita.hora === hora
  );

  if (citaDuplicada) {
    mostrarMensaje("⚠️ Ya hay una cita registrada para esa fecha y hora.", "error");
    return;
  }

  // Crear cita
  const nuevaCita = { nombre, servicio, fecha, hora };
  citas.push(nuevaCita);
  localStorage.setItem('citas', JSON.stringify(citas));

  mostrarMensaje("✅ Cita agendada exitosamente.", "exito");

  formulario.reset();
  mostrarCitas();
});

// Mostrar las citas en pantalla
function mostrarCitas() {
  contenedorCitas.innerHTML = '';

  if (citas.length === 0) {
    contenedorCitas.innerHTML = '<p>No hay citas registradas.</p>';
    return;
  }

  citas.forEach((cita, index) => {
    const div = document.createElement('div');
    div.classList.add('cita');
    div.innerHTML = `
      <strong>${cita.nombre}</strong> - ${cita.servicio}<br>
      📅 ${cita.fecha} 🕒 ${cita.hora}
      <button onclick="eliminarCita(${index})">Eliminar</button>
    `;
    contenedorCitas.appendChild(div);
  });
}

// Eliminar cita
function eliminarCita(index) {
  citas.splice(index, 1);
  localStorage.setItem('citas', JSON.stringify(citas));
  mostrarMensaje("🗑️ Cita eliminada.", "exito");
  mostrarCitas();
}
