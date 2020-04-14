/*
 * Brian Lee 04/13/2020 
 * Trickshot heaven JS code / projectile motion
 */

//game variables
let x; // the distance of the hoop with respect to the ball at the launching point
let y; // the height of the hoop with respect to the ball at the launching point
let ORIGIN = [50, 440]; // for calibrating ball and hoop positions on screen
let scale_to_screen = 10; // for scaling the throw on screen
let show; // for showing selected 'sec'
let sec; // increases by 1/30 every 1/30s
let bucket; // the moment the shot is made
let axis_dis = 17;  // axis formatting
let axis_dis_2 = 7;
let axis_width = 2;
let wallpaper = (0,0,0);

//user inupts
let angle; // launch angle in degrees
let force; // force in N

//calculation
let mass = 1; // a basketball weighs 1 kg 
let time_force_applied = 1; // 1 s to apply force
let veloc_proj; // initial projectile velocity. f = ma --> ft = mv
let radian; // launch angle in radians
let veloc_hor, veloc_ver; // initial horizontal velocity = cos0 * v, vertical velocity = sin0 * v
let time_hor, time_ver; // times to reach target based on horizontal & vertical velocities
let grav = -9.8; // gravity acceleation: -9.8 m/s/s. Negative because its going down

// paramters & return values are all in units meters & seconds

// time for the object to reach the target distance, x
// xdis = xvel * xtime --> xtime = xdis/xvel
function x_time(xd,xv) {
  t = xd/xv;
  t = Math.round((t+Number.EPSILON)*100)/100;
  return t;
}
// time for the object to reach the target height
// ydis = yvel*ytime + g*ytime*ytime/2 
// --> g/2*ytime*ytime + yvel*ytime - ydis = 0
// --> ytime = [-yvel ± √(yvel*yvel - 4*(g/2)*(-ydis)]/(2*(g/2))
function y_time(yd,yv) {
  t = ([-yv - Math.sqrt(yv*yv + 2*grav*yd)]/grav); // > [-yv + Math.sqrt(yv*yv + 2*g*yd)]/g
  t = Math.round((t+Number.EPSILON)*100)/100;
  return t;
}

// the shot is made (return 1) when x_time matches with y_time
function make(xt, yt) { 
  bucket = xt;
  if(((xt-yt)<0.05)||((yt-xt)<0.05)) {
    return 1;
  }else{
    return 0;
  }
}

// for animation??
function yvel(vv,t) {
  return vv - grav*t;
}


function setup() {
  // workable questions: (x=20,y=15,a=60,f=20 --> t=2)
  x = 20;  
  y = 15;
  angle = 60;
  force = 20; 
  veloc_proj = force*time_force_applied/mass; // initial projectile velocity = 20 m/s. f = ma --> f*tfa = m*v
  radian = radians(angle); // launch angle in radians = PI/3
  veloc_hor = Math.cos(radian)*veloc_proj; // initial horizontal velocity, cos0 * v = 10
  veloc_ver = Math.sin(radian)*veloc_proj; // initial vertical velocity, sin0 * v = 10*sqrt(3)
  time_hor = x_time(x,veloc_hor); // 20/10 = 2s
  time_ver = y_time(y,veloc_ver); // [-10*sqrt(3) - sqrt(10*sqrt(3)^2 - 4(1/2)(-9.8)(-15))]/(2(1/2)(-9.8)) = 2 s
  sec = 0; // began count from 0;
  show = sec; // show 0, 1, 2...
  bucket = 0; // 0 for now
  
  createCanvas(500, 500); //size of program program
  wallpaper = (0,0,0);
  background(wallpaper);
  frameRate(30);
}


function draw() {
  background(wallpaper); // repaint
  fill(255); // everything is white lined
  
  sec = frameCount/30; // update sec by 1/30
  if(sec%1 == 0){ // time ref only ticks every second
    show = sec;
  }
  
  textAlign(CENTER,TOP);
  textSize(15);
  text("The hoop is "+str(x)+" meters away and "+str(y)+" meters high", width/2, 20); // clue
  textSize(20);
  text("Launch Angle: "+str(angle)+"°", width/2, 50);  //repeat user input
  text("Launch Force: "+str(force)+" N", width/2, 80);  //repeat user input
  text("time: "+show+"s", 50, 50);  // time ref
    // paint the animation board
    push();
    translate(ORIGIN[0],ORIGIN[1]);  // calibrate all illustrations
    noStroke();
    triangle(-10,20,0,10,10,20);  // launching pad
    circle(0, 0, 20);  // ball
    rectMode(CENTER);
    rect((x*scale_to_screen),(-y*scale_to_screen),40,4); // hoop
    
    rectMode(CORNERS);
    rect(axis_dis,axis_dis,(x*scale_to_screen),(axis_dis+axis_width)); // x axis
    text(str(x)+" m", (x/2)*scale_to_screen, 20); // x label
    rect((-axis_dis+axis_dis_2),(-axis_dis),(-axis_dis+axis_width+axis_dis_2),(-y*scale_to_screen)); //y axis
    rotate(radians(270));
    text(str(y)+" m", (y/2)*scale_to_screen, -30); // y label
    pop();
  
  // if the user scores
  if(make(time_hor,time_ver) == 1){ 
    textSize(20);
    text(str(bucket)+"s to make the shot", width/2, 110);
    if(sec > bucket){
      textSize(60);
      rotate(radians(345));
      text("SPLASH !!", 150, 300);
      wallpaper = (14,152,14); //background to green
    }
  //or else...
  }else{
    textSize(15);
    text("horizontal velocity: "+str(veloc_hor)+" m/s\nvertical velocity: "+str(veloc_ver)+" m/s", width/2, 110);
    if(isNaN(time_hor)){
      text("the ball doesn't reach this far", width/2, 150);
    }else{
      text(str(time_hor)+"s to reach "+str(x)+"m in distance",width/2, 150);
    }
    if(isNaN(time_ver)){
      text("the ball doesn't reach this high", width/2, 170);
    }else{
      text(str(time_ver)+"s to reach "+str(x)+"m in height", width/2, 170);
    }
    textAlign(LEFT,TOP);
    text("veloc_proj: "+str(veloc_proj)+" m/s", 350, 60);
    if(sec > bucket){
      textSize(60);
      text("oops .", 150, 300);
      wallpaper = (152, 8, 8); // background to red
    }
  }

  
}
