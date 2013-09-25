var fs = require('fs');

module.exports = function(callback){
  fs.readdir('logs', function(err, list) {
    if (list && !err) list.reverse();
    else list = [];
    callback(list);
  });
};
