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
let hitNext = false;
let game = 'basketball';
let level = 1;
let FONTSIZECOEF;

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

  // DISPLAY SETTINGS
  frameRate(FPS);
  imageMode(CENTER);

  // INITIALIZE GAME
  BASKETBALL_GAME = new BasketballGame(5);
}


function draw() {

  // GAME
  FONTSIZECOEF = width*0.001;
  BASKETBALL_GAME.update();
  displayText();

  // DEBUG MODE
  if (DEBUG) {
    runDebug();
  }
  if (IS_WIN) {
    fill(255,255,255);
    textSize(60*FONTSIZECOEF);
    text("WIN", width/2, 11/16*height);
    textSize(30*FONTSIZECOEF);
    text("you may now hit 'reset' and move onto level "+(level%4+1), width/2, 27/32*height);
    hitNext = true;
  }
}

function displayText() {
  fill(200,255,100);
  textSize(24*FONTSIZECOEF);
  textAlign(LEFT);
  text("Force (N):", width/12, height/8 - height/32);
  text("Angle (°):", width/12, height/4 - height/32);
  if (level == 1) {
    textAlign(CENTER);
    textSize(60*FONTSIZECOEF);
    text("Level " + level + ": Free Throw", width/2, height/16);
    textSize(24*FONTSIZECOEF);
    text("Solution: 8 N, 60°", width/4, height/3);
  }
  if (level == 2) {
    textAlign(CENTER);
    textSize(60*FONTSIZECOEF);
    text("Level " + level + ": Three Pointer", width/2, height/16);
    textSize(24*FONTSIZECOEF);
    text("Solution: 11 N, 60°", width/4, height/3);
  }
  if (level == 3) {
    textAlign(CENTER);
    textSize(60*FONTSIZECOEF);
    text("Level " + level + ": Half Court", width/2, height/16);
    textSize(24*FONTSIZECOEF);
    text("Solution: 13 N, 60°", width/4, height/3);
  }
  if (level == 4) {
    textAlign(CENTER);
    textSize(60*FONTSIZECOEF);
    text("Level " + level + ": Full Court", width/2, height/16);
    textSize(24*FONTSIZECOEF);
    text("Solution: 18.5 N, 60°", width/4, height/3);
  }
}

function nextLevel() {
  if (game == 'basketball' && hitNext) {
    basketballNextLevel();
  }
}

function basketballNextLevel() {
  if (!IS_MOVING) {
    hitNext = false;
    level = level % 4 + 1;
    if (level == 1) {
      BASKETBALL_GAME = new BasketballGame(5);
    } else if (level == 2) {
      BASKETBALL_GAME = new BasketballGame(10);
    } else if (level == 3) {
      BASKETBALL_GAME = new BasketballGame(15);
    } else {
      BASKETBALL_GAME = new BasketballGame(30);
    }
  }
}
