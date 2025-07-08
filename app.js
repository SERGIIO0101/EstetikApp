// Obtener el contenedor de citas y el formulario
const formulario = document.getElementById('formulario');
const contenedorCitas = document.getElementById('citas');
const btnSubmit = document.getElementById('btnSubmit');
let citas = JSON.parse(localStorage.getItem('citas')) || [];
let editandoIndex = null;

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
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.formulario-seccion').style.display = 'none';
  document.querySelector('.lista-citas').style.display = 'none';
  mostrarCitas();
});

// Mostrar la app después de hacer clic en "Reservar ahora"
document.getElementById('btnReservar').addEventListener('click', () => {
  document.getElementById('pantalla-inicio').style.display = 'none';
  document.querySelector('.formulario-seccion').style.display = 'block';
  document.querySelector('.lista-citas').style.display = 'block';
});

// Toggle menú hamburguesa
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('.menu-principal ul').classList.toggle('activo');
});

// Evento al enviar el formulario
formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const servicio = document.getElementById('servicio').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;

  if (!nombre || !servicio || !fecha || !hora) {
    mostrarMensaje("Todos los campos son obligatorios.", "error");
    return;
  }

  const citaDuplicada = citas.find((cita, i) =>
    i !== editandoIndex && cita.fecha === fecha && cita.hora === hora
  );

  if (citaDuplicada) {
    mostrarMensaje("Ya hay una cita registrada para esa fecha y hora.", "error");
    return;
  }

  const nuevaCita = { nombre, servicio, fecha, hora };

  if (editandoIndex !== null) {
    citas[editandoIndex] = nuevaCita;
    mostrarMensaje("Cita actualizada exitosamente.", "exito");
    editandoIndex = null;
    btnSubmit.textContent = 'Agendar cita';
    const cancelarBtn = document.getElementById('cancelarEdicion');
    if (cancelarBtn) cancelarBtn.remove();
  } else {
    citas.push(nuevaCita);
    mostrarMensaje("Cita agendada exitosamente.", "exito");
  }

  localStorage.setItem('citas', JSON.stringify(citas));
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
    const card = document.createElement('div');
    card.classList.add('cita-card');

    const info = document.createElement('div');
    info.classList.add('cita-info');
    info.innerHTML = `
      <h3>${cita.nombre}</h3>
      <p><strong>Servicio:</strong> ${cita.servicio}</p>
      <p><strong>Fecha:</strong> ${cita.fecha}</p>
      <p><strong>Hora:</strong> ${cita.hora}</p>
    `;

    const acciones = document.createElement('div');
    acciones.classList.add('cita-acciones');

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn-editar');
    btnEditar.title = 'Editar cita';
    btnEditar.textContent = '✎';
    btnEditar.onclick = () => editarCita(index);

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn-eliminar');
    btnEliminar.title = 'Eliminar cita';
    btnEliminar.textContent = '🗑️';
    btnEliminar.onclick = () => eliminarCita(index);

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    card.appendChild(info);
    card.appendChild(acciones);
    contenedorCitas.appendChild(card);
  });
}

// Eliminar cita
function eliminarCita(index) {
  citas.splice(index, 1);
  localStorage.setItem('citas', JSON.stringify(citas));
  mostrarMensaje("Cita eliminada.", "exito");
  mostrarCitas();
}

// Editar cita
function editarCita(index) {
  const cita = citas[index];
  document.getElementById('nombre').value = cita.nombre;
  document.getElementById('servicio').value = cita.servicio;
  document.getElementById('fecha').value = cita.fecha;
  document.getElementById('hora').value = cita.hora;
  editandoIndex = index;
  btnSubmit.textContent = 'Actualizar cita';

  if (!document.getElementById('cancelarEdicion')) {
    const cancelarBtn = document.createElement('button');
    cancelarBtn.textContent = 'Cancelar edición';
    cancelarBtn.id = 'cancelarEdicion';
    cancelarBtn.classList.add('btn-principal');
    cancelarBtn.style.backgroundColor = '#999';
    cancelarBtn.style.marginTop = '10px';

    cancelarBtn.onclick = () => {
      formulario.reset();
      editandoIndex = null;
      cancelarBtn.remove();
      btnSubmit.textContent = 'Agendar cita';
      mostrarCitas();
    };

    formulario.appendChild(cancelarBtn);
  }
}
