// Global variables

const squareSize = 25; // size of each square in pixels
const squareGap = 5; // gap between two squares in pixels (and also the radius of the corners of each square)
const numSquaresW = 17; // number of squares in width
const numSquaresH = 11; // number of squares in height
const numSquares = numSquaresW * numSquaresH; // total number of squares

let gameWidth; // width of the game field
let gameHeight; // height of the game field
let horizontalMargin; // margin between the top border of the canvas and the game field (same with the bottom border because it is centered)
let verticalMargin; // margin between the right border of the canvas and the game field (same with the left border because it is centered)

let squares; // squares of the game, an array
let currentSquare; // square corresponding to the player's current position
let previousSquares; // array of squares corresponding to the player's previous positions, in chronological order
let canGoBack; // boolean value (true if the player can undo the last move)
let solutions; // solution instructions encoded with characters ('u', 'd', 'r' or 'l')
let screen; // string corresponding to the screen displayed ("start", "game", "end")
let score; // current score (integer)
let torusMode; // boolean value (true if the game is played in torus mode)

let easyLength; // length of the solution in easy mode
let mediumLength; // length of the solution in medium mode
let hardLength; // length of the solution in difficult mode
let gameLength; // equals one of the three above

let backgroundColor; // color of the background
let emptyColor; // color of the empty squares
let obstacleColor; // color of the obstacle squares
let easyColor; // color in easy mode
let mediumColor; // color in medium mode
let hardColor; // color in hard mode
let mainColor; // color of the path of the player and of the buttons, equals one of the three above

// Buttons of start screen
let easyButton;
let mediumButton;
let hardButton;
let torusOnButton;
let torusOffButton;
let startGameButton;
// Buttons of game screen
let quitButton;
// Buttons of end screen
let backButton;
