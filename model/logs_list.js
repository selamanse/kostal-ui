var fs = require('fs');

module.exports = function(callback){
  fs.readdir('logs', function(err, list) {
    callback(list.reverse());
  });
};
