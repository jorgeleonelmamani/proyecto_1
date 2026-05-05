// ============================================================
//  blog.js — Scroll Reveal con IntersectionObserver
//  Los artículos con clase .reveal aparecen al hacer scroll
// ============================================================

const elementos = document.querySelectorAll('.reveal');

// IntersectionObserver observa cada elemento
// y le agrega .revealed cuando entra en pantalla
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Dejar de observar una vez revelado (no se repite)
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12  // se activa cuando el 12% del elemento es visible
});

elementos.forEach(el => revealObserver.observe(el));