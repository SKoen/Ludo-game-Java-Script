var currPos = 0;
var step = 50;
var currcolor = "";
var NumOfPaw = "";
var num = 0;
var clicked = false;
var currpawn = "";
function Stuck() {
    var text = document.getElementById('player');
    if (onboard[currpawn] == 0) {
        if (DontHaveOtherFree()) {
            alert("Unfortunately you stuck :(");
            clicked = false;
            var dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(dice.gif)";
            changePlayer();
        }
    }
}
function changePlayer() {
    var text = document.getElementById('player');
    switch(text.innerText){
        case "red": text.innerText = text.style.color = "blue"; break;
        case "blue": text.innerText = text.style.color = "yellow"; break;
        case "yellow": text.innerText = text.style.color = "green"; break;
        case "green": text.innerText = text.style.color="red"; break;
    }
    var badtext = document.getElementById('badtext');
    badtext.innerText = "";
    var dice = document.getElementById('dice');
    dice.style.backgroundImage = "url(dice.gif)";
}
var positions = {
    redpow1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
    bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
    greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
    yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};
var onboard = {
    redpow1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
    bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
    greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
    yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};
function DontHaveOtherFree() {
    var text = document.getElementById('player');
    for (var i = 1; i < 4; i++) {
        if (onboard[text.innerText + "pawn" + i] == 1) return false;
    }
    return true;
}
function stepDown() {
    var doc = document.getElementById(currcolor + "pawn"+NumOfPaw);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr+step)+'px';
    currPos++;
}
function stepUp() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr - step) + 'px';
    currPos++;
}
function stepLeft() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr - step) + 'px';
    currPos++;
}
function stepRight() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr + step) + 'px';
    currPos++;
}
var stepsRed = [];
var stepsYellow = [];
var stepsBlue =[];
var stepsGreen =[];
function pushSteps(value, steps, count) {
    for (i = 0; i < count; i++) steps.push(value);
}
//Red pawns path
pushSteps(stepDown,stepsRed,4);
pushSteps(stepRight, stepsRed,4);
pushSteps(stepDown, stepsRed,2);
pushSteps(stepLeft, stepsRed,4);
pushSteps(stepDown, stepsRed,4);
pushSteps(stepLeft, stepsRed,2);
pushSteps(stepUp, stepsRed,4);
pushSteps(stepLeft, stepsRed,4);
pushSteps(stepUp, stepsRed,2);
pushSteps(stepRight, stepsRed,4);
pushSteps(stepUp, stepsRed,4);
pushSteps(stepRight, stepsRed,1);
pushSteps(stepDown, stepsRed,5);
//Yellow pawns path

pushSteps(stepUp, stepsYellow,4);
pushSteps(stepLeft, stepsYellow,4);
pushSteps(stepUp, stepsYellow,2);
pushSteps(stepRight, stepsYellow,4);
pushSteps(stepUp, stepsYellow,4);
pushSteps(stepRight, stepsYellow,2);
pushSteps(stepDown, stepsYellow,4);
pushSteps(stepRight, stepsYellow,4);
pushSteps(stepDown, stepsYellow,2);
pushSteps(stepLeft, stepsYellow,4);
pushSteps(stepDown, stepsYellow,4);
pushSteps(stepLeft, stepsYellow,1);
pushSteps(stepUp, stepsYellow,5);

//Blue pawns path
pushSteps(stepLeft, stepsBlue,4);
pushSteps(stepDown, stepsBlue,4);
pushSteps(stepLeft, stepsBlue,2);
pushSteps(stepUp, stepsBlue,4,2);
pushSteps(stepLeft, stepsBlue,4);
pushSteps(stepUp, stepsBlue,2);
pushSteps(stepRight, stepsBlue,4);
pushSteps(stepUp, stepsBlue,4);
pushSteps(stepRight, stepsBlue,2);
pushSteps(stepDown, stepsBlue,4);
pushSteps(stepRight, stepsBlue,4);
pushSteps(stepDown, stepsBlue,1);
pushSteps(stepLeft, stepsBlue,5);

//Green pawns path
pushSteps(stepRight, stepsGreen,4);
pushSteps(stepUp, stepsGreen,4);
pushSteps(stepRight, stepsGreen,2);
pushSteps(stepDown, stepsGreen,4);
pushSteps(stepRight, stepsGreen,4);
pushSteps(stepDown, stepsGreen,2);
pushSteps(stepLeft, stepsGreen,4);
pushSteps(stepDown, stepsGreen,4);
pushSteps(stepLeft, stepsGreen,2);
pushSteps(stepUp, stepsGreen,4);
pushSteps(stepLeft, stepsGreen,4);
pushSteps(stepUp, stepsGreen,1);
pushSteps(stepRight, stepsGreen, 5);
function randomNum() {
    if (!clicked) {
        num = Math.floor((Math.random() * 6) + 1);
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "url(" + num + ".jpg)";
        clicked = true;
    }
    if (num != 6&&DontHaveOtherFree()) {
        var bad = document.getElementById('badtext');
        bad.innerText = "Unfortunatlly you stuck";
        window.setTimeout(changePlayer, 2000)
        clicked = false;
    }
}
function randomMove(Color, paw) {
    var text = document.getElementById('player');
    NumOfPaw = paw;
    currcolor = Color;
    currpawn = currcolor + "pawn" + NumOfPaw;
    currPos = positions[currpawn];
    var position = currPos;
    if (text.innerText == currcolor) {
        if (onboard[currpawn] === 1 || num === 6) {
            if (onboard[currpawn] === 0) {
                var doc = document.getElementById(currpawn);
                var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
                switch (Color) {
                    case "red":
                        doc.style.left = 318 + 'px';
                        doc.style.top = 28 + "px";
                        break;

                    case "yellow":
                        doc.style.left = 218 + 'px';
                        doc.style.top = 523 + "px";
                        break;

                    case "blue":
                        doc.style.left = 515 + 'px';
                        doc.style.top = 326 + "px";
                        break;

                    case "green":
                        doc.style.left = 22 + 'px';
                        doc.style.top = 227 + "px";
                        break;
                }
                onboard[currpawn] = 1;
            }
            else {
                switch (Color) {
                    case "red":
                        for (i = currPos; i < position + num; i++) {
                            stepsRed[i]();
                        }
                        break;

                    case "yellow":
                        for (i = currPos; i < position + num; i++) {
                            stepsYellow[i]();
                        }
                        break;

                    case "blue":
                        for (i = currPos; i < position + num; i++) {
                            stepsBlue[i]();
                        }
                        break;

                    case "green":
                        for (i = currPos; i < position + num; i++) {
                            stepsGreen[i]();
                        }
                        break;
                }
                positions[currpawn] = currPos;
                changePlayer();
            }
            num = 0;
            clicked = false;
            var dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(dice.gif)";
        }
        else Stuck();
    }
}
