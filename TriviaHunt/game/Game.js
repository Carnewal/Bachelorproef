var actions = require('../shared/Actions')

function Game(io) {
  this.rooms = new Array();
  this.io = io;
};

Game.prototype.handle = function(action, data, socket) {  

	var room = this.rooms[data.roomId];

	switch(action) {
		case actions.CREATE_ROOM: 
			room = new Room(this.io, socket);
			this.rooms.push(room.id);
			break;
		case actions.START_ROOM: 
			room.start(socket);
			break;
		case actions.JOIN_ROOM_PLAYER: 
			room.join(socket, false, data.playerName);
			break;
		case actions.JOIN_ROOM_SPECTATOR: 
			room.join(socket, true, 'spec' + socket.id);
			break;
		case actions.ANSWER_QUESTION: 
			room.answerQuestion(socket, data.given_answer);
			break;
		case actions.ACCEPT_ANSWER: 
			room.acceptAnswer(socket, data.accepted);
			break;

		case actions.
	}
}



module.exports = Game;  