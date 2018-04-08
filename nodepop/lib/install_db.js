'use strict';

const conn = require('../lib/connectMongoose');

// Se cargan los modelos
var Usuario = require('../models/Usuario');
var Anuncio = require('../models/Anuncio');

// Se carga el json
const db = require('../models/anuncios.json');

conn.once('open', async () => {
  try {

    await initUsuarios();
    await initAnuncios();

    conn.close();

  }catch(err) {
    console.log('Hubo un error: ', err);
    process.exit(1);
  }
});

// Inicializa los usuarios
async function initUsuarios() {

  // Se eliminan los usuarios que hay
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.n} usuarios.`);

  // Se inserta el usuario en cuestión
  const inserted = await Usuario.insertMany([
    {
      name: 'user',
      email: 'user@example.com',
      password: await Usuario.hashPassword('1234')
    }
  ]);
  console.log(`Insertados ${inserted.length} usuarios.`);
}

// Inicializa los anuncios
async function initAnuncios() {

  // Se eliminan los anuncios que hay
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.n} anuncios.`);

  // Se insertan los anuncios en cuestión
  const inserted = await Anuncio.insertMany(db);
  console.log(`Insertados ${inserted.length} anuncios.`);
}
