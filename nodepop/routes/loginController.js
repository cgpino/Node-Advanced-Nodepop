'use strict';

const Usuario = require('../models/Usuario');

class LoginController {

  // GET
  index(req, res, next) {
    res.locals.email = '';
    res.locals.error = '';
    res.render('login');
  }

  // POST
  async post(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);

    const user = await Usuario.findOne({ email: email, password: password });

    // Se le devuelve el email si ha fallado
    res.locals.email = email;

    // Variable para devolver un error
    res.locals.error = '';

    res.render('login');
  }

}

module.exports = new LoginController();
