
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes.js')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , kostal = require('kostal');

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('fgsdg gret set34tqewr rt'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}


var auth = express.basicAuth(function(user, pass, callback) {
 var result = (user === 'test' && pass === 'test');
 callback(null /* error */, result);
});


app.get('/', routes.index);
//app.get('/logs/:file', routes.view);
app.get('/login', auth, function(req, res){  //if we have the password
  req.session.loggedIn = "yes";
  res.redirect('/');
});




server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {
  //socket.emit('data', { hello: 'world' });
  socket.on('status', function (data) { //is not secure!!! there just wont be a button to click on
    console.log(data);
    switch(data) {
      case 'start':
        kostal.start({
	  url: 'http://pvserver:ss@95.143.227.183:8081/',
	  interval: 20,
          onData: function(live){
            if (!live.split(';')[5]) kostal.stop(); //Stop polling at night, when there is no P anymore
            else io.sockets.emit('live', live);
          }
        });
        socket.emit('data',{
            'filename': kostal.filename(),
            'lines': []
          });
        break;
      case 'stop':
        kostal.stop();
      default:
        require('./model/logs_view.js')(data,function(lines){
          socket.emit('data',{
            'filename': data,
            'lines': lines
          });
        });
    }
  });
});



