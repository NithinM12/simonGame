var buttonColors=["red","blue","yellow","green"]

var gamePattern=[];

var userClickedPattern=[];

var started = false;
var level = 0;


$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("failed!!!");

        playSound("wrong");
        $("body").addClass(".game-over");

        setTimeout(function(){
            $("body").removeClass(".game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any key to start");

        startOver();
    }

}



function nextSequence(){

    userClickedPattern=[];
    level++;

    $("#level-title").text("Level "+ level);
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChoosenColor);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function playSound(name){
    var audio =new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" +currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" +currentColor).removeClass("pressed");
    },100);
}
