$(document).ready(function () {

  // ── 1. FLIP CON jQuery .toggleClass() ──
  // Al hacer clic en la card, jQuery agrega/quita .flipped
  // El CSS usa .flipped para rotar el .flip-inner
  $('.flip-card').on('click', function () {
    $(this).toggleClass('flipped');
  });

  // También con teclado (Enter / Espacio)
  $('.flip-card').on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).toggleClass('flipped');
    }
  });


  // ── 2. RATING CON ESTRELLAS jQuery ──
  // Hover: ilumina estrellas hasta la que está el cursor
  // Clic: fija la puntuación y muestra feedback
  $(document).on('mouseenter', '.star-btn', function () {
    const val      = parseInt($(this).data('val'));
    const $rating  = $(this).closest('.rating');

    $rating.find('.star-btn').each(function () {
      const starVal = parseInt($(this).data('val'));
      if (starVal <= val) {
        $(this).removeClass('fa-regular').addClass('fa-solid filled');
      } else {
        $(this).removeClass('fa-solid filled').addClass('fa-regular');
      }
    });
  });

  // Al salir del rating, restaurar la puntuación guardada
  $(document).on('mouseleave', '.rating', function () {
    const guardada = parseInt($(this).data('puntuacion')) || 5;
    const $stars   = $(this).find('.star-btn');

    $stars.each(function () {
      const starVal = parseInt($(this).data('val'));
      if (starVal <= guardada) {
        $(this).removeClass('fa-regular').addClass('fa-solid filled');
      } else {
        $(this).removeClass('fa-solid filled').addClass('fa-regular');
      }
    });
  });

  // Clic: guardar puntuación
  $(document).on('click', '.star-btn', function (e) {
    e.stopPropagation(); // no activar el flip al calificar
    const val     = parseInt($(this).data('val'));
    const $rating = $(this).closest('.rating');

    $rating.data('puntuacion', val);

    // Mostrar Toast de Bootstrap con feedback
    const agencia = $rating.closest('.flip-front').find('.flip-nombre').text();
    mostrarToast(`¡Calificaste ${agencia} con ${val} estrellas!`);
  });


  // ── 3. TOAST BOOTSTRAP para feedback ──
  function mostrarToast(mensaje) {
    // Crear toast dinámicamente si no existe
    if ($('#ratingToast').length === 0) {
      $('body').append(`
        <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index:9999">
          <div id="ratingToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive">
            <div class="d-flex">
              <div class="toast-body" id="toastMsg"></div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
            </div>
          </div>
        </div>
      `);
    }
    $('#toastMsg').text(mensaje);
    const toast = new bootstrap.Toast(document.getElementById('ratingToast'), { delay: 2500 });
    toast.show();
  }

});