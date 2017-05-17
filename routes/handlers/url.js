'use strict';
 var config = require('../../config/config').modules;
module.exports = { 
	setpage: function(req, res, next) {
		if(req.session.emailId !== undefined && req.session.emailId) {alert();
			    res.redirect('/client');
		} else {
         	req.page = 'success';
		    next();
         }
   	},
	clientRegisteration:function(req, res, next) {
		req.page = 'clientRegisteration';
		next();
	},
	indexClient: function(req,res,next){
		req.page='indexClient';
		next();
	},
	resetPassword: function(req,res,next){
		req.page='resetPassword';
		next();
	},	
}
