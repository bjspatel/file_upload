var fs = require('fs');
var path = require('path');
try {
  var filePath = '/views';
  filePath = __dirname + path.normalize(filePath);
  console.log(filePath);
  var stats = fs.lstatSync(filePath);
  if(stats.isDirectory()) {
    console.log('Its a dir');
  } else {
    console.log('Its not');
  }
} catch (err) {
  console.log(err);
}
