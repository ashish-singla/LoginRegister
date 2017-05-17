'use strict'; 
   
var auth = require('./handlers/authentication');
var portal = require('./handlers/portal');
var render = require('./handlers/render');
var url = require('./handlers/url');
var fs = require('fs'); 
var path = require('path');
var multer  = require('multer');
var upload = multer({ dest: 'public/attach' });
var bodyParser=require('body-parser');
//var busboy=require('busboy');
 
module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser({
	 keepExtensions:true,
	 uploadDir: '../public/attach'
  }));
  app.get('/', url.setpage,render.redirect);
  app.get('/resetpassword',url.resetPassword,portal.validateToken,render.redirect);
  app.post('/passwordReset',portal.passwordReset);  
  app.post('/checkEmail',portal.checkEmail);
  app.post('/checkLogin',portal.checkLogin);
  app.post('/forgotPassword',portal.forgotPassword);
  app.post('/clientRegisteration',portal.clientRegisteration);
  app.all('*', auth.checkauterization, render.redirect);
  app.get('/client',url.indexClient,portal.indexClient,render.redirect);
  app.post('/logout',portal.logout);
}
