// Object representing a square tile in the game

// (x, y): coordinates of the top left corner
// index: index in the global squares array
// status: current status of the tile (boolean, true for empty, false for occupied)
// isObstacle: boolean value (true if the square is an obstacle)

function Square(x_, y_, index_) {
  this.x = x_;
  this.y = y_;
  this.index = index_;
  
  this.status = true; // begins empty because we generate the solution first
  this.isObstacle = false; // idem
  
  // Draws the square
  
  this.draw = function(c) {
    fill(c);
    if (torusMode) {
      circle(this.x + squareSize/2, this.y + squareSize/2, squareSize);
    } else {
      square(this.x, this.y, squareSize, squareGap);
    }
  }
  
  // Flips the value of status
  
  this.changeStatus = function() {
    this.status = !(this.status);
  }
  
  // Returns boolean value, true if the square is on the top border of the game
  
  this.isOnTopBorder = function() {
    return (this.index < numSquaresW);
  }
  
  // Returns boolean value, true if the square is on the bottom border of the game
  
  this.isOnBottomBorder = function() {
    return (this.index >= numSquares - numSquaresW);
  }
  
  // Returns boolean value, true if the square is on the right border of the game
  
  this.isOnRightBorder = function() {
    return (this.index % numSquaresW === numSquaresW - 1);
  }
  
  // Returns boolean value, true if the square is on the right border of the game
  
  this.isOnLeftBorder = function() {
    return (this.index % numSquaresW === 0);
  }
  
  // Returns the square on top of this one if it exists, null otherwise
  
  this.up = function() {
    if (this.isOnTopBorder()) {
      // in the top row
      if (torusMode) {
        return squares[this.index + numSquares - numSquaresW];
      } else {
        return null;
      }
    }
    return squares[this.index - numSquaresW];
  }
  
  // Returns the square down under this one if it exists, null otherwise
  
  this.down = function() {
    if (this.isOnBottomBorder()) {
      // in the last row
      if (torusMode) {
        return squares[this.index - numSquares + numSquaresW];
      } else {
        return null;
      }
    }
    return squares[this.index + numSquaresW];
  }
  
  // Returns the square on the right of this one if it exists, null otherwise
  
  this.right = function() {
    if (this.isOnRightBorder()) {
      // in the last column
      if (torusMode) {
        return squares[this.index + 1 - numSquaresW];
      } else {
        return null;
      }
    }
    return squares[this.index + 1];
  }
  
  // Returns the square on the left of this one if it exists, null otherwise
  
  this.left = function() {
    if (this.isOnLeftBorder()) {
      // in the first column
      if (torusMode) {
        return squares[this.index - 1 + numSquaresW];
      } else {
        return null;
      }
    }
    return squares[this.index - 1];
  }
  
  // Returns the square obtained when moving into the direction given as argument if it exists, null otherwise
  
  this.get = function(direction) {
    switch (direction) {
      case 'u':
        return this.up();
      case 'd':
        return this.down();
      case 'r':
        return this.right();
      case 'l':
        return this.left();
    }
  }
  
  // Returns whether this square can go in the direction given as argument
  
  this.canGo = function(direction) {
    if (direction === "NAD") { // Not A Direction
      return false;
    }
    if (this.get(direction) === null) {
      return false;
    }
    return this.get(direction).status;
  }
  
  // Returns an array of characters corresponding to the directions where this square can move
  
  this.possibilities = function() {
    // You wonder what I see in your future?
    let p = [];
    for (let dir of ['u', 'd', 'r', 'l']) {
      if (this.canGo(dir)) {
        p.push(dir);
      }
    }
    return p;
  }
}