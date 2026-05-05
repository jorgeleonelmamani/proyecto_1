// ============================================================
//  contacto.js — Lógica del formulario de contacto
//  Maneja: spinner de carga + modal de confirmación
// ============================================================

const form        = document.getElementById('contactoForm');
const submitBtn   = document.getElementById('submitBtn');
const modal       = document.getElementById('modalOverlay');
const modalCerrar = document.getElementById('modalCerrar');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evitar recarga de página

    // Verificar que el formulario es válido antes de continuar
    if (!form.checkValidity()) {
      // Mostrar errores nativos del navegador
      form.reportValidity();
      return;
    }

    // ---- 1. Mostrar spinner (agregar clase .loading) ----
    form.classList.add('loading');
    submitBtn.setAttribute('disabled', true);

    // ---- 2. Simular envío (en un proyecto real sería un fetch) ----
    setTimeout(() => {
      // ---- 3. Ocultar spinner ----
      form.classList.remove('loading');
      submitBtn.removeAttribute('disabled');

      // ---- 4. Mostrar modal de confirmación ----
      modal.classList.add('modal-visible');
      modal.setAttribute('aria-hidden', 'false');

      // Limpiar el formulario
      form.reset();
    }, 2000); // 2 segundos simulando la espera
  });
}

// Cerrar el modal al hacer clic en el botón
if (modalCerrar) {
  modalCerrar.addEventListener('click', () => {
    modal.classList.remove('modal-visible');
    modal.setAttribute('aria-hidden', 'true');
    // Redirigir al inicio
    window.location.href = 'index.html';
  });
}

// Cerrar el modal al hacer clic fuera del cuadro
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('modal-visible');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}