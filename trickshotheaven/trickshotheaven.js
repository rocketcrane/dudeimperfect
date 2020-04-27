/***********************TRICK SHOT HEAVEN***********************/
/***************************************************************/
// version alpha
// by Jason Han, Brian Lee, Michael Averin, Lingxiu Zhang

// MAJOR CHANGES COMPARED TO JASON'S SPRINT4 CODE:
// 1. global variables in allcaps for easier differentation (scope)
// 2. most things in update() and draw() have been moved to the Utilities tab
// 3. new Basketball tab for basketball-specific code
// 4. the text fields and buttons now dynamically resize,
//    and if the game window is aligned to the lop left corner there should be no positioning problems

let DEBUG = true; // debug mode

// GLOBAL VARIABLES
let WORLD;
let BALL;
let UNIT = 'm'; // String representing unit of length
let SCALE; // how many pixels long one unit is
let FLOOR, PLAYERHEIGHT, BALLSIZE, BALLHEIGHT, HOOPSIZE, HOOPHEIGHT, RIMHEIGHT; // various lengths
let ISMOVING = false;
let FPS = 60;
let SHOOTINGTIMER = 0; // various timers

// LOAD IMAGES AND FONTS BEFORE SETUP
function preload() {
  imgBasketball = loadImage('assets/basketball.png');
  imgBasketballPlayer = loadImage('assets/person_basketball.png');
  imgBasketballPlayerShoot = loadImage('assets/person_basketball_shoot.png');
  imgBasketballPlayerStill = loadImage('assets/person_basketball_still.png');
  imgBasketballHoop = loadImage('assets/basketball_hoop.png');
}

function setup() {
  // SETS UP CANVAS OBJECT WITH 16 * 9 RATIO INSIDE WINDOW
  let maxScale = calcScale();
  let canvas = createCanvas(16 * maxScale, 9 * maxScale);
  
  // DISPLAY SETTINGS
  frameRate(FPS);
  imageMode(CENTER);
  
  // INITIALIZE BALL AND WORLD
  // ball has initial force and angle of 0
  BALL = new Ball(imgBasketball, width/8, BALLHEIGHT, BALLSIZE, 1, 0, 0);
  // world has initial x and y loc of 20 and 15
  WORLD = new World(20, 15, -9.8, 1, BALL);
  
  // CREATE ALL WORLD OBJECTS
  createObjects();
}


function draw() {
  // DISPLAY UPDATES
  fill(0);
  background(255);
  rescale();
  
  // UPDATE ALL WORLD OBJECTS
  updateObjects();
  
  // update Basketball + player
  updateBasketball();
  
  // DEBUG MODE
  if (DEBUG) {
    runDebug();
  }
}
