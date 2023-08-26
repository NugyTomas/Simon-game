var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {                //prijimani z klavesnice
    if (started === false) {                      //porovnani, jestli uz bylo tlacitko zmacknuto
        $("#level-title").text("Level 0");        //prepsani H1 na level 0
        nextSequence();                           //volani dalsi sekvence
        started = true;                           //zmena started na true, takze uz nejde zapnout klavesnici
    }
})

function nextSequence() {
    userClickedPattern = [];                       //vycisti Array userClickedPattern
    level++;                                      //prida levelu o jeden stupen vetsi hodnotu

    $("#level-title").text("Level " + level);              //Zmena nadpisu level zavislou na hodnote variable level

    var randomNumber = Math.floor(Math.random() * 4);            //vygenerovani nahodneho cisla mezi 0 az 3
    var randomChosenColour = buttonColours[randomNumber];         //vybrani nahodne barvy, pomoci nahodne vygenerovaneho cisla a array barev
    gamePattern.push(randomChosenColour);                        //vlozeni nahodne vybrane barvy na konec array gamePatter

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);        //animace probliknuti

    playSound(randomChosenColour);                              //prehrani zvuku nahodne vybrane barvy

}

$(".btn").click(function () {                                   //eventlistener na klik z mysi
    var userChosenColour = $(this).attr("id");                  //ulozeni id tlacitka, ktere uzivatel zmackl
    userClickedPattern.push(userChosenColour);                  //pridani tlacitka na konec array userClickedPattern
    playSound(userChosenColour);                                //prehrani zvuku, na ktere uzivatel klikl
    animatePress(userChosenColour);                             //animace probliknuti tlacitka, ktere bylo zmacknuto
    checkAnswer(userClickedPattern.length - 1);                 //porovnani, zda bylo zmacknuto spravne tlacitko vzhledem ke hre
})


function playSound(name) {                                         //funkce na prehrani zvuku
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {                            //funkce na animaci
    $("#" + currentColour).addClass("pressed");                    //pridani classy pressed zmacknutemu tlacitku
    setTimeout(function () {                                       //fce na odebrani classy po zmacknuti tlacitka
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {                                                //funkce na porovnani spravne odpovedi
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {           //pokud se tyhle dve array odpovedi rovnaji, jed dal

        if (gamePattern.length === userClickedPattern.length) {                     //pokud bylo splnene, ze arrays se rovnaji a delka arrays se rovnaji, zavolej funkci next sequence
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        var audio = new Audio('sounds/wrong.mp3');                     //prehrani audia wrong
        audio.play();
        $("body").addClass("game-over");                                //fce na pridani classy game over
        setTimeout(function () {
            $("body").removeClass("game-over");                         //fce na odebrani classy
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");            //zmena h1
        startOver();                                                    //trigger funkce na reset hodnot
    }

}

function startOver() {          //reset hodnot level, gamePatter a started
    level = 0;
    gamePattern = [];
    started = false;
}
