/**
 * Module dependencies.
 */
 var mongoose = require("mongoose");
 var http = require('http');
 var fs = require('fs');
 var passport = require('passport');
 var mongodbURI = 'mongodb://bms:freelancevps123@dbh26.mongolab.com:27267/bms-propgen';
 var facebookAppId = '221554208054736',
     facebookAppSecret = '06365c16156c0f1fa566efb2b8a91767';
 var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
 var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
 var S3_BUCKET = process.env.S3_BUCKET;

mongoose.connect(mongodbURI);

require('./model/account.js');
require('./model/proposal.js');
require('./model/proposalpage.js');

require('./config/passport')(passport, facebookAppId, facebookAppSecret);

var app = require('./config/express')(passport, mongodbURI);

require('./config/routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

exports = module.exports = app;