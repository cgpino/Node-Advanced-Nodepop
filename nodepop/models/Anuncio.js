'use strict';

const mongoose = require('mongoose');

// Esquema del anuncio
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Método estático del modelo
anuncioSchema.statics.listar = function(filtro, skip, limit, sort, fields, callback) {
    // Se obtiene la query pero no se ejecuta
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec(callback);
  };

// Se crea el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Se exporta el modelo
module.exports = Anuncio;
