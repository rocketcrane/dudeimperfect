class Projectile {
  constructor(img, x, y, mass, force, accel, angle) {
    this.img = img;
    this.trueX = x; // true (x,y) counts from top left
    this.trueY = FLOOR - y;
    this.x = x - WALL; // (x,y) counts from (WALL,FLOOR)
    this.y = y;
    this.mass = mass;
    this.force = force;
    this.accel = accel;
    this.angle = angle;
    this.time_force_applied = 1;
    this.veloc_proj = this.force*this.time_force_applied/this.mass;
    // initial projectile velocity, horizontal velocity = cos0 * v, vertical velocity = sin0 * v
    
    var radian = radians(angle);
    
    this.vel = createVector(cos(radian)*this.veloc_proj, sin(radian)*this.veloc_proj);
  }

  move() {
    this.accelerate(0, this.accel/FPS);
    this.update();
    this.x += canonicalToActual(this.vel.x/FPS, HSCALE);
    this.y -= canonicalToActual(this.vel.y/FPS, VSCALE);
  }

  update() {
  }

  accelerate(ddx, ddy) {
    this.vel.x += ddx;
    this.vel.y += ddy;
  }

  display() {
    if (DEBUG) {
      drawPoint(this.trueX, this.trueY, this.diameter); // there has to be a better way for this
      console.log("hi");
    } else {
      drawImageOnFloor(this.img, this.trueX, this.y + this.radius);
    }
  }
}
