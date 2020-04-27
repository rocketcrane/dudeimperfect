class World {
  constructor(x, y, grav, time_force_applied, proj) {
    // distance/height of the hoop with respect to the ball at the launching point
    this.x = x;
    this.y = y;
    this.grav = grav;
    this.time_force_applied = time_force_applied;
    this.proj = proj;
    // times to reach target based on horizontal & vertical velocities
    this.time_hor = -1;
    this.time_ver = -1;
  }
}
