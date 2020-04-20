/*
 *  Jason Han 4/20/2020 
 *  Sprint 3
 */

// variables
let ORIGIN, scale_to_screen; // calibrate scale game on screen
let frameSinceStart, show, sec, bucket; // time keeping
let wallpaper;
let world;
let unit; // String representing unit of length
let scale; // how many pixels long one unit is
let floor, playerHeight, ballSize, ballHeight, hoopSize, hoopHeight, rimHeight; // various lengths

function preload() {
  imgBasketball = loadImage('assets/basketball.png');
  imgBasketball2 = loadImage('assets/basketball.png');
  imgBasketballPlayer = loadImage('assets/person_basketball.png');
  imgBasketballHoop = loadImage('assets/basketball_hoop.png');
}

function setup() {
  // Settings
  maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);
  maxHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
  canvas = createCanvas(maxWidth, maxHeight);
  wallpaper = color(255, 255, 255);
  colorMode(RGB, 255);
  background(wallpaper); //black
  frameSinceStart = 0;
  frameRate(60);
  imageMode(CENTER);
  
  // Scale and lengths
  unit = "ft";
  floor = height - height/8;
  hoopSize = height/3.213;
  hoopHeight = hoopSize + height/2.5;
  rimHeight = hoopHeight - (height/3.213)/1.7;
  useAsHeightReference(rimHeight, 10);
  //playerHeight = height/2.128;
  playerHeight = canonicalToActual(7);
  //ballHeight = playerHeight + playerHeight/10;
  ballSize = canonicalToActual(1);
  ballHeight = playerHeight/1.15 + ballSize;

  // time keeping
  sec = 0; // increases by 1/30 every 1/30s
  show = sec; // for showing integer 'sec', begins count from 0
  bucket = 0; // the moment the shot is made or reached the hoop distance

  // initialize ball
  var diameter = height/10;
  var force = null;
  var angle = 60;
  var ball = new Ball(imgBasketball2, 0, 0, diameter, 1, force, angle);
  // initialize world
  var x = 20;
  var y = 15;
  world = new World(x, y, -9.8, 1, ball);

  // for positioning, scaling screen presentation
  ORIGIN = [width/8, floor];
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

  // Floor
  fill(0);
  line(0, floor, width, floor);

  // Basketball + player
  imgBasketball.resize(0, ballSize);
  imgBasketballPlayer.resize(0, playerHeight);
  drawImage(imgBasketballPlayer, width/8, playerHeight);
  drawImage(imgBasketball, width/8, ballHeight);
  drawDistance(width/5, floor, floor - ballHeight);

  // Hoop
  imgBasketballHoop.resize(0, hoopSize);
  drawImage(imgBasketballHoop, width - width/8, hoopHeight);
  drawDistance(width - width/4, floor, floor - rimHeight);
  
  drawDistance(width/2, floor, floor - scale); // DEBUG USE: how long is one unit?

  gameDisplay();
}

function drawImage(img, x, heightInPixels) {
  imageMode(CORNER);
  image(img, x - img.width/2, floor - heightInPixels);
  imageMode(CENTER);
}

// Draws a vertical height arrow with length + units label
function drawDistance(x, y1, y2) {
  line(x - 5, y1, x + 5, y1);
  line(x, y1, x, y2);
  line(x - 5, y2, x + 5, y2);
  textSize(24);
  textAlign(LEFT, CENTER);
  text(getLength(y1, y2) + " " + unit, x + 20, max(y1, y2) - abs(y2 - y1)/2);
}

function getLength(y1, y2) {
  return round(abs(y2 - y1)/scale);
}

function useAsHeightReference(heightInPixels, canonicalHeight) {
  scale = heightInPixels / canonicalHeight;
}

function canonicalToActual(canonicalHeight) {
  return canonicalHeight * scale;
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
