module.exports = function(file, cb){

var fs = require('fs');
fs.readFile('logs/'+file, function(err, data) {
    if(err) return false;
    var array = data.toString().split("\n");
    cb(array);
});
};