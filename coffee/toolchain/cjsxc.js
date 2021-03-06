var fs     = require('fs');
var mkdirp = require('mkdirp');
var path   = require('path');

var compileCJSX   = require('coffee-react-transform');
var compileCoffee = require('coffee-script').compile;


var outDir = process.argv[2];
mkdirp(outDir, function(err) {
  if(err) {
    console.error(err);
    process.exit(1);
  }

  for(var i=3; i < process.argv.length; i++) {
    var files   = process.argv[i].split('=');
    var srcFile = files[0];
    var dstFile = files[1];

    var coffeeSrc = compileCJSX(fs.readFileSync(srcFile, 'utf8'));
    var jsSrc     = compileCoffee(coffeeSrc);

    fs.writeFileSync(dstFile, jsSrc, '');
  }
});
