'use strict';

var express = require('express');
var router = express.Router();

const cote = require('cote');
const requester = new cote.Requester({ name: 'images thumbnail requester' });

const sessionAuth = require('../lib/sessionAuth');

// Se carga el modelo
const Anuncio = require('../models/Anuncio');

const multer = require('multer');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'public/images/anuncios/');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

// GET
router.get('/', sessionAuth(), (req, res) => {

    // ¿Está autenticado el usuario o no?
    if (req.session.authUser)
      res.locals.authenticated = true;
    else
      res.locals.authenticated = false;

    res.render('addAd');
});

// POST
router.post('/', upload.single('photo_file'), (req, res, next) => {

    // Se cogen los datos del formulario
    const file = req.body;

    // Se coge el archivo y los tags
    file.foto = req.file.filename;
    file.tags = req.body.tags.split(',');

    // Se crea un nuevo anuncio con los datos indicados
    const anuncio = new Anuncio(file);

    // Se guarda
    anuncio.save((err) => {
        if(err) {
            next(err);
            return;
        }
        // Se redirige a anuncios
        res.redirect('/anuncios');
    });

    // Se llama al servicio de thumbnail
    requester.send({
       type: 'imageThumbnail',
       name: file.foto,
       orig: 'public/images/anuncios/',
       dest: 'public/images/anuncios/thumbnails/'
   }, res => {
       console.log(`thumbnail ${res}`);
   });

});

module.exports = router;
