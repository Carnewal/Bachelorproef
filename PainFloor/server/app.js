import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import http from 'http'
import socketio from 'socket.io'

import routeController from './routes/controller'
import routeSpectator from './routes/spectator'
import ioSpectator from './io/spectator'
import ioController from './io/controller'

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/control', routeController);
app.use('/spectate', routeSpectator);

const server = http.Server(app);
const io = socketio(server);
server.listen(6969);

ioSpectator(io.of('/spectator'))
ioController(io.of('/controller'))


/*

const spectator = io
  .of('/spectator')
  .on('connection', function (socket) {	
  console.log("new spectator connection");
  specs.push(socket);
	
  });


const controller = io
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

*/

export default app;
