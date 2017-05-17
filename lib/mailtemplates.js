'use strict';
var mailer = require('../lib/mailer');
var config = require('../config/config').url;
var url="http://"+config.url;
module.exports = {
 
forgotPassword: function(name,email, password, callback){ 
	   var subject = 'Request For password';
       var mailMessage ="Hi " +name+",<br/>Your LogIn details are<br/>Email-ID: <strong>"+email+"</strong><br/>Password: <strong>"+password+"</strong><br/><br/>Click <a href="+url+">here</a> to login<br/>";
       mailer.sendEmail('<testing>', email, subject, mailMessage, function(error, result) {      
       callback(error, result);
        });
	}
}