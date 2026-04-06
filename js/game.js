var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var showFullSequence = $("#ShowFullSequenceSwitch").get(0).checked;
var gameOver = false;
var playing = false;

$(document).on("keypress", function (event) {
  if (gameOver) {
    gameOver = false;
  } else if (event.key !== "a") {
    return;
  }

  $("#level-title").text("Score: " + gamePattern.length);
  gamePattern = [];
  clickCounter = 0;
  showing = false;
  pushNewColour();
  showColourSequence(gamePattern);
});

$("div.game-btn").on("click", function (event) {
  if (playing) {
    return;
  }
  if (gameOver) {
    gameOver = false;
  }
  playing = true;
  $("#level-title").text("Score: " + gamePattern.length);
  gamePattern = [];
  clickCounter = 0;
  showing = false;
  pushNewColour();
  showColourSequence(gamePattern);
});

$("div.game-btn").on("click", function () {
  showFullSequence = $("#ShowFullSequenceSwitch").get(0).checked;
  if (showing) {
    return;
  }
  var clickedColour = this.classList[1];
  if (gamePattern.length === 0) {
    return;
  }
  if (gamePattern[clickCounter] === clickedColour) {
    pushTheButton(this);
    clickCounter++;
  } else {
    endGame();
  }

  $("#level-title").text("Score: " + gamePattern.length);

  if (clickCounter > gamePattern.length - 1) {
    pushNewColour();
    showColourSequence(gamePattern);
  }
});

function pushNewColour() {
  var randomChosenColour = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColour);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

async function endGame() {
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();

  for (let i = 0; i < 4; i++) {
    $("body").toggleClass("game-over");
    await sleep(200);
    $("body").toggleClass("game-over");
    await sleep(200);
  }

  $("#level-title").text("Game Over, Press Any Key to Restart");
  gameOver = true;
  gamePattern = [];
  clickCounter = 0;
  showing = false;
  playing = false;
}

var clickCounter = 0;
var showing = false;
async function showColourSequence(gamePattern) {
  showing = true;
  await sleep(1500);
  if (showFullSequence) {
    for (let i = 0; i < gamePattern.length; i++) {
      var currButton = $(".game-btn." + gamePattern[i]).get(0);
      pushTheButton(currButton);
      await sleep(400);
    }
  } else {
    var currButton = $(".game-btn." + gamePattern[gamePattern.length - 1]).get(
      0,
    );
    pushTheButton(currButton);
    await sleep(400);
  }
  clickCounter = 0;
  showing = false;
}

async function pushTheButton(button) {
  // $(button).fadeOut();
  // $(button).fadeIn();
  $(button).toggleClass("pressed");
  await sleep(100);
  $(button).toggleClass("pressed");
  var sound = new Audio("sounds/" + button.classList[1] + ".mp3");
  sound.play();
}

const sleep = function (ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
};
