var intervalID;

$(document).ready(function(){    
    $("button").click(function(){		
		$("button").hide();
		$("#game").show();
		
		$("#time").html("<h4>Time Remaining: " + totalSeconds + "</h4>");		
		intervalID = setInterval(countDown, 1000);
		showQuestions();		
	});   
});

// total time for game
var totalSeconds = 55;

function countDown() {
	var $time = $("#time");
	
	totalSeconds--;				
	$time.html("<h4>Time Remaining: " + totalSeconds + "</h4>");	
	if (totalSeconds == 0){
		clearInterval(intervalID);
		$("#time").html("<h3>All Done!</h3>");
		$("#questions").hide();
		isCorrect();
		showGameResults();
	}
}

var url = "https://opentdb.com/api.php?amount=10&category=14&type=multiple";
var questions = []; // each object has: correct_answer incorrect_answers[3] question

$.ajax({
    url: url,
    method: 'GET'
})
.done(function(response) {	
	// restore results[10] in questions
	questions = response.results;		
});	

// iterate through questions and append each to #questions
function showQuestions(){	
	var wrong;
	var $quest = $("#questions");
	
	questions.forEach( function(value) {
		wrong = value.incorrect_answers;		
		$quest.append('<p><h3>' + value.question + '</h3>');

		var html = '<form action="">' +
			'<input type="radio" name="answers" value="right"> ' + value.correct_answer + ' ' +
			'<input type="radio" name="answers" value="wrong"> ' + wrong[0] + ' ' +
			'<input type="radio" name="answers" value="wrong">' + wrong[1] + ' ' +
			'<input type="radio" name="answers" value="wrong"> ' + wrong[2] +
			'</form></p>';

		$quest.append(html);
	});	
}

var trackCorrect = 0;
var trackWrong = 0;

function isCorrect(){		
	var value = $("form input[type=radio]:checked");

	for (var i = 0; i < value.length; i++){
		if (value[i].value == "right"){
			trackCorrect++;
		}
		else if (value[i].value == "wrong"){
			trackWrong++;
		}	
	}	

}

function showGameResults(){
  $("#time").append("<h4><br>Correct Answers: " + trackCorrect +
					"<br>Incorrect Answers: " + trackWrong +
					"<br>Unanswered: " + (questions.length - (trackCorrect + trackWrong)) + "</h4>"
  
  );  
}