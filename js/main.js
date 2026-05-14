$(document).ready(function () {

  // ── 1. DARK MODE con jQuery ───────────────────────────────
  const $html = $('html');

  // Aplicar tema guardado en localStorage
  if (localStorage.getItem('theme') === 'dark') {
    $html.attr('data-theme', 'dark');
  }

  // Cambiar tema al hacer clic
  $('#themeToggle').on('click', function () {
    const isDark = $html.attr('data-theme') === 'dark';
    $html.attr('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });


  // ── 2. NAVBAR SCROLLED (sombra al bajar) ─────────────────
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 10) {
      $('.viajar-navbar').addClass('navbar-scrolled');
    } else {
      $('.viajar-navbar').removeClass('navbar-scrolled');
    }
  });


  // ── 3. CERRAR MENÚ MOBILE AL HACER CLIC EN UN LINK ───────
  // Bootstrap colapsa el menú, pero este helper lo asegura
  $('.navbar-nav .nav-link').on('click', function () {
    const $collapse = $('#navbarMain');
    if ($collapse.hasClass('show')) {
      $collapse.collapse('hide');
    }
  });

});