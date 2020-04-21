/*
 *  Jason Han 4/20/2020 
 *  Sprint 3
 */

// variables
let world;
let unit; // String representing unit of length
let scale; // how many pixels long one unit is
let floor, playerHeight, ballSize, ballHeight, hoopSize, hoopHeight, rimHeight; // various lengths
let isMoving = false;
let fps;

function preload() {
  imgBasketball = loadImage('assets/basketball.png');
  imgBasketballPlayer = loadImage('assets/person_basketball.png');
  imgBasketballHoop = loadImage('assets/basketball_hoop.png');
}

function setup() {
  // Settings
  maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);
  maxHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
  canvas = createCanvas(maxWidth, maxHeight);
  frameSinceStart = 0;
  fps = 60;
  frameRate(fps);
  imageMode(CENTER);

  // Scale and lengths
  unit = "ft";
  scale = ((height/3.213 + height/2.5) - (height/3.213)/1.7)/10;
  floor = height - height/8;
  playerHeight = canonicalToActual(6);
  ballSize = canonicalToActual(1);
  ballHeight = playerHeight + canonicalToActual(0.1);
  hoopSize = canonicalToActual(5);
  hoopHeight = hoopSize + canonicalToActual(8);
  rimHeight = hoopHeight - hoopSize/1.75;

  // initialize ball
  var force = 0;
  var angle = 0;
  var ball = new Ball(imgBasketball, width/8, ballHeight, ballSize, 1, force, angle);
  // initialize world
  var x = 20;
  var y = 15;
  world = new World(x, y, -9.8, 1, ball);

  // input
  forceInput = createInput();
  forceInput.size(100, 50);
  forceInput.style('font-size', '24px');
  angleInput = createInput();
  angleInput.size(100, 50);
  angleInput.style('font-size', '24px');
  enter = createButton('Enter');
  enter.size(100, 50);
  enter.mousePressed(newAttempt);
  reset = createButton('Reset');
  reset.size(100, 50);
  reset.mousePressed(resetAttempt);
}

function draw() {
  fill(0);
  background(255);
  
  // input
  forceInput.position(width/12, height/8);
  angleInput.position(width/12, height/4);
  enter.position(width/6, height/4 - height/12);
  reset.position(enter.x + width/16, enter.y);
  textSize(24);
  textAlign(LEFT);
  text("Force:", width/12, height/8 - height/32);
  text("Angle:", width/12, height/4 - height/32);

  // Floor
  fill(0);
  strokeWeight(1);
  line(0, floor, width, floor);
  strokeWeight(0);
  drawHorizontalDist(floor + 20, width/8, width - width/8);

  // Basketball + player
  imgBasketball.resize(0, ballSize);
  imgBasketballPlayer.resize(0, playerHeight);
  drawImage(imgBasketballPlayer, width/8, playerHeight);
  world.proj.display();
  drawVerticalDist(width/5, floor, floor - ballHeight);

  // Hoop
  imgBasketballHoop.resize(0, hoopSize);
  drawImage(imgBasketballHoop, width - width/8, hoopHeight);
  drawVerticalDist(width - width/4, floor, floor - rimHeight);

  displayVectors();
  if (isMoving) {
    world.proj.move();
  }

  textAlign(CENTER);
  textSize(60);
  text("Three-pointer", width/2, height/16);
}

function newAttempt() {
  if (isMoving) {
    return;
  }
  world.proj = new Ball(imgBasketball, width/8, ballHeight, ballSize, 1, forceInput.value(), angleInput.value());
  isMoving = true;
}

function resetAttempt() {
  if (isMoving) {
    isMoving = false;
  }
  world.proj = new Ball(imgBasketball, width/8, ballHeight, ballSize, 1, 0, 0);
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
  //if (key === 'f') {
  //  var fs = fullscreen();
  //  fullscreen(!fs);
  //}
}
