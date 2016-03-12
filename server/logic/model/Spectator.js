var Spectator = function(id, socket, room) { 
    
    var id = id,
		socket = socket;
        room = room;

    return {
        id: id,
		socket: socket,
        room:room
    }
	
};

Spectator.prototype.test = function(lol) {  
  if (this.status === "available") {
	  this.id = lol;
	  
    this.people.push(lol);
  }
};

exports.Spectator = Spectator;