var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var defaultHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10
  };

  if (req.method === 'GET' && req.url === '/') {
    var responseBody = {
      method: 'GET',
      url: req.url
    };
    defaultHeaders['Content-Type'] = 'text/html';

    fs.readFile(__dirname + '/public/index.html', function(err, data) {
      if (err) {
        res.end('Error: ', err);
      } else {
        responseBody.data = data.toString;
        res.writeHead(200, defaultHeaders);
        res.end(data.toString());
      }
    });
  }

  // res.end(archive.paths.list);
};

