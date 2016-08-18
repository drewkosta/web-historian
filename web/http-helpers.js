var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/JSON'
};

// I added the req parameter
exports.serveAssets = function(req, res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  // var responseBody = {
  //   method: 'GET',
  //   //url: req.url
  // };

  // fs.readFile(asset, function(err, data) {
  //   if (err) {
  //     console.log('fs error: ', err);
  //     callback(err);
  //   } else {
  //     console.log(data);
  //     callback(null, data);
  //   }
  // });
};



// As you progress, keep thinking about what helper functions you can put here!
