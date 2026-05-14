$(document).ready(function () {

  // ── 1. FILTROS DINÁMICOS (Requisito: .filter(), .hide(), .show()) ──
  $('#filtrosGaleria .filtro-btn').on('click', function () {
    const filtro = $(this).data('filtro');

    // Actualizar botón activo
    $('#filtrosGaleria .filtro-btn').removeClass('active');
    $(this).addClass('active');

    // Seleccionamos todas las columnas de destinos
    const $destinos = $('.dest-col');

    if (filtro === 'todos') {
      $destinos.show(400); // .show() según consigna
      $('#sinResultados').hide();
    } else {
      // Ocultamos todos primero
      $destinos.hide();

      // Usamos .filter() para encontrar los que coinciden
      const $seleccionados = $destinos.filter(function() {
        return $(this).data('cat') === filtro;
      });

      if ($seleccionados.length > 0) {
        $seleccionados.show(400);
        $('#sinResultados').hide();
      } else {
        $('#sinResultados').show();
      }
    }
  });

  // ── 2. CARDS CON EFECTOS DE ZOOM (CSS + jQuery) ──
  // El PDF pide explícitamente combinar CSS + jQuery para el zoom
  $('.dest-item').on('mouseenter', function () {
    // El zoom fuerte lo hace el CSS con transform, 
    // pero jQuery puede manejar el cambio de opacidad o bordes
    $(this).find('img').css('transition', 'all 0.5s'); 
    $(this).addClass('shadow-lg');
  }).on('mouseleave', function () {
    $(this).removeClass('shadow-lg');
  });

  // ── 3. TABLA DE PRECIOS 
  // Asegúrate de que en el HTML la tabla esté envuelta en <div class="table-responsive">
  $('.precio-tabla tbody tr').hover(
    function() { $(this).css('background-color', 'rgba(0,0,0,0.05)'); },
    function() { $(this).css('background-color', 'transparent'); }
  );

});