/*
 * Dude Imperfect
 * 4/8/2020
 * Trickshot Heaven prototype for sprint 1
 */

// Constants
let gravity = -9.8;
let maxWidth;
let maxHeight;

// Variables
let ball;
let imgBasketball;
let canvas;

// For external media loading; happens before setup()
function preload() {
  imgBasketball = loadImage('assets/basketball.png');
}

function setup() {
  frameRate(60);
  imageMode(CENTER);
  textSize(32);
  //createCanvas(window.innerWidth, window.innerHeight); // inner dimensions for current screen size; obsolete
  maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);
  maxHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
  canvas = createCanvas(maxWidth, maxHeight);
  ball = new Ball(imgBasketball, 300, maxHeight - 200, 50, 15, 25);
  world = new World(ball, -0.7);
}

// Main function (not just for displaying)
function draw() {
  background(255);
  fill(0);
  text("Disclaimer: game is very much a WIP!", maxWidth/2 - 200, maxHeight/2 - 400);
  text("Press 'f' for fullscreen", maxWidth/2 - 200, maxHeight/2 - 100);
  text("The hoop is 24 meters away and 12.4 meters high", maxWidth/2 - 200, maxHeight/2);
  textSize(20);
  text("Launch Angle: 60°", maxWidth/2 - 200, maxHeight/2 + 50);
  text("Launch Force: 20 N", maxWidth/2 - 200, maxHeight/2 + 100);
  world.update();
}

function keyPressed() {
  if (key === 'f') {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}

// Triggers every time window is resized
function windowResized() {
  if (fullscreen()) {
    canvas.position(0, displayHeight - maxHeight);
  } else {
    canvas.position(0, (windowHeight - height) / 2);
  }
}
