// Functions other than structure and IO functions

// Draws the game

function drawGame() {
  for (let square of squares) {
    if (square.isObstacle) {
      square.draw(obstacleColor);
    } else {
      square.draw(emptyColor);
    }
  }
  if (previousSquares[0]) {
    previousSquares[0].draw(mainColor);
  }
  for (let i = 1; i < score; i++) {
    previousSquares[i].draw(mainColor);
    drawBridge(previousSquares[i], previousSquares[i-1]);
  }
  if (currentSquare) {
    if (score > 0) {
      drawBridge(previousSquares[score-1], currentSquare);
    }
    currentSquare.draw(mainColor, isCurrent = true);
  }
}

// Draws the buttons from the current screen

function drawButtons() {
  if (screen === "start") {

    easyButton.draw();
    mediumButton.draw();
    hardButton.draw();
    torusOnButton.draw();
    torusOffButton.draw();
    startGameButton.draw();

  } else if (screen === "game") {

    quitButton.draw();

  } else if (screen === "end") {

    backButton.draw();

  }
}

// Draws the bridge between the squares s1 and s2

function drawBridge(s1, s2) {
  if (s1.index === s2.index) {
    return;
  }

  // specific cases in torus mode
  if (torusMode && s1.isOnTopBorder() && s2.isOnBottomBorder()) {
    rect(s1.x, s1.y, squareSize, squareSize/2);
    rect(s2.x, s2.y + squareSize/2, squareSize, squareSize/2);
  } else if (torusMode && s1.isOnBottomBorder() && s2.isOnTopBorder()) {
    drawBridge(s2, s1);
  } else if (torusMode && s1.isOnRightBorder() && s2.isOnLeftBorder()) {
    rect(s1.x + squareSize/2, s1.y, squareSize/2, squareSize);
    rect(s2.x, s2.y, squareSize/2, squareSize);
  } else if (torusMode && s1.isOnLeftBorder() && s2.isOnRightBorder()) {
    drawBridge(s2, s1);

  } else {
    // usual case
    rect((s1.x + s2.x)/2, (s1.y + s2.y)/2, squareSize, squareSize);
  }
}

// Draws a line from the center of s1 to the center of s2, similar to drawBridge

function drawLine(s1, s2) {
  let half = squareSize/2;

  // specific cases in torus mode
  if (torusMode && s1.isOnTopBorder() && s2.isOnBottomBorder()) {
    strokeCap(SQUARE);
    line(s1.x + half, s1.y + half, s1.x + half, s1.y);
    line(s2.x + half, s2.y + half, s2.x + half, s2.y + squareSize);
    strokeCap(ROUND);
    line(s1.x + half, s1.y + half, s1.x + half, s1.y + half);
    line(s2.x + half, s2.y + half, s2.x + half, s2.y + half);
  } else if (torusMode && s1.isOnBottomBorder() && s2.isOnTopBorder()) {
    drawLine(s2, s1);
  } else if (torusMode && s1.isOnRightBorder() && s2.isOnLeftBorder()) {
    strokeCap(SQUARE);
    line(s1.x + half, s1.y + half, s1.x + squareSize, s1.y + half);
    line(s2.x + half, s2.y + half, s2.x, s2.y + half);
    strokeCap(ROUND);
    line(s1.x + half, s1.y + half, s1.x + half, s1.y + half);
    line(s2.x + half, s2.y + half, s2.x + half, s2.y + half);
  } else if (torusMode && s1.isOnLeftBorder() && s2.isOnRightBorder()) {
    drawLine(s2, s1);

  } else {
    // usual case
    line(s1.x + half, s1.y + half, s2.x + half, s2.y + half);
  }
}

// Initializes the squares

function initSquares() {
  squares = [];
  for (let j = 0; j < numSquaresH; j++) {
    for (let i = 0; i < numSquaresW; i++) {
      let x = horizontalMargin + i * (squareSize + squareGap);
      let y = verticalMargin + j * (squareSize + squareGap);
      let index = j * numSquaresW + i;
      squares.push(new Square(x, y, index));
    }
  }
}

// Initializes the buttons

function initButtons() {
  // start screen

  let x = width/2 - 150;
  let y = verticalMargin + gameHeight + 45;
  let w = 100;
  let h = 40;
  easyButton = new Button(x, y, w, h, "easy", false);
  x = width/2;
  mediumButton = new Button(x, y, w, h, "medium", true);
  x = width/2 + 150;
  hardButton = new Button(x, y, w, h, "hard", false);

  x = width/2;
  y += 55;
  w = 40;
  torusOnButton = new Button(x, y, w, h, "on", false);
  x = width/2 + 90;
  torusOffButton = new Button(x, y, w, h, "off", true);

  x = width/2;
  y = height/2;
  w = 180;
  h = 120;
  startGameButton = new Button(x, y, w, h, "start", true);

  // game screen

  y = verticalMargin + gameHeight + 100;
  w = 100;
  h = 40;
  quitButton = new Button(x, y, w, h, "quit", true);

  // end screen

  w = 100;
  backButton = new Button(x, y, w, h, "menu", true);

}

// Leaves the game just with the obstacles

function prepareGame() {
  // First, everything is an obstacle
  for (let square of squares) {
    square.status = false;
    square.isObstacle = true;
  }

  // Then, we free the squares from the solution we found
  let square = squares[0];
  square.isObstacle = false;
  for (let direction of solution) {
    square = square.get(direction);
    square.changeStatus();
    square.isObstacle = false;
    //square.draw(emptyColor);
  }

  currentSquare = squares[0];
}

// Pops a random element in the Array arr
// and returns it

function randomPop(arr) {
  let idx = floor(random(arr.length));
  let e = arr.splice(idx, 1);
  return e[0];
}

// Creates the game by finding a feasible path of length (gameLength + 1)
// +1 because we store the instructions, i.e. the bridges
// and storing it in the Array solution
// Also initializes the Array squares

function createGame() {
  let square = squares[0]; // we begin in the top-left corner
  let poss = ['d', 'r'];
  solution = [];

  while (solution.length != gameLength) {
    let direction = randomPop(poss);

    if (square.canGo(direction)) {
      solution.push(direction);
      square.changeStatus();
      square.isObstacle = true;
      square = square.get(direction);
      poss = square.possibilities();

      if (poss.length === 0) {
        initSquares();
        square = squares[0];
        poss = ['d', 'r'];
        solution = [];
      }
    }
  }

  prepareGame();
}

// Draws the solution on top of the game played

function watchSolution() {
  stroke(obstacleColor);
  strokeWeight(squareSize/3);
  let square = squares[0];

  for (let i = 0; i < solution.length; i++) {
    let direction = solution[i];
    previousSquare = square;
    square = square.get(direction);
    drawLine(previousSquare, square);
  }
}

// Creates the start screen

function startScreen() {
  background(backgroundColor);
  drawGame();
  drawButtons();

  fill(obstacleColor);
  textSize(60);
  text("Fillabyrinth", width/2, verticalMargin - 80);
  textSize(25);
  text("A game by Roni Kaufman", width/2, verticalMargin - 25);
  textSize(21);
  text("Torus mode:", width/2 - 108, verticalMargin + gameHeight + 100);
}

// Creates the game screen

function gameScreen() {
  background(backgroundColor);
  drawGame();
  drawButtons();

  showScoreTag();
  textSize(21);
  text("Use the arrow keys to move.\n Press z to undo your last move.", width/2, verticalMargin + gameHeight + 42);
}

// Creates the end screen

function endScreen() {
  // There was no other way...
  background(backgroundColor);
  drawGame();
  fill(backgroundColor);
  rect(0, 0, width, verticalMargin);
  rect(0, verticalMargin + gameHeight, width, verticalMargin);

  fill(obstacleColor);
  if (score === gameLength) {
    // perfection
    textSize(60);
    text("Congratulations!", width/2, verticalMargin - 80);
  }
  textSize(21);
  text("Here was one possible solution.", width/2, verticalMargin + gameHeight + 42);
  textSize(25);
  let percent = round(score/gameLength*1000)/10;
  text("Final score: " + percent + "%", width/2, verticalMargin - 25);

  watchSolution();
  drawButtons();
}

// Displays an updated score tag (used during the game)

function showScoreTag(txt) {
  fill(backgroundColor);
  rect(0, verticalMargin/2, width, verticalMargin/2);
  fill(obstacleColor);
  textSize(25);
  let percent = round(score/gameLength*1000)/10;
  text("Current score: " + percent + "%", width/2, verticalMargin - 25);
}

// Lets the player move to the direction given as parameter

function goTo(direction) {
  previousSquares.push(currentSquare);
  currentSquare = currentSquare.get(direction);
  currentSquare.changeStatus();

  score++;
  canGoBack = true;
}

// During the game, undoes the last move

function goBack() {
  currentSquare.changeStatus();
  currentSquare = previousSquares.pop();
  score--;
  canGoBack = false;
}
