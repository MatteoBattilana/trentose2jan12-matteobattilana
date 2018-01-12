const express = require('express'),
  bodyParser = require('body-parser');
const routes = express.Router()


/*GET*/
routes.get('/', function(req, res) {
  //TODO: check if there is a filter, and filter
  res.json("test")
})

module.exports = routes
