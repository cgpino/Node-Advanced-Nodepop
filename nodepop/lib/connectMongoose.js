'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

// Se comprueban errores
conn.on('error', err => {
  console.log('Error de conexión', err);
  process.exit(1);
});

// Se comrueba si la conexión se ha dado con éxito
conn.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost/nodepop');
