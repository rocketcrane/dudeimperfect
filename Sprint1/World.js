class World {
  constructor(projectile, gravity) {
    this.projectile = projectile;
    this.gravity = gravity;
  }

  update() {
    this.applyGravity();
    this.applyFriction();
    this.projectile.move();
    this.projectile.display();
  }

  applyGravity() {
    if (!this.projectile.touchingBottom()) {
      this.projectile.setDY(this.projectile.dy + this.gravity);
    }
  }

  applyFriction() {
    if (this.projectile.touchingBottom()) {
      if (this.projectile.dy >= 2) {
        this.projectile.setDY(this.projectile.dy - 2);
      }
      this.roundSpeed();
    }
  }

  roundSpeed() {
    if (this.projectile.touchingBottom() && this.projectile.dy < 1) {
      this.projectile.setDY(0);
    }
  }
}
