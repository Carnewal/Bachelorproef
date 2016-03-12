var Question = require('./Question')
var shortid = require('shortid');

var states = {
	WAITING_FOR_ANSWER = 'WAITING_FOR_PLAYERS',
	WAITING_FOR_ANSWER = 'WAITING_FOR_ANSWER',
	WAITING_FOR_VOTES = 'WAITING_FOR_VOTES',
	DECIDING_RULES = 'DECIDING_RULES',
}


function Room(io, ownerSocket) {  
	this.io = io;

	this.id = shortid.generate();
	this.idPlayer = this.id + '_play';
	this.idSpectator = this.id + '_spec';
	this.idGlobal = this.id + '_glob';

  	this.players = new Array();
  	this.spectators = new Array();
  	this.questions = new Array();

  	this.currentCandidate = 0;

  	this.minPlayers = 2;
  	this.maxPlayers = 8;

  	this.state = states.WAITING_FOR_PLAYERS;
};

Room.prototype.emitGlobal = function(msg, data) { this.io.to(this.idGlobal).emit(msg, data) };

Room.prototype.emitPlayers = function(msg, data) { this.io.to(this.idPlayer).emit(msg, data) };

Room.prototype.emitSpectators = function(msg, data) { this.io.to(this.idSpectator).emit(msg, data) };


Room.prototype.join = function(socket, isSpectator, name) {
	socket.name = name
	socket.isSpectator = isSpectator;
	socket.join(this.idGlobal);
	socket.join(isSpectator ? this.idSpectator : this.idPlayer)
	if(!isSpectator) {
		this.players.push({id: socket.id, name: name, socket: socket});
	}
}





Room.prototype.start = function(socket) {

	this.state = states.CREATING_NEW_QUESTION;

	setInterval(function() {

		sendState();

		switch(this.state) {

			case states.WAITING_FOR_ANSWER:
				this.questions[0].answerTimeLeft = this.questions[0].answerTimeLeft--;
				var timeLeft = this.questions[0].answerTimeLeft;
				if(timeLeft <== 0) {
					this.questionTimeOut();
				} else {
					this.sendQuestionUpdate();
				}
				break;
			case states.WAITING_FOR_ACCEPT:
				this.questions[0].acceptTimeLeft = this.questions[0].acceptTimeLeft--;
				var timeLeft = this.questions[0].acceptTimeLeft;
				if(timeLeft <== 0) {
					this.acceptAnswer(true)
				} 
				break;
			case states.CREATING_NEW_QUESTION: 
				this.newQuestion();
				this.sendQuestionUpdate();
				this.state = states.WAITING_FOR_ANSWER;
				break;

		}
	}, 1000)
}

Room.prototype.newQuestion = function() {

	var question = new Question(category);

	var numPlayers = this.players.length;
	this.currentCandidate = ( (numPlayers - 1) === currentCandidate ? 0 : currentCandidate + 1 )

	question.candidate = this.players[currentCandidate];

	var filtered = this.players.filter(
		function(socket) {
			return socket.id !== this.questions[0].candidate.id
		}
	)[Math.floor(Math.random() * filtered.length)];

	var randy = filtered[Math.floor(Math.random() * filtered.length)];

	question.host = randy;

	this.questions.unshift(question);

}


Room.prototype.sendState() {
	this.emitGlobal('state', this.state)
}

Room.prototype.sendQuestionUpdate() {
	var question = this.questions[0];
	question.candidate.emit('answer question', 
		{
			time_left: question.answerTimeLeft, 
		}
	)

	question.host.emit('ask question', 
		{
			time_left: question.answerTimeLeft,
			question: question.question,
			answer: question.correctAnswer
		}
	)
}

Room.prototype.sendAnswer() {
	var question = this.questions[0];

	this.emitSpectators('question answered', 
		{
			given_answer: question.givenAnswer, 
			correct_answer: question.correctAnswer, 
			correctness: question.correctness()
		}
	)
}

Room.prototype.answerQuestion = function(givenAnswer) {  
	var correctness = this.questions[0].answer(givenAnswer);
	this.state = states.WAITING_FOR_ACCEPT;
}

Room.prototype.acceptAnswer = function(accepted) { 
	this.questions[0].accepted = accepted;
	this.emitGlobal('answer accepted', 
		{
			accepted: accepted,	
		}
	);
	this.state = states.CREATING_NEW_QUESTION;
}



Room.prototype.questionTimeOut = function() { 
	this.emitGlobal('question timed out', {})
	this.state = states.CREATING_NEW_QUESTION;
}



module.exports = Room;  