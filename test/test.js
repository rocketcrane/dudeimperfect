/*
 *                      Trickshot Heaven
 *
 *    Jason Han, Michael Averin, Brian Lee, and Lingxiu Zhang
 */

/*
 *  UI STUFF
 */
let curr = "title";
let clicking;
let forceSlider, angleSlider;

/*
 *  GAME STUFF
 */
const DEBUG = false;

let balls = [], walls = [], goal;
let iterations = 10;
const gravity = 0.3267; // 9.8/30
let friction, slidingFriction, tolerance = 0.25;
let canFire = false, fireTimer = 0;
let minX, maxX, minY, maxY;
let bbBounce1, bbBounce2;
let win = false;
//let distance;
let level, score, lives;
let force;
let angle;
let fontsize;
const backgroundLength = 41;
let hooploc, distance, percentDist, rimHeight, playerHeight;
let HSCALE, VSCALE;

function preload() {
  imgBB = loadImage("assets/basketball.png");
  imgGB = loadImage("assets/golfBall.png");
  bbBg = loadImage("assets/bbBg.png");
  bbLvl1 = loadImage("assets/bbLvl1.png");
  bbLvl2 = loadImage("assets/bbLvl2.png");
  bbLvl3 = loadImage("assets/bbLvl3.png");
  bbLvl4 = loadImage("assets/bbLvl4.png");
  bbBgWin = loadImage("assets/bbBgWin.png");
  bbLaunch = loadImage("assets/bbLaunch.png");
  bbLaunchGrey = loadImage("assets/bbLaunchGrey.png");
  reset = loadImage("assets/reset.png");
  resetGrey = loadImage("assets/resetGrey.png");
  nextLevel = loadImage("assets/nextLevel.png");
  star1 = loadImage("assets/star1.png");
  star2 = loadImage("assets/star2.png");
  star3 = loadImage("assets/star3.png");
  soundFormats('mp3');
  bbBounce1 = loadSound('assets/bbBounce1');
  bbBounce2 = loadSound('assets/bbBounce2');
}

function setup() {
  maxScale = calcScale();
  createCanvas(16 * maxScale, 9 * maxScale);
  minX = width/32;
  maxX = width * 31/32;
  minY = -width/4;
  maxY = height * 7/8;
  imageMode(CENTER);
  angleMode(DEGREES);
  textSize(20);
  textAlign(CENTER);
  resizeImgs();
  updateScale();
  forceSlider = new Slider(width/2 - width/5/2, height/4, width/5, 0, 20, 1, false, false, false);
  //angleSlider = new Slider(width/2 - width/14, height/4, width/7, -90, 90, 10, false, false, false);
}

function draw() {
  background(255);
  if (curr == "title") {
    fill(0);
    textSize(160);
    text("title", width/2, height/2);
    fill(255);
  } else if (curr == "basketball") {
    fontsize = width*0.001;
    bbVisuals();
    bbCanFire();
    updateWorld();
    showButtons();
    textSize(20);
    
    strokeWeight(2);
    forceSlider.move();
    if(!win){
      text("Force (N)", width/2, height*5/16);
      forceSlider.display();
    }
    //text("Angle (°)", width/2, height*31/32);
    //angleSlider.move();
    //angleSlider.display();
    strokeWeight(0);
    if (DEBUG) {
      debug();
    }
  }
}

function mousePressed() {
  clicking = true;
}

function mouseReleased() {
  clicking = false;
}

function keyPressed() {
  if (key === 'f') { // shoot/next
    if (canFire) {
      shootBB();
    } else if (win) {
      level++;
      newBasketballGame(level);
    }
  } 
  if (key === 'r') { //reset round
    if (!win) {
      newBasketballGame(level);
    }
  } else if (key === 'g') { //restart game
    newBasketballGame(1);
  } else if (key === 'j') { //play sound
    bbBounce1.play();
  } else if (key === 't') { //next level
    level++;
    newBasketballGame(level);
  }
}
