$(document).ready(function () {

  // ── Datos de cada error ───────────────────────────────────
  const errores = {
    1: {
      titulo: '🚨 Dominio falso detectado',
      body: `
        <div class="alert alert-danger mb-3">
          <strong>Error encontrado:</strong> El remitente usa <code>aerolineas-arg.xyz</code>
        </div>
        <p>El dominio <strong>.xyz</strong> es una señal clara de fraude. Las empresas legítimas usan dominios oficiales como <code>.com.ar</code>, <code>.com</code> o <code>.gov.ar</code>.</p>
        <p class="mb-0"><strong>Consejo:</strong> Siempre verificá que el dominio del remitente coincida exactamente con el sitio oficial de la empresa.</p>
      `
    },
    2: {
      titulo: '⚠️ Urgencia artificial',
      body: `
        <div class="alert alert-warning mb-3">
          <strong>Error encontrado:</strong> El asunto genera pánico y urgencia
        </div>
        <p>Los atacantes usan mensajes urgentes para que actúes sin pensar. Frases como <strong>"CANCELADA en 2 horas"</strong> son manipulación psicológica.</p>
        <p class="mb-0"><strong>Consejo:</strong> Ante cualquier mensaje urgente, tomá un respiro y verificá contactando a la empresa directamente por canales oficiales.</p>
      `
    },
    3: {
      titulo: '🔗 Enlace malicioso',
      body: `
        <div class="alert alert-danger mb-3">
          <strong>Error encontrado:</strong> El enlace apunta a un dominio no oficial
        </div>
        <p>El enlace lleva a <code>aerolineas-confirmacion.xyz</code>, que no es el sitio oficial. Hacer clic podría llevar a una página que roba tus datos o instala malware.</p>
        <p class="mb-0"><strong>Consejo:</strong> Antes de hacer clic, pasá el cursor sobre el enlace para ver la URL real. Si no reconocés el dominio, no hagas clic.</p>
      `
    },
    4: {
      titulo: '☠️ Archivo ejecutable peligroso',
      body: `
        <div class="alert alert-danger mb-3">
          <strong>Error encontrado:</strong> Adjunto con extensión <code>.exe</code>
        </div>
        <p>Los archivos <strong>.exe</strong> son programas que se ejecutan en tu computadora. Un atacante puede usarlos para instalar un virus, robar contraseñas o cifrar tus archivos (ransomware).</p>
        <p class="mb-0"><strong>Consejo:</strong> Nunca abras archivos .exe, .bat, .vbs o .zip de fuentes desconocidas. Los comprobantes de viaje legítimos son siempre PDF.</p>
      `
    },
    5: {
      titulo: '✍️ Nombre de empresa incorrecto',
      body: `
        <div class="alert alert-warning mb-3">
          <strong>Error encontrado:</strong> El nombre está mal escrito
        </div>
        <p>El email dice <strong>"Aerolineas Argentinas"</strong> sin tilde en "Aerolíneas". Los atacantes suelen descuidar estos detalles o copiar mal el nombre oficial.</p>
        <p class="mb-0"><strong>Consejo:</strong> Prestá atención a errores ortográficos, tildes faltantes o nombres levemente distintos al oficial. Son señales de que el mensaje no es legítimo.</p>
      `
    }
  };

  let encontrados = 0;
  const total = Object.keys(errores).length;

  // ── Clic en elemento del email ────────────────────────────
  $(document).on('click', '.error-item:not(.encontrado)', function () {
    const num = parseInt($(this).data('error'));
    const info = errores[num];
    if (!info) return;

    // Marcar como encontrado
    $(this).addClass('encontrado');
    encontrados++;

    // Marcar en la lista del panel
    $(`.error-check[data-error="${num}"]`).addClass('encontrado')
      .find('.error-icon i')
      .removeClass('fa-regular fa-circle')
      .addClass('fa-solid fa-circle-check');

    // Actualizar progreso
    const pct = Math.round((encontrados / total) * 100);
    $('#progresoBar').css('width', pct + '%').attr('aria-valuenow', pct);
    $('#progresoTexto').text(`${encontrados} de ${total} encontrados`);
    $('#contadorBadge').text(`${encontrados}/${total}`);

    // Mostrar modal con explicación
    $('#modalTituloTexto').text(info.titulo);
    $('#modalPhishingBody').html(info.body);
    const modal = new bootstrap.Modal(document.getElementById('modalPhishing'));
    modal.show();

    // Si encontró todos: celebración
    if (encontrados === total) {
      setTimeout(() => {
        $('#modalTituloTexto').text('🎉 ¡Encontraste todos los errores!');
        $('#modalPhishingBody').html(`
          <div class="text-center py-3">
            <div style="font-size:4rem">🛡️</div>
            <h4 class="mt-3">¡Excelente trabajo!</h4>
            <p>Identificaste los <strong>${total} errores</strong> del email de phishing. Con este conocimiento podés protegerte mejor en el mundo digital.</p>
            <div class="alert alert-success mt-3">
              Compartí este módulo con amigos y familia para que también aprendan a identificar intentos de phishing.
            </div>
          </div>
        `);
        const m2 = new bootstrap.Modal(document.getElementById('modalPhishing'));
        m2.show();
      }, 500);
    }
  });


  // ── Reiniciar simulación ──────────────────────────────────
  $('#btnReiniciar').on('click', function () {
    encontrados = 0;

    // Restaurar elementos del email
    $('.error-item').removeClass('encontrado');

    // Restaurar lista de errores
    $('.error-check').removeClass('encontrado')
      .find('.error-icon i')
      .removeClass('fa-solid fa-circle-check')
      .addClass('fa-regular fa-circle');

    // Restaurar progreso
    $('#progresoBar').css('width', '0%').attr('aria-valuenow', 0);
    $('#progresoTexto').text('0 de 5 encontrados');
    $('#contadorBadge').text('0/5').removeClass('bg-success').addClass('bg-secondary');
  });


  // ── Scroll Reveal ─────────────────────────────────────────
  function checkReveal() {
    $('.reveal').each(function () {
      const top = $(this).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > top + 60) {
        $(this).addClass('revealed');
      }
    });
  }
  $(window).on('scroll', checkReveal);
  checkReveal();

});