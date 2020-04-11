class Projectile {
  constructor(img, x, y, diameter, dx, dy) {
    // "Abstract" class hack
    if (new.target === Projectile) { 
      throw TypeError("Projectile is an abstract class");
    }
    this.img = img;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = diameter/2;
    this.img.resize(diameter, diameter);
  }

  move() {
    this.x += this.dx;
    this.y -= this.dy;
    this.checkBoundary();
  }

  setDY(dy) {
    this.dy = dy;
  }

  checkBoundary() {
    if (this.touchingTop()) {
      this.dy = -1 * this.dy;
    }
    // Right
    else if (this.touchingRight()) {
      this.dx = -1 * this.dx;
    }
    // Bottom
    else if (this.touchingBottom()) {
      this.dy = -1 * this.dy;
    }
    // Left
    else if (this.touchingLeft()) {
      this.dx = -1 * this.dx;
    }
  }

  touchingWall() {
    return this.touchingTop() || this.touchingRight() || this.touchingBottom() || this.touchingLeft();
  }

  touchingTop() {
    return this.y < this.radius;
  }

  touchingRight() {
    return this.x > width - this.radius;
  }

  touchingBottom() {
    return this.y > height - this.radius;
  }

  touchingLeft() {
    return this.x < this.radius;
  }

  display() {
    image(this.img, this.x, this.y);
  }
}
