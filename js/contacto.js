$(document).ready(function () {

  // ── 1. VALIDACIÓN EN TIEMPO REAL con .on('input') ─────────
  $('#nombre').on('input', function () {
    const val = $(this).val().trim();
    if (val.length === 0)   setEstado(this, '', '');
    else if (val.length < 3) setEstado(this, 'error', 'Mínimo 3 caracteres');
    else                     setEstado(this, 'ok', '✓ Correcto');
  });

  $('#email').on('input', function () {
    const val   = $(this).val().trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val.length === 0)  setEstado(this, '', '');
    else if (!regex.test(val)) setEstado(this, 'error', 'Email inválido');
    else                   setEstado(this, 'ok', '✓ Email válido');
  });

  $('#telefono').on('input', function () {
    const val   = $(this).val().trim();
    const regex = /^[\+\d\s\-]{7,15}$/;
    if (val.length === 0)   setEstado(this, '', '');
    else if (!regex.test(val)) setEstado(this, 'error', 'Formato inválido');
    else                    setEstado(this, 'ok', '✓ Válido');
  });

  $('#mensaje').on('input', function () {
    const val = $(this).val().trim();
    if (val.length === 0)    setEstado(this, '', '');
    else if (val.length < 10) setEstado(this, 'error', `Faltan ${10 - val.length} caracteres`);
    else                     setEstado(this, 'ok', '✓ Listo');
  });

  $('#asunto').on('change', function () {
    if ($(this).val()) setEstado(this, 'ok', '✓ Seleccionado');
    else               setEstado(this, '', '');
  });

  function setEstado(campo, tipo, msg) {
    const $campo = $(campo);
    const $fb    = $campo.next('.campo-fb');
    $campo.removeClass('campo-ok campo-error');
    $fb.removeClass('fb-ok fb-error').text('');
    if (tipo === 'ok')    { $campo.addClass('campo-ok');    $fb.addClass('fb-ok').text(msg); }
    if (tipo === 'error') { $campo.addClass('campo-error'); $fb.addClass('fb-error').text(msg); }
  }

  function sanitizar(str) { return $('<div>').text(str).html(); }

  // ── 2. ENVÍO + SPINNER + MODAL ────────────────────────────
  $('#contactoForm').on('submit', function (e) {
    e.preventDefault();
    const nombre  = $('#nombre').val().trim();
    const email   = $('#email').val().trim();
    const asunto  = $('#asunto').val();
    const mensaje = $('#mensaje').val().trim();
    const terminos = $('#terminos').is(':checked');
    const emailOk  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (nombre.length < 3)  { setEstado('#nombre',  'error', 'Mínimo 3 caracteres'); return; }
    if (!emailOk)            { setEstado('#email',   'error', 'Email inválido');       return; }
    if (!asunto)             { setEstado('#asunto',  'error', 'Seleccioná un asunto'); return; }
    if (mensaje.length < 10) { setEstado('#mensaje', 'error', 'Mínimo 10 caracteres'); return; }
    if (!terminos)           { alert('Debés aceptar los términos.'); return; }

    console.log('Enviando:', { nombre: sanitizar(nombre), email: sanitizar(email) });

    $('#formSpinner').removeClass('d-none');
    $('#btnText').text('Enviando...');
    $('#submitBtn').prop('disabled', true);

    setTimeout(function () {
      $('#formSpinner').addClass('d-none');
      $('#btnText').html('<i class="fa-solid fa-paper-plane me-2"></i>Enviar mensaje');
      $('#submitBtn').prop('disabled', false);
      const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
      modal.show();
      document.getElementById('contactoForm').reset();
      $('.campo-fb').text('').removeClass('fb-ok fb-error');
      $('.form-input').removeClass('campo-ok campo-error');
    }, 2000);
  });
});