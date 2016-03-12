var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index.js');
var routeController = require('./routes/controller');
var routeSpectator = require('./routes/spectator');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/control', routeController);
app.use('/spectate', routeSpectator);




var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(42069);


console.log("Listening on port 42069.");

var specs = []; 


var spectator = io
  .of('/spectator')
  .on('connection', function (socket) {	
  console.log("new spectator connection");
  specs.push(socket);
	
  });


var controller = io
  .of('/controller')
  .on('connection', function (socket) {


    socket.on('joinRoom', function (roomid, playerName, fn) {
	
      socket.playerName = playerName;
      console.log(playerName);
      console.log(roomid);
      console.log(socket.id);
      console.log("Controller " + socket.playerName + " joined room " + roomid);
      fn({
        message: 'Success',
        health: '100',
        weapon: 'Revolver',
        ammo: 'Unlimited'
      });
    });

    socket.on('move', function (moveData, fn) {


      var problemMoving = false;

      if (moveData.angle > 300) {
        problemMoving = true;
      }

	spectator.emit('movedata',moveData);
	  
	  
      moveData.player = socket.id;
      fn({
        message: 'Moved',
        problemMoving: problemMoving
      })
    });


  });

//Player update loop

setInterval(function () {

  var spectators = io.of('/spectator').sockets;


  for (var spec in spectators) {
    console.log(spec);
  }
  
  
  
  /*
  
  
    var specrooms = io.of('/spectator').adapter.rooms;
    var ctrlrooms = io.of('/controller').adapter.rooms;
    
    for(var room in specrooms) {
      console.log(room.)    
    }
    
    console.log("---------------")
      for(var room in ctrlrooms) {
      console.log(room)
      
    }
    console.log("////////////////////////////")
    /*
    var roomId = '5';
    var spectators = 0;
    var controllers = 0;
  
    
    console.log(io.nsps['/spectator'].adapter.rooms);
    
    var roomies = io.nsps['/spectator'].adapter.rooms[roomId];
    
    
    if (roomies) {
      
      for(var roomie in roomies) {
        console.log
        if (roomie.spectatingRoom) {
  
          spectator
		  s++;
        } else {
          controllers++;
        }
      }
        console.log("Specs: " + spectators + ", Controllers: " + controllers)
  
      
    }
  */


}, 1000);



module.exports = app;



/*app.get('/', function (req, res) {
  res.sendfile(__dirname + '/routes/index.html');
});

app.get('/control', function (req, res) {
  res.sendfile(__dirname + '/routes/controller.html');
});

app.get('/spectate', function (req, res) {
  res.sendfile(__dirname + '/routes/spectator.html');
});*/

/*io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
});

*/



/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
*/