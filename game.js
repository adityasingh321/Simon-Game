var gamePattern=[]
var buttonColors=["red", "blue", "green", "yellow"]
var userClickedPattern=[]
var started=false
var level=0

// Detecting Keypress
$(document).keydown(function(){
    if(!started){
    nextSequence()
    started=true
    }
})

// Detecting User's Click
$(".btn").on("click",function(){

    // Saving the ID of Buttons
    var userChosenColour=$(this).attr("id")

    // Pushing the Event to userClickedPattern 
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer((userClickedPattern.length)-1)
})


// Generates Next Random Sequence
function nextSequence(){
    userClickedPattern=[]
    level++
    $('#level-title').text("Level "+level)
    
    // Generates Random Number Between 1 to 3 
    var randomNumber=Math.floor(Math.random()*4)    
    var randomChosenColour=buttonColors[randomNumber]
    
    // Pushing Randomly Generated Color to gamePattern to Create a Pattern
    gamePattern.push(randomChosenColour)
    
    // Adds Flash Animation to Buttons Generated Randomly by Theirs ID
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
}

// Checks User's Pattern is Correct or Not
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(nextSequence,1000)
        }
    }
    else{
        playSound("wrong")
        
        // Game-over Animation
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        
        // Resets Heading Text
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
    
}

// Add Sounds to Button Clicks
function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3')
    audio.play()
    
}

// Generating Animations to Buttons
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100)
}

// Resets Variables to Restart the Game
function startOver(){
    level=0
    gamePattern=[]
    started=false
}

