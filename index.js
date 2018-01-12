const express = require('express'),
  bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const routes = require('./routes')

/*CHANGE WTIH BASE PATH*/
app.use('/astronauts', routes)

//UNCOMMENT FOR CROSS ORIGIN
/*
app.use(function(req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Content-Type', 'application/json');
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST, DELETE');
    return res.status(200).json({});
  }
  // make sure we go to the next routes
  next();
});
*/

// handle invalid requests and internal error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      code: err.status || 500,
      message: err.message
    }
  });
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
