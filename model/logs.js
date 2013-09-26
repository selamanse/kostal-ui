var fs = require('fs');

module.exports = {
  dir:  __dirname + "/../logs",
  list: function(callback){
    fs.readdir(this.dir, function(err, list) {
      if (list && !err) list.reverse();
      else list = [];
      callback(list);
    });
  },
  
  view: function(file, cb){

    fs.readFile(this.dir + '/' +file, function(err, data) {
      if(err) return false;
      var array = data.toString().split("\n");
      cb(array);
    });
  }
};