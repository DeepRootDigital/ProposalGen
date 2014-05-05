/**
 * Module dependencies.
 */
 require('newrelic');
 var express = require('express');
 var routes = require('./routes');
 var proposal = require('./routes/proposal');
 var images = require('./routes/images');
 var http = require('http');
 var path = require('path');
 var fs = require('fs');
 var PDFDocument = require('pdfkit');

// Database

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/proposalgen", {native_parser:true});

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser({keepExtensions:true,uploadDir:__dirname+'/public/icons/tmp'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/* Define all the pages */

// Pre login
app.get('/', function(req, res) { res.render('frontpage.html'); });
app.get('/create', function(req, res) { res.render('create.html'); });

/* End Page Definitions */

/* Define RESTful actions */

// GET
app.get('/proposallist', proposal.list(db));

// POST
app.post('/genproposal', proposal.genproposal());
app.post('/addproposal', proposal.addproposal(db));
app.post('/dropzoneupload', images.dzUpload(db));


/* End RESTful actions */
var port = process.env.PORT || 8080;
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + port);
});

//
app.listen(port);