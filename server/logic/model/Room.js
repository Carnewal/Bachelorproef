var shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

function Room(roomId, sock) { 
  this.creator = sock;  
  this.id = roomId;
  this.spectators = [];
  this.players = [];
  this.status = 'Playing';
};

Room.prototype.setup = function() {
    this.creator.join(roomId);
    this.spectators.push(creator);
}

Room.prototype.addPlayer = function(player) { 
    this.players.push(player);
};

Room.prototype.addSpectator = function(spectator) { 
    this.spectators.push(spectator);
};

Room.prototype.create = function() {
  
  
}

module.exports = Room;  