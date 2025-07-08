// Variables globales
const formulario = document.getElementById('formulario');
const contenedorCitas = document.getElementById('citas');
const btnSubmit = document.getElementById('btnSubmit');
let citas = JSON.parse(localStorage.getItem('citas')) || [];
let editandoIndex = null;

// Función para mostrar mensajes temporales
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

// Mostrar citas en pantalla
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
      <p><strong>Profesional:</strong> ${cita.personal}</p>
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
  document.getElementById('personal').value = cita.personal;
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

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  // Ocultar secciones al iniciar
  document.querySelector('.formulario-seccion').style.display = 'none';
  document.querySelector('.lista-citas').style.display = 'none';

  // Mostrar citas si existen
  mostrarCitas();

  // Cerrar modal
  const cerrarModal = document.getElementById('btnCerrarModal');
  if (cerrarModal) {
    cerrarModal.addEventListener('click', () => {
      document.getElementById('modalConfirmacion').classList.add('oculto');
    });
  }

  // Toggle menú hamburguesa
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.querySelector('.menu-principal ul').classList.toggle('activo');
  });

  // Botón "Reservar ahora" (inicio)
  document.getElementById('btnReservar').addEventListener('click', () => {
    document.getElementById('pantalla-inicio').style.display = 'none';
    document.querySelector('.formulario-seccion').style.display = 'block';
    document.querySelector('.lista-citas').style.display = 'block';
  });

  // Botones "Reservar" desde tarjetas de servicios
  document.querySelectorAll('.reservar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('pantalla-inicio').style.display = 'none';
      document.querySelector('.formulario-seccion').style.display = 'block';
      document.querySelector('.lista-citas').style.display = 'block';
      document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Botones "Reservar" desde personal
  document.querySelectorAll('.personal-card .reservar-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.personal-card');
      const nombre = card.querySelector('h3').textContent;
      document.getElementById('personal').value = nombre;

      document.getElementById('pantalla-inicio').style.display = 'none';
      document.querySelector('.formulario-seccion').style.display = 'block';
      document.querySelector('.lista-citas').style.display = 'block';
      document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
    });
  });
});

// Evento al enviar el formulario
formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const servicio = document.getElementById('servicio').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const personal = document.getElementById('personal').value;

  if (!nombre || !servicio || !fecha || !hora || !personal) {
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

  const nuevaCita = { nombre, servicio, fecha, hora, personal };

  if (editandoIndex !== null) {
    citas[editandoIndex] = nuevaCita;
    mostrarMensaje("Cita actualizada exitosamente.", "exito");
    editandoIndex = null;
    btnSubmit.textContent = 'Agendar cita';
    const cancelarBtn = document.getElementById('cancelarEdicion');
    if (cancelarBtn) cancelarBtn.remove();
  } else {
    citas.push(nuevaCita);
    const detalle = `
      <strong>Cliente:</strong> ${nombre}<br>
      <strong>Servicio:</strong> ${servicio}<br>
      <strong>Profesional:</strong> ${personal}<br>
      <strong>Fecha:</strong> ${fecha}<br>
      <strong>Hora:</strong> ${hora}
    `;
    document.getElementById('detalleCita').innerHTML = detalle;
    document.getElementById('modalConfirmacion').classList.remove('oculto');
  }

  localStorage.setItem('citas', JSON.stringify(citas));
  formulario.reset();
  mostrarCitas();
});

document.getElementById('btnCerrarModal').addEventListener('click', () => {
  document.getElementById('modalConfirmacion').classList.add('oculto');
});

// Forzar que el modal esté oculto al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalConfirmacion').classList.add('oculto');
});

