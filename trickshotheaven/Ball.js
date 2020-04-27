class Ball {
  constructor(img, x, y, diameter, mass, force, angle) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.radius = diameter/2;
    this.mass = mass;
    this.force = force;
    this.angle = angle;
    // initial projectile velocity, horizontal velocity = cos0 * v, vertical velocity = sin0 * v
    var radian = radians(angle);
    this.time_force_applied = 1;
    this.veloc_proj = this.force*this.time_force_applied/this.mass;
    this.vel = createVector(cos(radian)*this.veloc_proj, sin(radian)*this.veloc_proj);
  }

  move() {
    this.accelerate(0, -9.8/FPS);
    this.x += canonicalToActual(this.vel.x/FPS);
    this.y += canonicalToActual(this.vel.y/FPS);
    this.update();
  }

  accelerate(ddx, ddy) {
    this.vel.x += ddx;
    this.vel.y += ddy;
  }

  update() {
    // Floor
    if (this.y <= this.diameter) {
      this.vel.y *= -1;
    }

    // Backboard
    var isAtBackboardX = this.x - this.diameter >= width - width/8 && this.x - this.diameter <= width - width/10;
    var isAtBackboardY = this.y >= RIMHEIGHT && this.y <= HOOPHEIGHT;
    if (this.vel.x > 0 && isAtBackboardX && isAtBackboardY) {
      this.vel.x *= -1;
      WIN = true;
    }
    
    let winX = width - width/8 + HOOPSIZE/4;
    let winXLen = HOOPSIZE/2.1;
    let winY = FLOOR - HOOPHEIGHT*0.7;
    let winYLen = HOOPHEIGHT/10;
    if (DEBUG) {
      fill(0);
      strokeWeight(2);
      line(winX-winXLen, winY-winYLen, winX, winY);
    }
    var isAtWinX = this.x - this.diameter >= winX - winXLen && this.x - this.diameter <= winX;
    var isAtWinY = this.y >= winY - winYLen && this.y <= winY;
    if (isAtWinX && isAtWinY) {
      WIN = true;
    }
  }

  display() {
    imageMode(CENTER);
    drawImage(this.img, this.x, this.y);
    imageMode(CORNER);
  }
  
  //--------------------------------------
  // check if win condition has been met
  // for debug mode, show line for goal
  winCheck(x, y, xlen, ylen) {

  }
}
