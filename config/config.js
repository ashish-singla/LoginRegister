'use strict';

   
module.exports = {
	mongoConfig: {
		url: 'mongodb://localhost:27017/test',
		port: 27017
	},

	flagUsed:{
		sqlError:-1,
		inserted:0,// When created successfully.
		updated :1,// When updated successsfully.
		alreadyExist:2,// When duplicate entry.
		mailFailed:3,// When mail sending failed.	
		notExist:4 // not exist entry
	},
	url:
	{
		url:'localhost:8283'
	}
	
}
