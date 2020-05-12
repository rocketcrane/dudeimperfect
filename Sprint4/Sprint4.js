/***********************TRICK SHOT HEAVEN***********************/
/***************************************************************/
// May 9th
// by Jason Han, Brian Lee, Michael Averin, Lingxiu Zhang

let DEBUG = true; // enter/exit debug mode

// MODES
let MENU; // menu object
let TUTORIAL; // tutorial object
let BASKETBALL_GAME; // game object

// SCALE & PLACEMENTS
let FONTSIZECOEF; 
let HSCALE, VSCALE; // how many pixels long, high one unit is. should be in BasketballGame
let WALL, FLOOR; // lengths to center canonical placements & movements. should be in BasketballGame

// BASKETBALL GAME
let IS_MOVING = false;
let IS_WIN = false;
let LEVEL = 1;
let LEVELUP = false;

let FPS = 80;

// LOAD IMAGES AND FONTS BEFORE SETUP
function preload() {
  
  //imgMenu
  imgBasketballBackground = loadImage('assets/basketballBG.jpeg');
  imgBasketball = loadImage('assets/basketball.png');
  imgBasketballPlayer = loadImage('assets/person_basketball.png');
  imgBasketballPlayerShoot = loadImage('assets/person_basketball_shoot.png');
  imgBasketballPlayerStill = loadImage('assets/person_basketball_still.png');
}

function setup() {
  // SETS UP CANVAS OBJECT WITH 16 * 9 RATIO INSIDE WINDOW
  maxScale = calcScale();
  createCanvas(16 * maxScale, 9 * maxScale);

  // DISPLAY SETTINGS
  frameRate(FPS);

  // INITIALIZE GAME
  BASKETBALL_GAME = new LearnGame(5); // begins with freethrow; distance: 5m\
  
  
}


function draw() {

  // GAME
  FONTSIZECOEF = width*0.001;
  BASKETBALL_GAME.update();

  // DEBUG MODE
  if (DEBUG) {
    runDebug();
  }
}
