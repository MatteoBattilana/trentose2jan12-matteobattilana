const express = require('express'),
  bodyParser = require('body-parser');
var uuid = require('uuid-v4');
const routes = express.Router()
const list = []
var id = 0


/*
  GET
  Return astronauts
*/
routes.get('/', function(req, res) {
  //TODO: check if there is a filter, and filter
  res.json(list)
})

/*
  POST
  add astronaut
*/
routes.post('/', function(req, res, next) {
  const newAstronaut = req.body
  newAstronaut.astronautID = uuid()
  list.push(newAstronaut)
  res.json(newAstronaut)
})

module.exports = routes
