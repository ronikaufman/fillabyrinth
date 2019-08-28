// Class representing a clickable button
// Its shape is a rectangle with half circle on each side

// (x, y): position of the center
// w and h: the width and height of the rectangle
// writtenText: the displayed text
// activated: a boolean representing the status of the button (in case it's an on/off switch)

function Button(x_, y_, w_, h_, writtenText_, activated_) {
  this.x = x_;
  this.y = y_;
  this.w = w_;
  this.h = h_;
  this.writtenText = writtenText_;
  this.activated = activated_;
  
  // Draws the button
  
  this.draw = function() {
    noStroke();
    rectMode(CENTER);

    if (this.activated) {
      fill(mainColor);
    } else {
      fill(backgroundColor);
      rect(this.x, this.y, this.w + this.h, this.h);
      fill(emptyColor);
    }
    
    rect(this.x, this.y, this.w, this.h);
    circle(this.x - this.w/2, this.y, this.h);
    circle(this.x + this.w/2, this.y, this.h);
    
    fill(obstacleColor);
    textSize(this.h/2 + 1);
    text(this.writtenText, this.x, this.y);
    
    rectMode(CORNER);
  }
  
  // Checks whether the button is under the mouse at the moment it is called
  
  this.clicked = function() {
    if ((abs(mouseX - this.x) < this.w/2) && (abs(mouseY - this.y) < this.h/2)) {
      // inside rectangle
      return true;
    } else if (dist(mouseX, mouseY, this.x - this.w/2, this.y) < this.h/2) {
      // inside left circle
      return true;
    } else if (dist(mouseX, mouseY, this.x + this.w/2, this.y) < this.h/2) {
      // inside right circle
      return true;
    }
    return false;
  }
}