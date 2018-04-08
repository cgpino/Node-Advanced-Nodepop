'use strict';

const cote = require('cote');
var jimp = require("jimp");

const responder = new cote.Responder({ name: 'image thumbnail responder' });

responder.on('imageThumbnail', (req, done) => {

   jimp.read(`${req.orig}${req.name}`).then(function (thumbnail) {
     return thumbnail.resize(100,100).write(`${req.dest}tn_${req.name}`);

   }).catch(function (err) {
     console.error(err);

   });
   done('realizado');
});
