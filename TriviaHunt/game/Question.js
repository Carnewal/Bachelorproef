function Question(category, host, candidate) {
	var q = this.randomQuestion(category)
	this.category = q.category;
	this.question = q.question;
	this.correctAnswer = q.answer;
	this.votes = new Array();
	this.time = q.time;
	this.answerTimeLeft = 20;
	this.acceptTimeLeft = 10;

	this.host = host;
	this.candidate = candidate;
};

Question.prototype.randomQuestion = function(category) {  
	return {
		category: category, 
		question: 'How much?', 
		answer: 'Lots!', 
		time: -1
	}
}

Question.prototype.answer = function(answer) {
	this.givenAnswer = answer;
}

Question.prototype.vote = function(vote, socket) {
	this.votes[socket.id] = vote;
}

//http://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
Question.prototype.correctness = function() {
	var a = this.givenAnswer;
	var b = this.correctAnswer;

    var m = a.length, n = b.length,
        C = [], i, j;
    for (i = 0; i <= m; i++) C.push([0]);
    for (j = 0; j < n; j++) C[0].push(0);
    for (i = 0; i < m; i++)
        for (j = 0; j < n; j++)
            C[i+1][j+1] = a[i] === b[j] ? C[i][j]+1 : Math.max(C[i+1][j], C[i][j+1]);
    return (function bt(i, j) {
        if (i*j === 0) { return ""; }
        if (a[i-1] === b[j-1]) { return bt(i-1, j-1) + a[i-1]; }
        return (C[i][j-1] > C[i-1][j]) ? bt(i, j-1) : bt(i-1, j);
    }(m, n));

}


module.exports = Question;  