export function inicializarMenu() {
  const btnMenu = document.getElementById('menu-toggle');
  const menu = document.querySelector('.menu-principal ul');

  if (btnMenu && menu) {
    // Abrir/cerrar menú hamburguesa
    btnMenu.addEventListener('click', () => {
      menu.classList.toggle('activo');
    });

    // Cuando se hace clic en un enlace del menú
    menu.querySelectorAll('a').forEach(enlace => {
      enlace.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el salto automático
        const destino = e.target.getAttribute('href');

        // Cierra el menú en móvil
        menu.classList.remove('activo');

        // Mostrar la sección correspondiente
        mostrarSeccion(destino);
      });
    });
  }
}

function mostrarSeccion(id) {
  // Oculta todas las secciones
  document.querySelectorAll('section').forEach(seccion => {
    seccion.classList.add('oculto');
    seccion.classList.remove('fade-in'); // Por si acaso
  });

  // Muestra la sección seleccionada con animación
  const seccionMostrar = document.querySelector(id);
  if (seccionMostrar) {
    seccionMostrar.classList.remove('oculto');
    seccionMostrar.classList.add('fade-in');
    seccionMostrar.scrollIntoView({ behavior: 'smooth' });
  }
}
