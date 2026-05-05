
// ---- 1. DARK MODE ----
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
 
// Al cargar la página, aplicar el tema guardado
if (localStorage.getItem('theme') === 'dark') {
  html.setAttribute('data-theme', 'dark');
}
 
// Al hacer clic en el botón, cambiar el tema
themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});
 
 
// ---- 2. MENÚ HAMBURGUESA (mobile) ----
const burger = document.getElementById('burgerBtn');
const nav = document.querySelector('.main-nav');
 
burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav-open');
  burger.setAttribute('aria-expanded', isOpen);
});
 
 
// ---- 3. CONTADOR ANIMADO ----
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
 
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target'); // número final
    const duration = 2000; // duración total en ms
    const step = target / (duration / 16); // cuánto sumar por frame
    let current = 0;
 
    const timer = setInterval(() => {
      current += step;
 
      if (current >= target) {
        current = target;
        clearInterval(timer); // parar cuando llega al número final
      }
 
      // Mostrar el número con separador de miles (ej: 12.000)
      counter.textContent = Math.floor(current).toLocaleString('es-AR');
    }, 16);
  });
}
 
// Usar IntersectionObserver para que el contador
// solo arranque cuando el usuario llega a esa sección
const statsSection = document.querySelector('.stats-section');
let counted = false;
 
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;        // que no se reinicie si vuelve a la sección
    animateCounters();
  }
}, { threshold: 0.3 });   // activar cuando el 30% de la sección sea visible
 
if (statsSection) {
  observer.observe(statsSection);
}