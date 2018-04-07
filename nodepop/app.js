var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const jwtAuth = require('./lib/jwtAuth');

const loginController = require('./routes/loginController');

// Se conecta la base de datos
const conn = require('./lib/connectMongoose');

// Se cargan los modelos para que mongoose los conozca
require('./models/Anuncio');
require('./models/Usuario');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.locals.title = 'Nodepop';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares de control de sesiones
app.use(session({
  name: 'nodepop-session',
  secret: 'ashduahfuajdusabfsbhgbhjasfabdgasdubfdbfuansd',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true }, // Dos días de inactividad
  store: new MongoStore({
    // Cómo conectarse a mi base de datos
    url: 'mongodb://localhost/cursonode' // fix issue https://github.com/jdesboeufs/connect-mongo/issues/277
    //mongooseConnection: conn
  })
}));

/**
 * Middlewares de la API
 */
app.use('/apiv1/anuncios', jwtAuth(), require('./routes/apiv1/anuncios'));
app.use('/apiv1/authenticate', loginController.postLoginJWT);

/**
 * Middlewares de la aplicación web
 */
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  // Si es una petición de API, se responde con JSON
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }

  /*if (!req.session.authUser) {
    res.json({ success: false, error: err.message })
  }*/

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

// Comprueba la petición corresponde a una API
function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
