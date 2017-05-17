'use strict';
var mysql = require('../lib/mysql').executeQuery;
var nodemailer = require('nodemailer');
module.exports = {

    sendEmail: function(sender, receiver, mailsubject, mailmessage, callback) {
        if (!sender && !receiver) {
            var error = new Error('Sender and Receiver field can not left blank');
            return callback(error, null);
        }


        var service = "",
            user = "",
            password = "",
            port = "";
        var query = {
            sql: 'Select * from t_mailConfig'
        };
        mysql(query, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                service = result[0].service;
                user = result[0].username;
                password = result[0].password;
                port = result[0].port;


                var transporter = nodemailer.createTransport({
                    service: service,
                    auth: {
                        user: user,
                        pass: password
                    },
                    secureconnection: false
                });
                var mailOptions = {
                    from: sender,
                    to: receiver,
                    subject: mailsubject,
                    html: mailmessage,
                }
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        callback(error, null);
                    } else {
                        callback(null, 'success');
                    }
                });


            }
        });

    }

}