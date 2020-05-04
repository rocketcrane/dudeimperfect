class Time{
  constructor (hoopDist, launchForce){ //height, mass, angle, timeForceApplied, grav always consistent
    this.hoopDist = hoopDist; 
    this.launchForce = launchForce; 
    console.log("force "+this.launchForce);
    this.grav = -9.8; // -9.8 m/s/s
    this.mass = 1; // 1 kg
    let radian = radians(60); //60 degrees to radian
    this.time_force_applied = 1; // 1 s
    this.veloc_proj = this.launchForce*this.time_force_applied/this.mass;
    console.log("vel_proj "+this.veloc_proj);
    this.vel = createVector(cos(radian)*this.veloc_proj, sin(radian)*this.veloc_proj);
    console.log("vel_x "+this.vel.x+" vel_y "+this.vel.y);
  }
  
  run(){
    this.timeCalc();
    if(this.shotMade()){
      return this.horTime;
    }else{
      return 0;
    }
  }
  
  timeCalc() {
    // times to reach target based on horizontal & vertical velocities
    let xt = this.hoopDist/this.vel.x; // xdis = xvel * xtime --> xtime = xdis/xvel
    console.log("xt "+xt + " dist:" + this.hoopDist + " vel:" + this.vel.x);
    this.horTime = Math.round((xt+Number.EPSILON)*100)/100;
    let yt = ([-this.vel.y - Math.sqrt(this.vel.y*this.vel.y + 2*this.grav*1.1)]/this.grav); // > [-yv + Math.sqrt(yv*yv + 2*g*yd)]/g
    console.log("yt "+yt + " dist:" + this.hoopHeight + " vel:" + this.vel.y);
    this.verTime = Math.round((yt+Number.EPSILON)*100)/100; // [-10*sqrt(3) - sqrt(10*sqrt(3)^2 - 4(1/2)(-9.8)(-15))]/(2(1/2)(-9.8)) = 2 s
    console.log("times are "+this.horTime+" and "+this.verTime);
  }
  
  shotMade() { // true if the difference between 2 times is <0.05 & >0 
    if(abs(this.horTime - this.verTime) < 0.05) {
      return true;
    } else {
      return false;
    }
  }
  
  
  
  
}
