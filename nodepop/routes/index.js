'use strict';

var express = require('express');
var router = express.Router();

// Se carga el modelo
const Anuncio = require('../models/Anuncio');

// Se cargan las librerías de validaciones
const { query, validationResult } = require('express-validator/check');

// Página de inicio con las opciones e instrucciones
router.get('/', function(req, res, next) {
    // Se renderiza
    res.render('index', { title: 'Nodepop' });
});

// Listado de anuncios HTML
router.get('/anuncios', async (req, res, next) => {
  
  // Con async/await
  try {

    // Se recogen los parámetros de entrada
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const fields = req.query.fields;

    // Filtro vacío inicial
    const filtro = {};

    // Filtrar por nombre
    if (typeof nombre !== 'undefined') {
      // Se añade el nombre (por el que empiece) al filtro
      filtro.nombre = new RegExp('^' + nombre, "i");
    }

    // Filtrar por tipo de anuncio (true -> venta / false -> búsqueda)
    if (typeof venta !== 'undefined') {
      // Se añade el tipo de anuncio al filtro
      filtro.venta = venta;
    }

    // Filtrar por precio
    if (typeof precio !== 'undefined') {
      // Se filtra por precio
      filtro.precio = filtrarPrecio(precio);
    }

    // Filtrar por tags
    if (typeof tags !== 'undefined') {
      // Se introduce dentro de un vector el tag buscado
      filtro.tags = [tags];

      // Se comprueba si el tag está dentro de los tags de la base de datos
      filtro.tags = {$in: filtro.tags};
  }

    // La función debe ser asíncrona si se usa await
    const docs = await Anuncio.listar(filtro, skip, limit, sort, fields);

    // Se le pasan los resultados a la vista
    res.locals.anuncios = docs;

    // Se renderiza
    res.render('anuncios', { title: 'Nodepop' });

  } catch(err) {
    next(err);
    return;
  }  
});

// Función para filtrar por precio
function filtrarPrecio(precio) {

  // Rango entre x-y ( > x && < y )
  if (/^[0-9]+\-[0-9]+$/.test(precio)) {
    return {'$gte': parseInt(precio.split('-')[0]), '$lte': parseInt(precio.split('-')[1])};
  }

  // Rango entre x- ( > x )
  if (/^[0-9]+\-$/.test(precio)) {
    return {'$gte': parseInt(precio.match(/[0-9]+/))};
  }

  // Rango entre -y ( < y )
  if (/^-[0-9]+$/.test(precio)) {
      return {'$lte': parseInt(precio.match(/[0-9]+/))};
  }

  return parseInt(precio);
}

module.exports = router;