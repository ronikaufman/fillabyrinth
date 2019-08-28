// Fillabyrinth
// A game by Roni Kaufman

// This is the main file (where the magic happens)

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
  
  previousSquare = undefined;
  antepenultimateSquare = undefined;
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
  
  initButtons();
  
  startScreen();
}

function draw() {}

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
      endScreen();
    }
    
    if (key === "z" && canGoBack) {
      goBack();
    }
  }
}

function mousePressed() {
  if (screen === "start") {

    if (easyButton.clicked()) {
      mainColor = easyColor;
      gameLength = easyLength;
      easyButton.activated = true;
      mediumButton.activated = false;
      hardButton.activated = false;
      drawButtons();
    }
    
    if (mediumButton.clicked()) {
      mainColor = mediumColor;
      gameLength = mediumLength;
      easyButton.activated = false;
      mediumButton.activated = true;
      hardButton.activated = false;
      drawButtons();
    }
    
    if (hardButton.clicked()) {
      mainColor = hardColor;
      gameLength = hardLength;
      easyButton.activated = false;
      mediumButton.activated = false;
      hardButton.activated = true;
      drawButtons();
    }
    
    if (torusOnButton.clicked()) {
      torusMode = true;
      torusOnButton.activated = true;
      torusOffButton.activated = false;
      startScreen();
    }
    
    if (torusOffButton.clicked()) {
      torusMode = false;
      torusOnButton.activated = false;
      torusOffButton.activated = true;
      startScreen();
    }
    
    if (startGameButton.clicked()) {
      gameScreen();
    }
    
  } else if (screen === "game") {
    
    if (quitButton.clicked()) {
      endScreen();
    }
    
  } else if (screen === "end") {
    
    if (backButton.clicked()) {
      // reset
      previousSquare = undefined;
      antepenultimateSquare = undefined;
      canGoBack = false;
      startScreen();
    }
    
  }
}