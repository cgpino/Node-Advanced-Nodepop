'use strict';

var mongoose = require('mongoose')

// Se cargan los modelos
var Anuncio = require('../models/Anuncio');
var Usuario = require('../models/Usuario');

// Se carga el json
const db = require('../models/anuncios.json');

mongoose.connect('mongodb://localhost/nodepop').then( async (err, res) => {
    try {
        // Se elimina la base de datos (si existe) y se vuelve a generar
        await Anuncio.deleteMany().then(Anuncio.insertMany(db)).then((res) => {
            console.log('Anuncios cargados con éxito en la base de datos');
            mongoose.connection.close();
        })

        /*await Usuario.deleteMany().then(Usuario.insertMany([
          {
            name: 'admin',
            email: 'admin@example.com',
            password: '1234'
          }
        ])).then((res) => {
          console.log('Usuarios cargados con éxito en la base de datos');
        });*/

        //mongoose.connection.close();

    } catch(err) {
        console.log("Error al crear la base de datos");
        return;
    }
});
