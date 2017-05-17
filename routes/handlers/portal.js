 'use strict';
  
var modelPortal = require('../../model/modelPortal');
var mailTemplates = require('../../lib/mailtemplates');
var randomString = require('../../lib/common').generateRandomString;
var flag = require('../../config/config').flagUsed;
var configEmail=require('../../config/config').mailconfig;
var url =require('../../config/config').url;
var path = require('path');
var fs = require('fs');
 var crypto = require('crypto'),
    key = 'efghabcdijklmnop',
    iv = '0123456789654321',
    cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    , decipher = crypto.createDecipher('aes-128-cbc', key,iv);
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(3);
var config = {
    preserveLineBreaks: true,
    tesseract: {
        lang: "eng"    
    }
}
var root_url = require('url');
function fullUrl(req) {
  return root_url.format({
    protocol: req.protocol
  });
}

var otp = Math.floor(Math.random() * 900000) + 100000;
module.exports = {
  checkEmail:checkEmail,
  checkLogin:checkLogin,
  clientRegisteration:clientRegisteration,
  forgotPassword:forgotPassword,
  indexClient:indexClient,
  logout:logout,
  validateToken:validateToken,
  passwordReset:passwordReset
};
    function checkEmail(req,res,next){
        modelPortal.checkEmail(req.body.Email,function(err,result){
            if (err) {
                 next(err);
             } else { 
            res.json(result);
             }
        });
    }
    function passwordReset(req,res,next){
      var password=bcrypt.hashSync(req.body.password, salt);
        modelPortal.passwordReset(password,req.session.emailId,function(err,result){
            if (err) {
                 next(err);
             } else { 
                req.session.emailId=null;
                res.json({msg: 'success',result: result});
             }
        });      
    }    
    function validateToken(req,res,next){
          var token=req.query.token;
          if(token){
              modelPortal.validateToken(token,function(err,result){
                  if (err) {
                       next(err);
                   } 
                   if(result) { 
                      var obj={
                        email: result.email
                      }
                      req.session.emailId= result.email;
                      next();
                      //res.json({msg:'Success',result:obj});
                   } else {
                      res.json({msg:'Token not valid/expired',result:null});
                   }
              });           
          } else {
            res.json('Token not valid');
          }
    }    
    function checkLogin(req,res,next){
        var password=req.body.pass;
        _login(req,res,next,req.body.Email,password);

    }
    function _login(req,res,next,email,password){
        modelPortal.checkLogin(email,password,function(err,result){
            if (err) {
                 next(err);

             } else { 
                    if(result.result){
                      req.session.emailId=result.result.email;
                      req.session.name=result.result.name;
                      req.session.userId= result.result._id;
                    } 
                    res.json(result);
            }
        });      
    }
    function clientRegisteration(req,res,next){
            var body=req.body;
            var obj={
                  email: body.email,
                  password: bcrypt.hashSync(body.password, salt),
                  address1: body.address1,
                  address2: body.address2,
                  address3: body.address3,
                  state: body.state,
                  city: body.city,
                  pincode: body.pincode,
                  contactno: body.contactno,
                  name: body.name
            }
           modelPortal.clientRegisteration(obj,function(err,result){
            if (err) {
                 next(err);

             } else { 
              _login(req,res,next,obj.email,obj.password);
             }
        });
    }
    function forgotPassword(req,res,next){
     modelPortal.checkEmail(req.body.Email,function(err,result){
          if (err) {
               next(err);
           } else if(result.length){
                  var random = Math.random().toString().substring(5);
                  var token=crypto.createHash("sha1").update(random).digest('hex');
                  var obj = {
                    email: req.body.Email,
                    resettoken: token
                  }      
                  modelPortal.forgotPassword(obj,function(err,result){
                    if (err) {
                         next(err);
                    }
                    else {
                      res.json({value:1, msg: 'http://'+url.url+'/resetpassword?token='+token});
                    }
                  });                
                } else {
                   res.json({value:3});
                }
      });      

    }
    function indexClient(req, res,next) {
      next();
  }  
  function logout(req,res,next) {
      req.session.destroy( function (err) {
      req.page="success";
      res.json("success");
  });
}

