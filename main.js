// Fillabyrinth
// A game by Roni Kaufman

// Structure and IO functions (where the magic happens)

function setup() {
  createCanvas(windowWidth - 1, windowHeight - 1);
  colorMode(HSB, 100);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont('Trebuchet MS');
  //pixelDensity(3);
  //scale(2.0);

  gameWidth = numSquaresW * squareSize + (numSquaresW - 1) * squareGap;
  gameHeight = numSquaresH * squareSize + (numSquaresH - 1) * squareGap;
  horizontalMargin = (width - gameWidth) / 2;
  verticalMargin = (height - gameHeight) / 2;

  previousSquares = [];
  canGoBack = false;

  easyLength = floor((1/2) * numSquares);
  mediumLength = floor((2/3) * numSquares);
  hardLength = floor((3/4) * numSquares);
  gameLength = mediumLength;

  backgroundColor = color(97);
  emptyColor = color(0, 0, 89);
  obstacleColor = color(0, 0, 20);
  easyColor = color(16, 90, 95);
  mediumColor = color(55, 90, 95);
  hardColor = color(3, 90, 95);
  mainColor = mediumColor;

  torusMode = false;
  score = 0;
  screen = "start";

  initButtons();
  initSquares();
}

function draw() {
  // Managing the cursor type
  if (screen === "start") {
    startScreen();
    if (easyButton.underMouse() || mediumButton.underMouse() || hardButton.underMouse() || torusOnButton.underMouse() || torusOffButton.underMouse() || startGameButton.underMouse()) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  } else if (screen === "game") {
    gameScreen();
    if (quitButton.underMouse()) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  } else if (screen === "end") {
    endScreen();
    if (backButton.underMouse()) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  }
}

function windowResized() {
  setup();
}

function keyPressed() {
  if (screen === "game") {

    let direction = "NAD"; // again, Not A Direction
    if (keyCode === UP_ARROW) {
      direction = 'u';
    } else if (keyCode === DOWN_ARROW) {
      direction = 'd';
    } else if (keyCode === RIGHT_ARROW) {
      direction = 'r';
    } else if (keyCode === LEFT_ARROW) {
      direction = 'l';
    }

    if (currentSquare.canGo(direction)) {
      goTo(direction);
    }

    if (currentSquare.possibilities().length === 0) {
      // game over
      screen = "end";
    }

    if (key === "z" && canGoBack) {
      goBack();
    }
  }
}

function mousePressed() {
  if (screen === "start") {

    if (easyButton.underMouse()) {
      mainColor = easyColor;
      gameLength = easyLength;
      easyButton.activated = true;
      mediumButton.activated = false;
      hardButton.activated = false;
      drawButtons();
    }

    if (mediumButton.underMouse()) {
      mainColor = mediumColor;
      gameLength = mediumLength;
      easyButton.activated = false;
      mediumButton.activated = true;
      hardButton.activated = false;
      drawButtons();
    }

    if (hardButton.underMouse()) {
      mainColor = hardColor;
      gameLength = hardLength;
      easyButton.activated = false;
      mediumButton.activated = false;
      hardButton.activated = true;
      drawButtons();
    }

    if (torusOnButton.underMouse()) {
      torusMode = true;
      torusOnButton.activated = true;
      torusOffButton.activated = false;
    }

    if (torusOffButton.underMouse()) {
      torusMode = false;
      torusOnButton.activated = false;
      torusOffButton.activated = true;
    }

    if (startGameButton.underMouse()) {
      //cursor(WAIT);
      createGame();
      currentSquare = squares[0];
      currentSquare.changeStatus();
      screen = "game";
      //cursor(ARROW);
    }

  } else if (screen === "game") {

    if (quitButton.underMouse()) {
      screen = "end";
    }

  } else if (screen === "end") {

    if (backButton.underMouse()) {
      // reset
      previousSquares = [];
      currentSquare = undefined;
      canGoBack = false;
      screen = "start";
      score = 0;
      initSquares();
    }

  }
}
