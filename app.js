// Establecer el mínimo de fecha como hoy
const fechaInput = document.getElementById('fecha');
const hoy = new Date().toISOString().split("T")[0];
fechaInput.min = hoy;


// Referencias al formulario y al elemento donde se mostrarán las citas
const form = document.getElementById('form-cita');
const lista = document.getElementById('lista-citas');

// Intentar recuperar citas almacenadas en localStorage, o empezar con un array vacío
let citas = JSON.parse(localStorage.getItem('citas')) || [];

// Función para mostrar las citas en pantalla
function renderCitas() {
  // Limpiar la lista actual
  lista.innerHTML = '';

  // Recorrer el array de citas y crear elementos <li> para cada una
  citas.forEach((cita, index) => {
    const li = document.createElement('li');
    li.textContent = `${cita.nombre} - ${cita.servicio} - ${cita.fecha} ${cita.hora}`;

    // Crear botón para eliminar esta cita
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => {
      // Eliminar la cita del array
      citas.splice(index, 1);

      // Guardar el nuevo array en localStorage
      localStorage.setItem('citas', JSON.stringify(citas));

      // Volver a renderizar la lista actualizada
      renderCitas();
    };

    // Agregar el botón al <li> y el <li> a la lista
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

// Manejar el evento de envío del formulario
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Evitar que se recargue la página

  // Crear un objeto con los datos ingresados
  const nuevaCita = {
    nombre: document.getElementById('nombre').value,
    servicio: document.getElementById('servicio').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value
  };

  // Agregar la nueva cita al array
  citas.push(nuevaCita);

  // Guardar el array actualizado en localStorage
  localStorage.setItem('citas', JSON.stringify(citas));

  // Volver a mostrar todas las citas actualizadas
  renderCitas();

  // Limpiar el formulario
  form.reset();
});

// Mostrar las citas al cargar la página
renderCitas();
