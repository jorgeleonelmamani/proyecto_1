$(document).ready(function () {

  // ── 1. FILTROS CON jQuery .show() / .hide() ───────────────
  $('#blogFiltros .filtro-btn').on('click', function () {
    const cat = $(this).data('cat');

    $('#blogFiltros .filtro-btn').removeClass('active');
    $(this).addClass('active');

    if (cat === 'todos') {
      $('.blog-card').fadeIn(300);
    } else {
      $('.blog-card').hide();
      $('[data-cat="' + cat + '"]').fadeIn(300);
    }
  });


  // ── 2. SCROLL REVEAL CON jQuery ──
  function checkReveal() {
    $('.reveal').each(function () {
      const top         = $(this).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > top + 60) {
        $(this).addClass('revealed');
      }
    });
  }

  $(window).on('scroll', checkReveal);
  checkReveal(); // ejecutar al cargar


  // ── 3. LIKES CON jQuery ───────────────────────────────────
  $(document).on('click', '.com-like', function () {
    const $count = $(this).find('.like-count');
    const actual = parseInt($count.text());

    // Toggle like
    if ($(this).hasClass('liked')) {
      $(this).removeClass('liked');
      $count.text(actual - 1);
    } else {
      $(this).addClass('liked');
      $count.text(actual + 1);
      // Animación con jQuery
      $count.animate({ opacity: 0 }, 100).animate({ opacity: 1 }, 200);
    }
  });


  // ── 4. FORMULARIO DE COMENTARIOS CON jQuery ──
  $('#comForm').on('submit', function (e) {
    e.preventDefault();

    const nombre  = $('#com-nombre').val().trim();
    const texto   = $('#com-texto').val().trim();

    if (nombre.length < 2 || texto.length < 10) {
      alert('Por favor completá todos los campos correctamente.');
      return;
    }

    // Crear nuevo comentario y agregarlo al DOM
    const iniciales = nombre.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
    const colores   = ['naranja', 'azul', 'verde', 'rojo'];
    const color     = colores[Math.floor(Math.random() * colores.length)];
    const fecha     = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

    const $nuevo = $(`
      <article class="comentario" style="opacity:0">
        <div class="com-avatar com-avatar--${color}" data-iniciales="${iniciales}"></div>
        <div class="com-body">
          <div class="com-header">
            <strong class="com-nombre">${nombre}</strong>
            <time class="com-fecha">${fecha}</time>
          </div>
          <p class="com-texto">${texto}</p>
          <button class="com-like"><i class="fa-solid fa-heart me-1"></i><span class="like-count">0</span></button>
        </div>
      </article>
    `);

    // Insertar antes del formulario y animar entrada
    $('.nuevo-comentario').before($nuevo);
    $nuevo.animate({ opacity: 1 }, 400);

    // Limpiar formulario
    this.reset();
  });

});