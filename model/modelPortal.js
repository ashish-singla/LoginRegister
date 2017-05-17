  'use strict';
  
var mysql = require('../lib/mysql').executeQuery;
var mongo = require('../lib/mongo');
var randomString = require('../lib/common').generateRandomString;
 var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(3);
 
module.exports = { 
      
    checkEmail: function(email,callback) {
        mongo.collection('users').find({email: email})
        .toArray(function(err, items) {
          callback(err, items);
        });
    },
    checkLogin: function(email,pass,callback) {
        mongo.collection('users').find({email: email})
        .next(function(err, item) {
          var obj=null;
          if(err)
            throw new Error('login lnformation not valid');
          else if(item) {
            bcrypt.compare(pass, item.password, function(err, res) {
              if(err)
                throw new Error('login lnformation not valid');
                obj= res == true ? {msg: "success", result: item} : {msg: "success", result: null};
                callback(err, obj);
            });
          } else {
                obj={msg: "success", result: null};
                callback(err, obj);
          };
        });  
    },
    clientRegisteration:function (data,callback) {
        mongo.collection('users').insertOne(data, 
          function(err, items) {
          if(err)
            throw new Error('login lnformation not valid');
          var obj={msg: "success"};
          callback(err, obj);
        }); 
    },
    forgotPassword:function (data,callback) {
        mongo.collection('users')
        .update({
          email: data.email},
          {$set: {resettoken: data.resettoken}}
          )
        .then(function(data){
          callback(null,data);
        })
        .catch(function(err){
          throw new Error('valid email-id');
        })
    },
    passwordReset:function (password,email,callback) {
        mongo.collection('users')
        .update({
          email: email},
          {$set: {resettoken: null,password: password}}
          )
        .then(function(data){
          callback(null,data);
        })
        .catch(function(err){
          throw new Error('Try again');
        })
    },    
    validateToken: function(token,callback) {
        mongo.collection('users').find({resettoken: token})
        .next(function(err, items) {
          callback(err, items);
        });
    }
}