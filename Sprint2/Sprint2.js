/*
 *  Jason Han 4/20/2020 
 *  Sprint 2
 */

// variables
let ORIGIN, scale_to_screen; // calibrate scale game on screen
let frameSinceStart, show, sec, bucket; // time keeping
let wallpaper;
let world;

function preload() {
  imgBasketball = loadImage('assets/basketball.png');
}

function setup() {
  // Settings
  imageMode(CENTER);

  // Display
  maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);
  maxHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
  canvas = createCanvas(maxWidth, maxHeight);
  wallpaper = 'rgb(0%,0%,0%)'; 
  colorMode(RGB, 255);
  background(wallpaper); //black
  frameSinceStart = 0;
  frameRate(60);

  // time keeping
  sec = 0; // increases by 1/30 every 1/30s
  show = sec; // for showing integer 'sec', begins count from 0
  bucket = 0; // the moment the shot is made or reached the hoop distance

  // initialize ball
  var force = null;
  var angle = 60;
  var ball = new Ball(imgBasketball, 0, 0, 20, 1, force, angle);
  // initialize world
  var x = 20;
  var y = 15;
  world = new World(x, y, -9.8, 1, ball);

  // for positioning, scaling screen presentation
  ORIGIN = [width/4, height - height/3];
  scale_to_screen = 20; 
  forceInput = createInput();
  forceInput.position(10, 80);
  forceInput.size(30);
  button = createButton('Set my power');
  button.position(forceInput.x+forceInput.width+5, 80);
  button.mousePressed(newForce);
}

function draw() {
  colorMode(RGB, 255);
  background(wallpaper); // repaint
  fill(255); // everything is white lined
  gameDisplay();
}

function newForce() {
  world.proj.force = forceInput.value();
  frameSinceStart = frameCount;
}

/*
 *  SCREEN/DISPLAY
 */

// Triggers every time window is resized
function windowResized() {
  if (fullscreen()) {
    canvas.position(0, displayHeight - maxHeight);
  } else {
    canvas.position(0, (windowHeight - height) / 2);
  }
}

function keyPressed() {
  if (key === 'f') {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}
