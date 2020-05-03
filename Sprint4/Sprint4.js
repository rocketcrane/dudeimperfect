/***********************TRICK SHOT HEAVEN***********************/
/***************************************************************/
// version beta
// by Jason Han, Brian Lee, Michael Averin, Lingxiu Zhang

let DEBUG = true; // debug mode

// GLOBAL VARIABLES
let BASKETBALL_GAME;
let UNIT = 'm'; // String representing unit of length
let HSCALE, VSCALE; // how many pixels long, high one unit is
let WALL, FLOOR; // lengths to center canonical placements & movements
let IS_MOVING = false;
let IS_WIN = false;
let FPS = 80;
let CANVAS;
let NEXT_LEVEL_BUTTON, DEBUG_BUTTON; // buttons
let game = 'basketball';
let level = 1;

// LOAD IMAGES AND FONTS BEFORE SETUP
function preload() {
  imgBasketball = loadImage('assets/basketball.png');
  imgBasketballPlayer = loadImage('assets/person_basketball.png');
  imgBasketballPlayerShoot = loadImage('assets/person_basketball_shoot.png');
  imgBasketballPlayerStill = loadImage('assets/person_basketball_still.png');
  imgBasketballHoop = loadImage('assets/basketball_hoop.png');
  imgBasketballBackground = loadImage('assets/basketballBG.jpeg');
}

function setup() {
  // SETS UP CANVAS OBJECT WITH 16 * 9 RATIO INSIDE WINDOW
  let maxScale = calcScale();
  CANVAS = createCanvas(16 * maxScale, 9 * maxScale);
  //VSCALE = ((height/3.213 + height/2.5) - (height/3.213)/1.7)/10;

  // DISPLAY SETTINGS
  frameRate(FPS);
  imageMode(CENTER);
  

  // INITIALIZE GAME
  // WALL = width * (27 / 32 - 5 / 40);
  BASKETBALL_GAME = new BasketballGame(-9.8, 1, 5);
  console.log('here');

  // INITIALIZE BUTTONS
  NEXT_LEVEL_BUTTON = createButton('Next Level');
  NEXT_LEVEL_BUTTON.size(100, 50);
  NEXT_LEVEL_BUTTON.position(width * 3/6, height/6.5);
  NEXT_LEVEL_BUTTON.mousePressed(nextLevel);
  DEBUG_BUTTON = createButton('DEBUG MODE');
  DEBUG_BUTTON.size(100, 50);
  DEBUG_BUTTON.position(width * 5/6, height/6.5);
  DEBUG_BUTTON.mousePressed(function() {
    DEBUG = !DEBUG;
  }
  );
}


function draw() {
  // DISPLAY UPDATES
  fill(0);
  // background(255);

  // GAME
  BASKETBALL_GAME.update();
  displayText();

  // DEBUG MODE
  if (DEBUG) {
    runDebug();
  }
  if (IS_WIN) {
    //background(0, 255, 0);
    textSize(60);
    fill(200,255,100);
    text("YOU WIN", width/2, height/2);
  }
}

function displayText() {
  fill(200,255,100);
  textSize(24);
  textAlign(LEFT);
  text("Force (N):", width/12, height/8 - height/32);
  text("Angle (°):", width/12, height/4 - height/32);
  textSize(24);
  if (level == 1) {
    textAlign(CENTER);
    textSize(60);
    text("Level " + level + ": Free Throw", width/2, height/16);
    textSize(24);
    text("Solution: 11 N, 60°", width/4, height/3);
  }
  if (level == 2) {
    textAlign(CENTER);
    textSize(60);
    text("Level " + level + ": Three Pointer", width/2, height/16);
    textSize(24);
    text("Solution: 15.3 N, 60°", width/4, height/3);
  }
  if (level == 3) {
    textAlign(CENTER);
    textSize(60);
    text("Level " + level + ": Half Court", width/2, height/16);
    textSize(24);
    text("Solution: 18.65 N, 60°", width/4, height/3);
  }
  if (level == 4) {
    textAlign(CENTER);
    textSize(60);
    text("Level " + level + ": Full Court", width/2, height/16);
    textSize(24);
    text("Solution: 18.65 N, 60°", width/4, height/3);
  }
}

function nextLevel() {
  if (game == 'basketball') {
    basketballNextLevel();
  }
}

function basketballNextLevel() {
  if (!IS_MOVING) {
    level = level % 4 + 1;
    if (level == 1) {
      BASKETBALL_GAME = new BasketballGame(-9.8, 1, 5);
    } else if (level == 2) {
      BASKETBALL_GAME = new BasketballGame(-9.8, 1, 10);
    } else if (level == 3) {
      BASKETBALL_GAME = new BasketballGame(-9.8, 1, 15);
    } else {
      BASKETBALL_GAME = new BasketballGame(-9.8, 1, 30);
    }
  }
}
