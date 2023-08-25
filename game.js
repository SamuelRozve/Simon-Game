
var userClickedPattern=[];
var gamePattern= [];
var buttonColors = ["red", "blue", "green", "yellow"]
var game=false;
var level = 0;

// keypress event
$(document).keypress(function () {
if (!game) {
    $("#level-title").text("Level 0");
        nextSequence();
        game=true;
    }});

// Click event
    $(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1); 
})


//nextSequence function

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level" + level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(150).fadeOut(150).fadeIn(150);
    playSound(randomChosenColor);
    }

    
//playSound function
function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
};


//animatePress function
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
// setTime for Animation
setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
}, 100)
};

//Check Answer
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        } 
    } else{
        console.log("Wrong!");
        var wrongAudio= new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 10);
        $("#level - title").text("Game Over, Press Any Key to Restart!");
        startOver();
    }
}

//Start Over
function startOver(){
    level=0;
    gamePattern=[];
    game=false;
}