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

  // make all the calculations for the question except make()
  calc(x, y, angle, force) {
    this.proj.veloc_proj = this.proj.force*this.time_force_applied/this.proj.mass; // initial projectile velocity = 20 m/s. f = ma --> f*tfa = m*v
    var radian = radians(angle); // launch angle in radians = PI/3
    this.proj.veloc_hor = Math.cos(radian)*this.proj.veloc_proj; // horizontal velocity, cos0 * v = 10
    this.proj.veloc_ver = Math.sin(radian)*this.proj.veloc_proj; // vertical velocity, sin0 * v = 10*sqrt(3)
    this.time_hor = this.x_time(x, this.proj.veloc_hor); // 20/10 = 2s
    this.time_ver = this.y_time(y, this.proj.veloc_ver); // [-10*sqrt(3) - sqrt(10*sqrt(3)^2 - 4(1/2)(-9.8)(-15))]/(2(1/2)(-9.8)) = 2 s
  }

  // the shot is made (-> 1) when time to reach target distance matches time to reach target height
  make(xt, yt) { 
    bucket = xt;
    // score if the difference between 2 times is <0.05 and >0 
    if ((((xt-yt)<0.05)&&((xt-yt)>=0))||(((yt-xt)<0.05)&&((yt-xt)>=0))) { 
      return true;
    } else {
      return false;
    }
  }

  // time for the object to reach the target distance, x
  // xdis = xvel * xtime --> xtime = xdis/xvel
  x_time(xd, xv) {
    let t = xd/xv;
    t = Math.round((t+Number.EPSILON)*100)/100;
    return t;
  }

  // time for the object to reach the target height, y
  // ydis = yvel*ytime + g*ytime*ytime/2 
  // --> g/2*ytime*ytime + yvel*ytime - ydis = 0
  // --> ytime = [-yvel ± √(yvel*yvel - 4*(g/2)*(-ydis)]/(2*(g/2))
  y_time(yd, yv) {
    let t = ([-yv - Math.sqrt(yv*yv + 2*this.grav*yd)]/this.grav); // > [-yv + Math.sqrt(yv*yv + 2*g*yd)]/g
    t = Math.round((t+Number.EPSILON)*100)/100;
    return t;
  }
}
