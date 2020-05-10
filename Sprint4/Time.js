/*
 *  TIME ESTIMATE FOR CALCULATION
 */

//--------------------------------------

class Time{
  constructor (hoopDist){ //hoop height, ball mass, launch angle, time force applied, gravity always consistent
    this.hoopDist = hoopDist; // hoop distance
    this.hoopHeight = 1.1; // relative hoop height: (3 - 1.9) m 
    this.mass = 1; // ball weighs 1 kg
    this.angle = radians(60); // 60 degree launch
    this.time_force_applied = 1; // force applied for 1 s
    this.grav = -9.8; // -9.8 m/s/s
  }
  
  run(maxForce){
    for(let f = 0.1; f <= maxForce; f += 0.1){ // try all possible forces from 0.1 to 10.0 to determine the time
      if(this.timeCalc(f)){ // give time estimate if its a possible shot
        return this.horTime;
      }
    }
    return 0; // no time estimate if its impossible
  }
  
  timeCalc(force) {
    // projectile, horizontal & vertical velocities given a force
    this.veloc_proj = force*this.time_force_applied/this.mass;
    this.vel = createVector(cos(this.angle)*this.veloc_proj, sin(this.angle)*this.veloc_proj);
    
    // time to reach target based on horizontal & vertical velocities
    let xt = this.hoopDist/this.vel.x; // xdis = xvel * xtime --> xtime = xdis/xvel
    this.horTime = Math.round((xt+Number.EPSILON)*100)/100;
    let yt = ([-this.vel.y - Math.sqrt(this.vel.y*this.vel.y + 2*this.grav*this.hoopHeight)]/this.grav); // > [-yv + Math.sqrt(yv*yv + 2*g*yd)]/g
    this.verTime = Math.round((yt+Number.EPSILON)*100)/100;

    if(isNaN(yt)){
      return false;
    }else{
      if(this.shotMade()){
        return true;
      }else{
        return false;
      }
    }
  }
  
  shotMade() { // true if the difference between 2 times is <0.05 & >0 
    if(abs(this.horTime - this.verTime) < 0.05) {
      return true;
    } else {
      return false;
    }
  }
  
}
