function timeCalc() {
    this.radian = radians(launchAngle); // launch angle in radians
    this.veloc_proj = this.launchForce * this.timeForceApplied / this.ballMass;
    this.veloc_hor = Math.cos(this.radian)*this.veloc_proj;
    this.veloc_ver = Math.sin(this.radian)*this.veloc_proj;
    // times to reach target based on horizontal & vertical velocities
    this.horTime = xTime(); // 20/10 = 2s
    this.verTime = yTime(); // [-10*sqrt(3) - sqrt(10*sqrt(3)^2 - 4(1/2)(-9.8)(-15))]/(2(1/2)(-9.8)) = 2 s
  }


class Physics{

  constructor (hoopDist, rimHeight, launchAngle, launchForce, ballMass, timeForceApplied, grav){
    this.hoopDist = hoopDist; // the distance of the hoop with respect to the ball at the launching point
    this.rimHeight = rimHeight; // the height of the hoop with respect to the ball at the launching point
    this.launchAngle = launchAngle; // launch angle in degrees
    this.launchForce = launchForce; // force in N
    this.ballMass = ballMass;
    this.timeForceApplied = timeForceApplied; // f = ma --> ft = mv
    this.grav = grav;
    
    this.frameSinceStart = 0;
    this.show;
    this.sec;
    this.bucket; // time keeping
  }
  
  timeCalc() {
    this.radian = radians(launchAngle); // launch angle in radians
    this.veloc_proj = this.launchForce * this.timeForceApplied / this.ballMass;
    this.veloc_hor = Math.cos(this.radian)*this.veloc_proj;
    this.veloc_ver = Math.sin(this.radian)*this.veloc_proj;
    // times to reach target based on horizontal & vertical velocities
    this.horTime = xTime(); // 20/10 = 2s
    this.verTime = yTime(); // [-10*sqrt(3) - sqrt(10*sqrt(3)^2 - 4(1/2)(-9.8)(-15))]/(2(1/2)(-9.8)) = 2 s
  }
  
  // time for the object to reach the target distance, x
  // xdis = xvel * xtime --> xtime = xdis/xvel
  xTime() {
    let t = this.hoopDist/this.veloc_hor;
    t = Math.round((t+Number.EPSILON)*100)/100;
    return t;
  }
  
  // time for the object to reach the target height, y
  // ydis = yvel*ytime + g*ytime*ytime/2 
  // --> g/2*ytime*ytime + yvel*ytime - ydis = 0
  // --> ytime = [-yvel ± √(yvel*yvel - 4*(g/2)*(-ydis)]/(2*(g/2))
  yTime() {
    let t = ([-this.veloc_ver - Math.sqrt(this.veloc_ver*this.veloc_ver + 2*this.grav*this.rimHeight)]/this.grav); // > [-yv + Math.sqrt(yv*yv + 2*g*yd)]/g
    t = Math.round((t+Number.EPSILON)*100)/100;
    return t;
  }
  
  shotMade(xt, yt) { 
    bucket = xt;
    // score if the difference between 2 times is <0.05 and >0 
    if((((xt-yt)<0.05)&&((xt-yt)>=0))||(((yt-xt)<0.05)&&((yt-xt)>=0))) return 1;
    else return 0;
  }
  
  // make all the calculations for the question except make()
  
  
  // the shot is made (-> 1) when time to reach target distance matches time to reach target height
  
  
  
  
  
  
  function draw() {
    colorMode(RGB, 255);
    background(wallpaper); // repaint
    fill(255); // everything is white lined
    
    textSize(20);
    textAlign(LEFT, TOP);
    text("time: "+show+"s", 10, 50);  // time ref
    textAlign(CENTER,TOP);
    text("Launch Angle: "+angle+"°", width/2, 50);
    if(force == null){ // still asking for inputs
      text("Launch Force: ___ N", width/2, 80);  //show ques for input asked
      textSize(15);
      text("Insert an angle and a force down below", width/2, 20); // hint action  
    }else{ // already ran calc()
      //forceInput = "";
      //button = "";
      text("Launch Force: "+force+" N", width/2, 80);  //repeat user input
      sec = (frameCount - frameSinceStart)/30; // updates by 1/30 starting the moment the user submits a force
      if(sec % 1 == 0) show = sec; // update time every second
      textSize(15);
      text("The hoop is "+x+" meters away and "+y+" meters high", width/2, 20); // display inputs
    }
    
    
    
    // paint the animation board
      push();
      translate(ORIGIN[0],ORIGIN[1]);  // calibrate all illustrations
      noStroke();
      triangle(-10,20,0,10,10,20);  // launching pad
      circle(0, 0, 20);  // ball
      rectMode(CENTER);
      rect((x*scale_to_screen),(-y*scale_to_screen),40,4); // hoop
      
      rectMode(CORNERS);
      rect(axis_dis,axis_dis_2,(x*scale_to_screen),(axis_dis_2+axis_width)); // x axis
      text(x+" m", (x/2)*scale_to_screen, 13); // x label
      rect((-axis_dis_2),(-axis_dis),(-axis_dis_2+axis_width),(-y*scale_to_screen)); //y axis
      rotate(radians(270));
      text(y+" m", (y/2)*scale_to_screen, -30); // y label
      pop();
    
    if(force != null){
      calc(x, y, angle, force);
      // draws SPLASH when the player scores 
      if(make(time_hor,time_ver) == 1){ 
        textSize(20);
        text(bucket+"s to make the shot", width/2, 110);
        if(sec > bucket){
          textSize(60);
          rotate(radians(345));
          text("SPLASH !!", 150, 300);
          colorMode(RGB, 255);
          wallpaper = 'rgb(20%,100%,50%)'; //background turns green
        }
      //or else...
      }else{
        textAlign(LEFT, TOP);
        textSize(15);
        text("veloc_proj: "+veloc_proj+" m/s", 350, 65);
        text("horizontal velocity at launch: ~ "+Math.round((veloc_hor+Number.EPSILON)*100)/100+" m/s\nvertical velocity at launch: ~ "+Math.round((veloc_ver+Number.EPSILON)*100)/100+" m/s", 10, 110);
        text("-> it takes "+time_hor+"s to reach "+x+"m in distance", 10, 150);
        if(isNaN(time_ver)){
          text("-> but it does not reach "+y+"m in height", 10, 170);
          textSize(20);
          text("TOO LITTLE POWER", 280, 135);
        }else{
          text("-> it takes "+time_ver+"s to descend to "+y+"m in height", 10, 170);
          textSize(20);
          if(time_hor > time_ver) text("TOO LITTLE POWER", 280, 135);
          else text("TOO MUCH POWER", 280, 135);
        }
        
        if(sec > bucket){
          textSize(60);
          text("oops .", 150, 300);
          colorMode(RGB, 255);
          wallpaper = 'rgb(100%,0%,20%)'; // background to red
        }
      }
    }
  }
  
  
  function newForce(){
    force = forceInput.value();
    frameSinceStart = frameCount;
    console.log("frame count begins at: "+frameSinceStart);
  }
  
 
