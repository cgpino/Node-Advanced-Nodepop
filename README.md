# Node-Advanced-Nodepop
Práctica del curso de Node avanzado de Keepcoding

## Requisitos
* NodeJS
* MongoDB
* PM2 (se puede instalar con `npm install pm2 -g`)

## ¿Cómo se usa?
* Clonar o descargar este repositorio.
* Abrir una terminal dentro de la carpeta `nodepop` en el directorio raíz.
* Ejecutar el comando `npm install` para instalar todas las dependencias del proyecto.
* Arrancar un servidor local con MongoDB con una base de datos vacía. Ejemplo en Windows: `mongod.exe --dbpath C:\Users\cgpino\Documents\data\db --directoryperdb`.
* Ejecutar el comando `npm run install_db` para generar la base de datos MongoDB a través del archivo *json*.
* Ejecutar el comando `pm2 start lib\thumbnail.js` para arrancar en segundo plano el servicio de thumbnail que usará el proyecto.
* Arrancar el servidor del servicio de API usando el comando `npm start`.
* Abrir un navegador con la dirección `http://localhost:3000` y seguir las intrucciones indicadas.
