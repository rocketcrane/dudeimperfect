/*
 * Brian Lee 04/07/2020 
 * Trickshot heaven JS code / projectile motion
 */

//game variable
let x;
let y;
let ORIGIN = [50, 380];
let scaleToScreen = 10;
let count = 0;
let bucket = 1;

//user inupt
let a; // launch angle in degrees
let f; // force in N

//calculation
let m = 1; // a basketball weighs 1 kg 
let tfa = 1; // time of force applied is 1 s
let v; // initial projectile velocity. f = ma
let r; // launch angle in radians
let vx, vy; // initial horizontal velocity = cos0 * v, vertical velocity = sin0 * v
let tx, ty1, ty2; // times to reach target based on horizontal & vertical velocities
let g = -9.8; // gravity acceleation: -9.8 m/s/s. Negative because its going down

// paramters & return values all in units meters & seconds
// xdis = xvel * xtime --> xtime = xdis/xvel
function xt(xd,xv) {
  return xd/xv;
}
// ydis = yvel*ytime + g*ytime*ytime/2 
// --> g/2*ytime*ytime + yvel*ytime - ydis = 0
// --> ytime = [-yvel ± √(yvel*yvel - 4*(g/2)*(-ydis)]/(2*(g/2))
function yt1(yd,yv) {
  let eval = [-yv + Math.sqrt(yv*yv + 4*(g/2)*yd)]/(2*(g/2));
  return eval;
}
function yt2(yd,yv) {
  let eval = [-yv - Math.sqrt(yv*yv + 4*(g/2)*yd)]/(2*(g/2));
  return eval;
}

function hit(xt, yt1, yt2){
  if((xt == yt1)||(xt == yt2)) {
    bucket = xt;
    return 1;
  }else return 0;
}

// animation
function yvel(vv,t) {
  return vv - g*t;
}


function setup() {
  x = 24;
  y = 12.4;
  a = 60;
  f = 20;
  v = f*tfa/m; // initial projectile velocity = 20 m/s. f = ma
  r = a/360*2*PI; // launch angle in radians = PI/3
  vx = Math.cos(r)*v; // initial horizontal velocity, cos0 * v = 12
  vy = Math.sin(r)*v; // initial vertical velocity, sin0 * v = 16
  tx = xt(x,vx); // 24/12 = 2 s
  ty1 = yt1(y,vy); // [-16 + sqrt(16*16 - 4(1/2)(-9.8)(-12.4))]/(2(1/2)(-9.8)) = 1.27 s
  ty2 = yt2(y,vy); // [-16 - sqrt(16*16 - 4(1/2)(-9.8)(-12.4))]/(2(1/2)(-9.8)) = 2 s
  
  createCanvas(500, 500); //size of program window on browswer
  background(0);
  frameRate(30);
  
  textAlign(CENTER,TOP);
  fill(255);
  textSize(15);
  text("The hoop is "+str(x)+" meters away and "+str(y)+" meters high", width/2, 20);
  textSize(20);
  text("Launch Angle: "+str(a)+"°", width/2, 50); 
  text("Launch Force: "+str(f)+" N", width/2, 80);
  
  triangle(40,400,50,390,60,400);
  rect((ORIGIN[0]+x*scaleToScreen),(ORIGIN[1]-y*scaleToScreen),40,3);
}


function draw() {
  circle(ORIGIN[0], ORIGIN[1], 20);
  if(count == bucket){
    if(hit(tx, ty1, ty2) == 1){
      background('rgb(0,255,0)');
    }else{
      background('red');
    }
  }
}
