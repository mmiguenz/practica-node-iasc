//
// Este es el servidor que recibe los pedidos clientes y los redirige al
// servicio de viajes.
//
var r = require('./request_wrapper.js');

var host = 'http://localhost';
var port = 3000;
var journey_port = 3002;

var address = make_url(host, port);

var journey_address = make_url(host, journey_port);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var get = require("./get");


// Rutas
function make_url(host, port) {
  return host + ':' + port;
}

app.route('/get_next_bus/').get(function (req, res, next) {
  get(journey_address + "/next_bus/", {
    line_id: req.query.line_id,
    stop_id: req.query.stop_id
  }, 2000).then(response => res.json(response.data)).catch(error => next(error))          
});

app.route('/line_status/').get(function (req, res, next) {
  get(journey_address + "/line_status/", {
    line_id: req.query.line_id
  }, 2000).then(response => res.json(response.data)).catch(error => next(error))
});

app.use(notFound);
app.use(errorHandler);

// Programa Principal

var server = app.listen(port, function () {
  console.log("Initializing node in port " + server.address().port + "....");
  var suffix = 'Empezando servidor en el puerto ' + server.address().port;
  console.log(suffix);
  return server;
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {   
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}