/***********************TRICK SHOT HEAVEN***********************/
/***************************************************************/
// May 4th
// by Jason Han, Brian Lee, Michael Averin, Lingxiu Zhang

let DEBUG = true; // enter/exit debug mode

// GLOBAL VARIABLES
let MENU; // menu object
let TUTORIAL; // tutorial object
let BASKETBALL_GAME; // game object
let FONTSIZECOEF; 
let FPS = 80;
let HSCALE, VSCALE; // how many pixels long, high one unit is. should be in BasketballGame
let WALL, FLOOR; // lengths to center canonical placements & movements. should be in BasketballGame
let IS_MOVING = false; // should be in BasketballGame
let IS_WIN = false; // should be in BasketballGame
let LEVEL = 1; // should be in BasketballGame
let LEVELUP = false; // should be in BasketballGame


// LOAD IMAGES AND FONTS BEFORE SETUP
function preload() {
  //imgMenu
  imgBasketballBackground = loadImage('assets/basketballBG.jpeg');
  imgBasketball = loadImage('assets/basketball.png');
  imgBasketballPlayer = loadImage('assets/person_basketball.png');
  imgBasketballPlayerShoot = loadImage('assets/person_basketball_shoot.png');
  imgBasketballPlayerStill = loadImage('assets/person_basketball_still.png');
  //imgBasketballHoop = loadImage('assets/basketball_hoop.png');
  
}

function setup() {
  // SETS UP CANVAS OBJECT WITH 16 * 9 RATIO INSIDE WINDOW
  maxScale = calcScale();
  createCanvas(16 * maxScale, 9 * maxScale);

  // DISPLAY SETTINGS
  frameRate(FPS);

  // INITIALIZE GAME
  BASKETBALL_GAME = new BasketballGame(5); // begins with freethrow; distance: 5m
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
