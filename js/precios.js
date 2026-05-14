$(document).ready(function () {

  // ── 1. INICIALIZAR TOOLTIPS BOOTSTRAP ─────────────────────
  // Activa todos los elementos con data-bs-toggle="tooltip"
  const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipEls.forEach(el => new bootstrap.Tooltip(el, { trigger: 'hover focus' }));


  // ── 2. HOVER DINÁMICO EN TABLA CON jQuery ─────────────────
  $('#tablaComp tbody tr').on('mouseenter', function () {
    $(this).addClass('fila-hover');
  }).on('mouseleave', function () {
    $(this).removeClass('fila-hover');
  });


  // ── 3. HOVER EN PLAN CARDS CON jQuery ─────────────────────
  $('.plan-card').on('mouseenter', function () {
    $(this).find('.plan-header').stop(true).animate({ opacity: 0.9 }, 150);
  }).on('mouseleave', function () {
    $(this).find('.plan-header').stop(true).animate({ opacity: 1 }, 150);
  });

});