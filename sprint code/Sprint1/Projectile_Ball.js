class Ball extends Projectile {
  constructor(img, x, y, diameter, dx, dy) {
    super(img, x, y, diameter, dx, dy);
    this.diameter = diameter;
  }
}
