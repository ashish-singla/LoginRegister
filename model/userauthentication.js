'use strict';

var mysql = require('../lib/mysql').executeQuery;

module.exports = {
	login: function(userid, password, callback) {
		var query = {
			sql: 'call usp_validUser(?,?)',
			values: [userid, password]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	}
}