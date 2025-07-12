export function inicializarMenu() {
  const btnMenu = document.getElementById('menu-toggle');
  const menu = document.querySelector('.menu-principal ul');

  if (btnMenu && menu) {
    btnMenu.addEventListener('click', () => {
      menu.classList.toggle('activo');
    });

    // Cierra el menú automáticamente al hacer clic en un enlace (modo móvil)
    menu.querySelectorAll('a').forEach(enlace => {
      enlace.addEventListener('click', () => {
        menu.classList.remove('activo');
      });
    });
  }
}
