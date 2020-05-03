class Basketball extends Projectile {
  constructor(img, x, y, mass, force, angle, diameter) {
    super(img, x, y, mass, force, angle);
    this.diameter = diameter;
    this.radius = diameter/2;
    this.trueX = this.x - WALL;
    this.trueY = this.y - this.radius;
  }

  update() {
    // Update true (x,y)
    this.trueX = this.x - WALL;
    this.trueY = this.y - this.radius;
    
    // Bounce off floor
    if (this.y <= this.diameter) {
      this.vel.y *= -1;
    }
  }
}
