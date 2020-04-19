/*
 * Brian Lee 04/19/2020 
 * Trickshot heaven JS code / projectile motion
 */

//game variables
let x; // the distance of the hoop with respect to the ball at the launching point
let y; // the height of the hoop with respect to the ball at the launching point
let angle; // launch angle in degrees
let force; // force in N
let ORIGIN, scale_to_screen; // calibrate scale game on screen
let frameSinceStart, show, sec, bucket; // time keeping
let axis_dis, axis_dis_2, axis_width; // format axis pos
let wallpaper;

//calculation in units newtons, meters, seconds
let mass, time_force_applied; // f = ma --> ft = mv
let radian; // launch angle in radians
let veloc_proj, veloc_hor, veloc_ver; // initial projectile velocity, horizontal velocity = cos0 * v, vertical velocity = sin0 * v
let time_hor, time_ver; // times to reach target based on horizontal & vertical velocities
let grav; // gravity acceleation: -9.8 m/s/s. Negative because it is going down

// time for the object to reach the target distance, x
// xdis = xvel * xtime --> xtime = xdis/xvel
function x_time(xd,xv) {
  t = xd/xv;
  t = Math.round((t+Number.EPSILON)*100)/100;
  return t;
}

// time for the object to reach the target height, y
// ydis = yvel*ytime + g*ytime*ytime/2 
// --> g/2*ytime*ytime + yvel*ytime - ydis = 0
// --> ytime = [-yvel ± √(yvel*yvel - 4*(g/2)*(-ydis)]/(2*(g/2))
function y_time(yd,yv) {
  t = ([-yv - Math.sqrt(yv*yv + 2*grav*yd)]/grav); // > [-yv + Math.sqrt(yv*yv + 2*g*yd)]/g
  t = Math.round((t+Number.EPSILON)*100)/100;
  return t;
}

// make all the calculations for the question except make()
function calc(xpos, ypos, ang, pow){
  x = xpos;
  y = ypos;
  angle = ang;
  force = pow;
  veloc_proj = force*time_force_applied/mass; // initial projectile velocity = 20 m/s. f = ma --> f*tfa = m*v
  //console.log("veloc_porj is "+veloc_proj);
  radian = radians(angle); // launch angle in radians = PI/3
  //console.log("radian is "+radian);
  veloc_hor = Math.cos(radian)*veloc_proj; // initial horizontal velocity, cos0 * v = 10
  //console.log("veloc_hor is "+veloc_hor);
  veloc_ver = Math.sin(radian)*veloc_proj; // initial vertical velocity, sin0 * v = 10*sqrt(3)
  //console.log("veloc_ver is "+veloc_ver);
  time_hor = x_time(x,veloc_hor); // 20/10 = 2s
  //console.log("time_hor is "+time_hor);
  time_ver = y_time(y,veloc_ver); // [-10*sqrt(3) - sqrt(10*sqrt(3)^2 - 4(1/2)(-9.8)(-15))]/(2(1/2)(-9.8)) = 2 s
  //console.log("time_ver is "+time_ver);
}

// the shot is made (-> 1) when time to reach target distance matches time to reach target height
function make(xt, yt) { 
  bucket = xt;
  // score if the difference between 2 times is <0.05 and >0 
  if((((xt-yt)<0.05)&&((xt-yt)>=0))||(((yt-xt)<0.05)&&((yt-xt)>=0))) return 1;
  else return 0;
}


function preload() {
  imgBasketball = loadImage('assets/basketball.png');
}


function setup() {
  createCanvas(500, 500); //size of program program. could be improved to be fit window
  wallpaper = 'rgb(0%,0%,0%)'; 
  colorMode(RGB, 255);
  background(wallpaper); //black
  frameSinceStart = 0;
  frameRate(30);
  
  // time keeping
  sec = 0; // increases by 1/30 every 1/30s
  show = sec; // for showing integer 'sec', begins count from 0
  bucket = 0; // the moment the shot is made or reached the hoop distance
  
  // basic game setting
  mass = 1; // a ball weighs 1 kg 
  time_force_applied = 1; // 1 s to apply force
  grav = -9.8; // gravity acceleation: -9.8 m/s/s. Negative, going down
  x = 20;
  y = 15;
  angle = 60;
  force = null;
  // ** workable solution: (x=20,y=15,a=60,f=20 --> t=2)
  // need generate other problems: x, y of hoop coord, launch angle, and a calculatable force
  
  // for positioning, scaling screen presentation
  ORIGIN = [50, 440];
  scale_to_screen = 10; 
  axis_dis = 17;
  axis_dis_2 = 10;
  axis_width = 2;
  
  forceInput = createInput();
  forceInput.position(10, 80);
  forceInput.size(30);
  //forceInput.changed(newForce);
  button = createButton('Set my power');
  button.position(forceInput.x+forceInput.width+5, 80);
  button.mousePressed(newForce);
  
}




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



class Projectile {
  constructor(img, x, y, diameter, dx, dy) {
    // "Abstract" class hack
    if (new.target === Projectile) { 
      throw TypeError("Projectile is an abstract class");
    }
    this.img = img;
    this.img.resize(diameter, diameter);
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = diameter/2;
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

class Ball extends Projectile {
  constructor(img, x, y, diameter, dx, dy) {
    super(img, x, y, diameter, dx, dy);
    this.diameter = diameter;
  }
}
