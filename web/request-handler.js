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

  if (req.method === 'GET') {
    defaultHeaders['Content-Type'] = 'text/html';

    fs.readFile(__dirname + '/public/index.html', function(err, data) {
      if (err) {
        res.end('Error: ', err);
      } else {
        res.writeHead(200, defaultHeaders);
        res.end(data.toString());
      }
    });
  }

  if (req.method === 'POST') {
    var qString = '';
    req.on('data', function (chunk) {
      qString += chunk;
    }); 
    
    req.on('end', function () {
      qString = qString.slice(4);
      console.log('qs', qString);
      fs.readFile(__dirname + '/../archives/sites.txt', function (err, data) {
        if (err) {
          res.end('ERROR!!', err);
        } else {
          fileData = JSON.parse(data);
          console.log('fd', fileData);
          // IF WE ALREADY HAVE A CACHED VERSION
          if (fileData[qString]) {
            console.log('eval true');
            fs.readFile(__dirname + '/../archives/sites/' + qString + '.html', function (err, data) {
              if (err) {
                res.end(err);
              } else {
                defaultHeaders['Content-Type'] = 'text/html';
                res.writeHead(201, defaultHeaders);
                res.end(data.toString());
              }
            }); 
            // IF WE DO NOT HAVE CACHED VERSION
          } else {
            fs.readFile(__dirname + '/../archives/sites.txt', function (err, data) {
              if (err) {
                res.end(err);
              } else {
                console.log('qs= ', qString);
                //fileData[qString] = false;
                var realObject = JSON.parse(data);
                realObject[qString] = false;
                console.log(realObject);
                fs.writeFile(__dirname + '/../archives/sites.txt', JSON.stringify(realObject), function (err) {
                  if (err) {
                    res.end(err);
                  } else {
                    console.log('into redirect');
                    defaultHeaders['Content-Type'] = 'text/html';
                    res.writeHead(201, defaultHeaders); // change to redirect to loading.html
                    res.end();
                  }
                });
              }
            }); 
          }
        }
      });
    });
  }
};

