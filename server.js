var express      = require('express');
var app          = express();
var path         = require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var config       = require('./config');
var port         = config.port;

//-------------------------setup the express application----------------------------\\

app.use(morgan("dev"));				//logs every request to console
app.use(cookieParser());			//use cookie - needed for auth
app.use(bodyParser.json() );		// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({		// to support URL-encoded bodies
	extended: true
}));

//-----------------------setup templating-------------------------\\

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//--------------------configure files-worker-----------------------\\
var filesWorker = require('./files-worker')(app, express);

//------------------------handle routes---------------------------\\

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/upload', function(req, res) {
  res.render('upload');
});

app.post('/upload', filesWorker.getMulter('uploader'), function(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.status(204).end();
});

app.get('/download', function(req, res) {
  var filesData = filesWorker.getFilesData();
  res.render('download', filesData);
});

//---------------------------------start server-------------------------------------\\

app.listen(port, function() {
	console.log("Server is running on port " + port);
});
