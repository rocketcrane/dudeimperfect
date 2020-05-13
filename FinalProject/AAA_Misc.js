function updateWorld() {
  if (balls[0]) {
    for (let i = 0; i < balls.length; i++) {
      ball = balls[i];
      let g = createVector(0, gravity);
      if (!ball.isGrounded) {
        ball.applyForce(g);
      }
      for (let i = 0; i < iterations; i++) {
        ball.update();
      }
      for (let other of balls) {
        if (other != ball) {
          ball.collideCircle(other);
        }
      }
      for (let wall of walls) {
        ball.walls(wall.x1, wall.y1, wall.x2, wall.y2);
      }
      ball.show();
      goal.contains(ball.pos.x, ball.pos.y);
    }
  }
  if (walls[0]) {
    for (let wall of walls) {
      wall.show();
    }
  }
  if (goal != null) {
    goal.show();
  }
}

function Wall(x, y, w, h) {
  this.x1 = x;
  this.y1 = y;
  this.x2 = x + w;
  this.y2 = y + h;
  this.w = w;
  this.h = h;
  this.show = function() {
    if (DEBUG) {
      rectMode(CORNER);
      fill(0);
      rect(this.x1, this.y1, this.w, this.h);
      fill(255);
      rectMode(CENTER);
    }
  };
  // Rescaling
  this.x1Scale = this.x1/width;
  this.y1Scale = this.y1/height;
  this.x2Scale = this.x2/width;
  this.y2Scale = this.y2/height;
}

function Goal(x, y, w, h) {
  this.x1 = x;
  this.y1 = y;
  this.x2 = x + w;
  this.y2 = y + h;
  this.w = w;
  this.h = h;
  this.show = function() {
    if (DEBUG) {
      rectMode(CORNER);
      fill(255, 255, 0);
      rect(this.x1, this.y1, this.w, this.h);
      fill(255);
      rectMode(CENTER);
    }
  };
  // Rescaling
  this.x1Scale = this.x1/width;
  this.y1Scale = this.y1/height;
  this.x2Scale = this.x2/width;
  this.y2Scale = this.y2/height;

  this.contains = function(x, y) {
    let x1 = this.x1;
    let y1 = this.y1;
    let x2 = this.x2;
    let y2 = this.y2;
    let withinX = x >= x1 && x <= x2;
    let withinY = y >= y1 && y <= y2;
    if (withinX && withinY) {
      win = true;
    }
  };
}

// Taken from http://joemckaystudio.com/slider/
function Slider(_x, _y, _length, _startValue, _endValue, _varerval, _vars, _sticky, _showValues) {
  this.clicked = false; 
  this.sticky = false; 
  this.knobWidth = 12;
  this.knobHeight = 20;
  this.sliderValue = 0.00; 
  this.sliderValueInt = 0; 
  this.fade = 255; // for knob color
  this.xDif = 0.0;
  this.screenInterval = 0;
  this.x = _x;
  this.y = _y;
  this.xEnd = this.x + _length;
  this.xStart = this.x;
  this.startValue = _startValue;
  this.endValue = _endValue;
  this.vars = _vars;
  this.varerval = _varerval;
  this.totalLength = _length;
  this.sticky = _sticky;
  this.showValues = _showValues; 

 this.move = function() {
    // check to see if it's clicked 
    if (dist(mouseX, mouseY, this.x, this.y) < this.knobWidth) { // use this if you want a round knob on the slider 
      if (clicking && this.clicked == false) { // if mouse was pressed
        this.xDif = mouseX - this.x;
        this.clicked = true;
      }
      this.fade = 100; // mouseOver but not clicked
    } else {
      this.fade = 0;
    }
    if (this.clicked == true) {
      this.fade = 255;
    }
    if (clicking == false && this.clicked == true) { // if the mouse was just released
      this.clicked = false;
      if (this.sticky) { // if you set it to jump to the closest line 
        var modDif = this.sliderValue % this.varerval; // value to show how close it is to last line 
        var div = int(this.sliderValue / this.varerval); // vlaue to show how MANY varervals it's passed 
        
        if (modDif < this.varerval / 2) { // so it goes to closest line not just lower 
          this.x = this.xStart + (div * this.screenInterval);
        } else {
          this.x = this.xStart + ((div + 1) * this.screenInterval);
        }
      }
    }
    if (this.clicked) {
      this.x = mouseX - this.xDif; // so the slider doens't "jump" to the mouse x. 
      this.x = constrain(this.x, this.xStart, this.xEnd); // keep the knob on the slider
    }
    this.sliderValue = map(this.x, this.xStart, this.xEnd, this.startValue, this.endValue); // get the slider position relative to the values
    this.sliderValueInt = int(this.sliderValue); // make that number an var
  }

  this.display = function() {
    rectMode(CENTER);
    stroke(1);
    this.screenInterval = map(this.varerval, 0, this.endValue - this.startValue, 0, this.totalLength); // get the createCanvas of the gaps for the screen relative to the varervals 
    var counter = 0; 
    for (var i = int(this.screenInterval); i < this.totalLength; i += this.screenInterval) { // go from the first gap to the end of slider by the screenInterval
      line(i + this.xStart, this.y + 12, i + this.xStart, this.y - 12); // draw lines
      if(this.showValues){
        counter ++; 
        text( nfc(counter * this.varerval,1,1), i + this.xStart, this.y + 30);
        
      }
    }
    line(this.xStart, this.y + 12, this.xStart, this.y - 12); // draw first line (optional) 
    line(this.xEnd, this.y + 12, this.xEnd, this.y - 12); // draw last line (optional) 
    line(this.xStart, this.y, this.xEnd, this.y); // draw center line 
    fill(255);
    rect(this.x, this.y, this.knobWidth, this.knobHeight); // so it's opaque
    fill(100, 120, 160, this.fade);
    rect(this.x, this.y, this.knobWidth, this.knobHeight); // add color 
    fill(1);
    if (this.vars) {
     
    text( nfc(this.sliderValue,1,1), this.x, this.y - 20);
    } else {
      text(this.sliderValueInt, this.x, this.y - 20);
    }
    text(int (this.startValue), this.xStart, this.y + 30);
    text(int (this.endValue), this.xEnd, this.y + 30);
    rectMode(LEFT);
  }
}
