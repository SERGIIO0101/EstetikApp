import flatpickr from "https://cdn.jsdelivr.net/npm/flatpickr";

export function inicializarReservas() {
  // Variables para el stepper
  let currentStep = 1;
  const steps = Array.from(document.querySelectorAll('.form-step'));
  const stepperItems = Array.from(document.querySelectorAll('.step'));

  // Campos del formulario
  const campos = ['nombre', 'servicio', 'profesional', 'fecha', 'hora'];
  const form = document.getElementById('form-cita');
  const mensaje = document.getElementById('mensaje-cita');

  if (!form) return;

  // Inicializar Flatpickr para fecha y hora
  flatpickr('#fecha', {
    dateFormat: 'Y-m-d',
    minDate: 'today',
    disableMobile: true,
    locale: { firstDayOfWeek: 1 }
  });
  flatpickr('#hora', {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time_24hr: true,
    minuteIncrement: 15,
    disableMobile: true
  });

  // Crea dinámicamente el contenedor de resumen
  const paso3Fieldset = document.querySelector('.form-step[data-step="3"]');
  let resumenContainer = paso3Fieldset.querySelector('#resumen-cita');
  if (!resumenContainer) {
    resumenContainer = document.createElement('div');
    resumenContainer.id = 'resumen-cita';
    resumenContainer.className = 'resumen-cita';
    paso3Fieldset.insertBefore(resumenContainer, paso3Fieldset.querySelector('.buttons'));
  }

  // Muestra el paso indicado, actualiza el stepper y renderiza resumen si corresponde
  function showStep(step) {
    steps.forEach(f => f.classList.toggle('form-step--active', parseInt(f.dataset.step) === step));
    stepperItems.forEach(item => {
      const s = parseInt(item.dataset.step);
      item.classList.toggle('active', s === step);
      item.classList.toggle('completed', s < step);
    });
    if (step === 3) renderResumen();
  }

  // Renderiza el resumen de la cita
  function renderResumen() {
    const datos = campos.reduce((acc, id) => {
      const val = document.getElementById(id).value;
      acc[id] = id === 'nombre' ? val.trim() : val;
      return acc;
    }, {});
    resumenContainer.innerHTML = `
      <h3>Resumen de tu Cita</h3>
      <ul>
        <li><strong>Nombre:</strong> ${datos.nombre}</li>
        <li><strong>Servicio:</strong> ${datos.servicio}</li>
        <li><strong>Profesional:</strong> ${datos.profesional}</li>
        <li><strong>Fecha:</strong> ${datos.fecha}</li>
        <li><strong>Hora:</strong> ${datos.hora}</li>
      </ul>
    `;
  }

  // Botones de navegación del stepper
  document.querySelectorAll('.btn-next').forEach(btn =>
    btn.addEventListener('click', () => {
      if (currentStep < steps.length) {
        currentStep++;
        showStep(currentStep);
      }
    })
  );
  document.querySelectorAll('.btn-prev').forEach(btn =>
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    })
  );

  // Validación inline
  campos.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('blur', () => validarCampo(input));
      input.addEventListener('input', () => validarCampo(input));
    }
  });

  // Manejo del envío de formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valido = true;
    campos.forEach(id => {
      const input = document.getElementById(id);
      if (!validarCampo(input)) valido = false;
    });
    if (!valido) {
      mostrarMensaje('Por favor, corrige los errores antes de enviar.', 'error');
      return;
    }
    const nuevaCita = campos.reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id).value.trim() }), {});
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas.push(nuevaCita);
    localStorage.setItem('citas', JSON.stringify(citas));
    mostrarMensaje('¡Cita registrada exitosamente!', 'exito');
    form.reset();
    campos.forEach(id => limpiarError(document.getElementById(id)));
    // Reinicia al primer paso
    currentStep = 1;
    showStep(currentStep);
  });

  // Funciones auxiliares: validarCampo, limpiarError, mostrarMensaje
  function validarCampo(input) {
    const valor = input.value.trim();
    let msg = '';
    if (input.tagName === 'SELECT' && !valor) msg = 'Selecciona una opción.';
    else if (input.tagName === 'INPUT' && !valor) msg = 'Este campo es obligatorio.';
    const errId = `error-${input.id}`;
    let errElem = document.getElementById(errId);
    if (!errElem) {
      errElem = document.createElement('div'); errElem.id = errId;
      errElem.className = 'error-message';
      input.parentNode.appendChild(errElem);
    }
    if (msg) { input.classList.add('input-error'); errElem.textContent = msg; return false; }
    input.classList.remove('input-error'); errElem.textContent = ''; return true;
  }
  function limpiarError(input) {
    const errElem = document.getElementById(`error-${input.id}`);
    if (errElem) errElem.textContent = '';
    input.classList.remove('input-error');
  }
  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    mensaje.classList.remove('oculto');
    setTimeout(() => { mensaje.classList.add('oculto'); mensaje.textContent = ''; }, 4000);
  }

  // Inicia mostrando el primer paso
  showStep(currentStep);
}
