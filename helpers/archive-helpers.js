var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
};
// read through
// grab all with value false
// store into its own object

exports.isUrlInList = function() {
};
// not needed

exports.addUrlToList = function() {

};
// Just need to flip each switch from false to true in the file

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
  fs.readFile(__dirname + '/../archives/sites.txt', function (err, data) {
    var list = JSON.parse(data);
    for (var key in list) {
      if (list[key] === false) {
        var options = {
          host: key,
          port: 80,
          path: '/index.html'
        };
        var content = '';
        http.get(options, function(res, data) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            content += chunk;
          });
          res.on('end', function () {
            console.log(content);
            fs.writeFile(__dirname + '/../archives/sites/' + options.host + '.html', content, function () {
              fs.readFile(__dirname + '/../archives/sites.txt', function (err, data) {
                if (err) {
                  res.end(err);
                } else {
                  var realObject = JSON.parse(data);
                  realObject[key] = true;
                  console.log(realObject);
                  fs.writeFile(__dirname + '/../archives/sites.txt', JSON.stringify(realObject), function (err) {
                    if (err) {
                      res.end(err);
                    }
                  });
                }
              }); 
            });
          });
        });
      }
    }
  });
};








