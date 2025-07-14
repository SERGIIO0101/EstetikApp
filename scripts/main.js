import { inicializarMenu } from './menu.js';
import { inicializarCarrusel } from './carrusel.js';
import { inicializarReservas } from './reservas.js';
import { inicializarSparkles } from './cursorSparkle.js';

document.addEventListener('DOMContentLoaded', () => {
  inicializarMenu();
  inicializarCarrusel();
  inicializarReservas();
  inicializarSparkles();
});
