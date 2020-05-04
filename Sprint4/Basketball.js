class Basketball{
  constructor(img, x, y, mass, force, angle, diameter) {
    this.img = img;
    this.trueX = x; // true (x,y) counts from top left
    this.trueY = FLOOR - y;
    this.x = x - WALL; // (x,y) counts from (WALL,FLOOR)
    this.y = y;
    this.mass = mass;
    this.force = force;
    this.angle = angle;
    this.time_force_applied = 1;
    this.veloc_proj = this.force*this.time_force_applied/this.mass;
    // initial projectile velocity, horizontal velocity = cos0 * v, vertical velocity = sin0 * v
    var radian = radians(angle);
    this.vel = createVector(cos(radian)*this.veloc_proj, sin(radian)*this.veloc_proj);
    
    // super(img, x, y, mass, force, accel, angle);
    this.diameter = diameter;
    this.radius = diameter/2;
  }
  
  move() {
    this.accelerate(0, -9.8/FPS);
    this.update();
    this.x += canonicalToActual(this.vel.x/FPS, HSCALE);
    this.y += canonicalToActual(this.vel.y/FPS, VSCALE);
  }
  
  accelerate(ddx, ddy) {
    this.vel.x += ddx;
    this.vel.y += ddy;
  }

  update() {
    // Update true (x,y)
    this.trueX = this.x + WALL;
    this.trueY = FLOOR - this.y; 
    
    // Bounce off floor
    if (this.y <= this.radius) {
      this.vel.y *= -0.8;
    }
  }
  
  display() {
    if (DEBUG) {
      drawPoint(this.trueX, this.trueY, this.diameter); // there has to be a better way for this
    } else {
      drawImageOnFloor(this.img, this.trueX, this.y + this.radius);
    }
  }
}
