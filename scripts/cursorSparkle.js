export function inicializarSparkles() {
  console.log('✨ Sparkles initialized');
  document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    document.body.appendChild(sparkle);

    // Posiciona la chispa en la coordenada del cursor con un offset aleatorio
    const x = e.clientX + (Math.random() * 10 - 5);
    const y = e.clientY + (Math.random() * 10 - 5);
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    // Elimina el elemento tras la animación
    sparkle.addEventListener('animationend', () => {
      sparkle.remove();
    });
  });
}

