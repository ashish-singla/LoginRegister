'use strict';

var http = require('http');
var https = require('https');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var favicon = require('serve-favicon');
var util = require('util');
var app = express();
var router = express.Router();
var mongo = require('./lib/mongo');
var mongoUrl = require('./config/config').mongoConfig.url;
 
app.set('port', process.env.PORT || 8283);
 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(favicon( path.join(__dirname, '/public/images/favicon.ico')));
app.use(bodyParser.json({limit: '15mb'}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('1a2b3c4d5e6f'));
app.use(session({secret: 'a234l7678s746kmdtjyjuyfjt2tyj4fhn5fgh24k7lu6jj4j75k2j56lkh24lk4j2l'}));
app.use(express.static(path.join(__dirname, 'public')));
var env = process.env.NODE_ENV = (process.env.NODE_ENV || 'development');

if (env.toLowerCase() === 'production') {
  logger.token('istDate', function () {
    return new Date();
  });
  app.use(logger({ format: ':istDate :method :url :status :res[Content-Length] :response-time ms' }));
  app.use(router);
  app.use(function(req, res) {
    return res.send(404);
  });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });
}

if (env.toLowerCase() === 'development') {
  app.use(logger('dev'));
  app.use(router);
  app.use(function(req, res) {
    return res.sendStatus(404);
  });
  app.use(errorHandler());
}

require('./routes')(router);

var server=http.createServer(app)
  .on('error', function(err) {
    util.log(util.inspect(err));
    process.exit(1);
  })
  .listen(app.get('port'), function() {
    util.log('Server listening on port ' + app.get('port') + ' in ' + app.get('env'));
  });
  server.timeout=360000;

mongo.connect(mongoUrl, function(){
  console.log('Connected to mongo at: ' + mongoUrl);;  
})