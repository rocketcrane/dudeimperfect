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
