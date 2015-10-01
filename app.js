/**
 * Module dependencies.
 */
 var mongoose = require("mongoose");
 var http = require('http');
 var fs = require('fs');
 var mongodbURI = "mongodb://localhost:27017/proposal";

mongoose.connect(mongodbURI);

require('./model/phases.js');
require('./model/proposal.js');

var app = require('./config/express')();

require('./config/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

exports = module.exports = app;