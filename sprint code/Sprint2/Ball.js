class Ball {
  constructor(img, x, y, diameter, mass, force, angle) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.radius = diameter/2;
    this.img.resize(diameter, diameter);
    this.mass = mass;
    this.force = force;
    this.angle = angle;
    // initial projectile velocity, horizontal velocity = cos0 * v, vertical velocity = sin0 * v
    this.veloc_proj = 0;
    this.veloc_hor = 0;
    this.veloc_ver = 0;
  }
  
  move() {
    this.x += this.veloc_hor * (5/frameRate());
    this.y -= this.veloc_ver * (5/frameRate());
  }

  display() {
    image(this.img, this.x, this.y);
  }
}
