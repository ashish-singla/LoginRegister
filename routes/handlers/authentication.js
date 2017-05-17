 'use strict';

 var userauth = require('../../model/userauthentication');
 var configEmail=require('../../config/config').mailconfig;
 var crypto = require('crypto'),
    key = 'efghabcdijklmnop',
    iv = '0123456789654321',
    cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
var idarr = [];
var loggedinarr = [];
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(3);
 module.exports = {
     checkauterization: function(req, res, next) {
         // console.log("this is ",req.session);
         // console.log("this is ",req.session.userId);
         if (req.session.userId) {
             next();
         } else {
            //console.log("this is hell ",req.url);
             req.page = 'success';
             req.session.url = req.url;
             next();
         }
     }
 }