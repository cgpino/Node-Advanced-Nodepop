'use strict';

const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {

  // Recuperar idioma que me piden
  const locale = req.params.locale;

  // Guadar la página a la que volver
  const referer = req.get('referer');

  // Establecer una cookie de idioma
  res.cookie('nodepop-lang', locale, { maxAge: 900000 });

  // Redirigir a la página donde estaba
  res.redirect(referer);
});

module.exports = router;
