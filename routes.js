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

routes.get('/:astronautID', function(req, res, next) {
  const astronautID = req.params.astronautID
  const i = list.findIndex(item => {
    return item.astronautID === astronautID
  })
  if (i == -1) {
    var err = new Error('Missing astronaut!');
    err.status = 404;
    next(err);
  } else {
    res.status = 200
    res.json(list[i])
  }
})

routes.get('/search/:astronautLastName', function(req, res, next) {
  var tempList = []

  const astronautLastName = req.params.astronautLastName
  for (let item of list) {
    if ((item.lastName.indexOf(astronautLastName) > -1))
      tempList.push(item)
  }
  res.status = 200
  res.json(tempList)

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

/*
  PUT
*/
routes.put('/:astronautID', function(req, res, next) {
  const astronautID = req.params.astronautID
  const i = list.findIndex(item => {
    return item.astronautID === astronautID
  })
  if (i == -1) {
    var err = new Error('Missing astronaut!');
    err.status = 404;
    next(err);
  } else {
    list[i] = req.body
    list[i].astronautID = astronautID
    res.json(list[i])
  }

})



module.exports = routes
