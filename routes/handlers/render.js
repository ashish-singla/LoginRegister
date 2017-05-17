	 'use strict'; 
module.exports = {  
	redirect: function(req, res, next) {
		var page = req.page;
		if(!page) {
			page = '1234abc';
		} 
		switch(page) {
			case 'success' :
				res.render('login');
				break;
			case 'clientRegisteration' :
				res.redirect('/');
				break;
			case 'indexClient' :
			    res.render('index',{session:req.session});
			    break;
			case 'resetPassword' :
			    res.render('resetPassword',{session:req.session});
			    break;			    
			default:
				next();
		}
	}
}

