$(document).ready(function () {

  // ── 1. ANIMACIÓN DEL HERO CON JQUERY ──────────────────────
  // Los elementos .hero-animate empiezan ocultos (opacity 0, abajo)
  // y aparecen de a uno con jQuery .delay() + .animate()
  $('.hero-animate').css({ opacity: 0, marginTop: '30px' });

  $('.hero-animate').each(function (i) {
    $(this).delay(i * 250).animate(
      { opacity: 1, marginTop: '0px' },
      { duration: 600, easing: 'swing' }
    );
  });


  // ── 2. HOVER EN CARDS CON JQUERY ──────────────────────────
  // Complementa el CSS: eleva la card y satura la imagen
  $(document).on('mouseenter', '.dest-card', function () {
    $(this).find('.card-img-wrap img').stop().animate({ opacity: 0.88 }, 200);
  }).on('mouseleave', '.dest-card', function () {
    $(this).find('.card-img-wrap img').stop().animate({ opacity: 1 }, 200);
  });


  // ── 3. CONTADOR ANIMADO CON JQUERY ────────────────────────
  // Usa $({ count }) para animar el número de 0 al target
  function animarContadores() {
    $('.stat-number').each(function () {
      const $el     = $(this);
      const target  = parseInt($el.attr('data-target'));
      const inicio  = { count: 0 };

      $({ count: 0 }).animate({ count: target }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
          $el.text(Math.floor(this.count).toLocaleString('es-AR'));
        },
        complete: function () {
          $el.text(target.toLocaleString('es-AR'));
        }
      });
    });
  }

  // Activar solo cuando la sección entra en pantalla
  let contadorActivado = false;

  $(window).on('scroll', function () {
    if (contadorActivado) return;

    const seccion = $('.stats-section');
    if (seccion.length === 0) return;

    const offsetTop    = seccion.offset().top;
    const scrollBottom = $(window).scrollTop() + $(window).height();

    if (scrollBottom > offsetTop + 80) {
      contadorActivado = true;
      animarContadores();
    }
  });


  // ── 4. NEWSLETTER CON VALIDACIÓN JQUERY ───────────────────
  $('#newsletterForm').on('submit', function (e) {
    e.preventDefault();

    const $input = $('#newsletter-email');
    const $msg   = $('#newsletterMsg');
    const valor  = $input.val().trim();
    // Expresión regular básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(valor)) {
      $msg.text('Por favor ingresá un email válido.').removeClass('ok').addClass('err');
      $input.focus();
      return;
    }

    // Feedback de éxito
    $msg.text('¡Te suscribiste correctamente!').removeClass('err').addClass('ok');
    $input.val('');

    // Limpiar el mensaje después de 4 segundos
    setTimeout(() => $msg.text('').removeClass('ok err'), 4000);
  });


  // ── 5. TOOLTIPS BOOTSTRAP (inicializar) ───────────────────
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach(el => new bootstrap.Tooltip(el));


  // ── 6. NAVBAR SCROLL – agregar sombra al bajar ────────────
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 10) {
      $('.viajar-navbar').addClass('navbar-scrolled');
    } else {
      $('.viajar-navbar').removeClass('navbar-scrolled');
    }
  });

});