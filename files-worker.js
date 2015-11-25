var fs      = require('fs');
var path    = require('path');
var multer  = require('multer');
var config  = require('./config');

module.exports = function(app, express) {

  var filesDir = path.join(__dirname, path.normalize(config.fileStorageDir));
  if(!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
  }
  app.use(express.static(filesDir));

  this.getMulter = function(formName) {
    var storage = multer.diskStorage({
      destination: filesDir,
      filename: function(req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname));
      }
    });

    return multer({'storage': storage}).single(formName);
  };

  this.getFilesData = function() {
    var files = fs.readdirSync(filesDir);
    var fileLinks = [];
    for(var i=0; i<files.length; i++) {
      fileLinks[i] = path.join(__dirname, files[i]);
    }
    var filesData = {'files': files, 'fileLinks': fileLinks};
    return(filesData);
  };

  return this;
};
