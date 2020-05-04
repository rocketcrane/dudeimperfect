/*
 *  PROJECTILE OBJECT
 */

//--------------------------------------

class Basketball{
  constructor(img, x, y, force, diameter) {
    this.img = img;
    this.trueX = x; // true (x,y) counts from top left
    this.trueY = FLOOR - y;
    this.x = x - WALL; // (x,y) counts from (WALL,FLOOR)
    this.y = y;
    this.force = force; 
    this.diameter = diameter;
    this.radius = this.diameter/2;
    this.grav = -9.8; // -9.8 m/s/s
    this.mass = 1; // 1 kg
    let radian = radians(60); //60 degrees to radian
    this.time_force_applied = 1; // 1 s
    this.veloc_proj = this.force*this.time_force_applied/this.mass;
    // initial projectile velocity, horizontal velocity = cos0 * v, vertical velocity = sin0 * v
    this.vel = createVector(cos(radian)*this.veloc_proj, sin(radian)*this.veloc_proj);
  }
  
  move() {
    this.accelerate(0, this.grav/FPS);
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
