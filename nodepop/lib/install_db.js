'use strict';

var mongoose = require('mongoose')

// Se carga el modelo
var Anuncio = require('../models/Anuncio');

// Se carga el json
const db = require('../models/anuncios.json');

mongoose.connect('mongodb://localhost/nodepop').then( async (err, res) => {
    try {
        // Se elimina la base de datos (si existe) y se vuelve a generar
        await Anuncio.deleteMany().then(Anuncio.insertMany(db)).then((res) => {
            console.log('Base de datos creada con éxito');
            mongoose.connection.close();
        })
    } catch(err) {
        console.log("Error al crear la base de datos");
        return;
    }
});