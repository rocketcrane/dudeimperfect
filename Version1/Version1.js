/*
 *                      Trickshot Heaven
 *
 *    Jason Han, Michael Averin, Brian Lee, and Lingxiu Zhang
 */

/*
 *  UI STUFF
 */
let screenState = "Main Menu";
let clicking;
let forceSlider, angleSlider;
let font;

/*
 *  GAME STUFF
 */
const DEBUG = true;

let balls = [], walls = [], goal;
let iterations = 10;
const gravity = 0.3266;
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
  //Main Menu
  mainImage = loadImage('assets/Menu_MainMenu.png');
  playButton = loadImage('assets/Menu_MainPlayPassive.png');
  //Tutorial Menu
  tutorialImage = loadImage('assets/Menu_tutorialScreen.jpg');
  tutorialImage1 = loadImage('assets/Menu_tutorialScreen1.jpg');
  prevButton = loadImage('assets/Menu_prevButton.png');
  nextButton = loadImage('assets/Menu_nextButton.png');
  tutorialPlayButton = loadImage('assets/Menu_whitePlayButton.png');
  tutorialHomeButton = loadImage('assets/Menu_whiteHome.png');
  //Game Mode Select Menu
  playImage = loadImage('assets/Menu_playScreen.jpg');
  playImage1 = loadImage('assets/Menu_playScreen1.jpg');
  orangeHome = loadImage('assets/Menu_orangeHome1.png');
  storyMode = loadImage('assets/Menu_storyMode.png');
  trickshotMode = loadImage('assets/Menu_trickshotMode.png');
  basketballModePassive = loadImage('assets/Menu_BasketballModePassive.png');
  golfModePassive = loadImage('assets/Menu_GolfModePassive.png');
  trickshotModePassive = loadImage('assets/Menu_TrickshotModePassive.png');
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
  font = loadFont('assets/Aquire.otf');
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

  forceSlider = new Slider(width/2 - width/14, height/4, width/7, 0, 20, 1, false, false, false);
  //angleSlider = new Slider(width/2 - width/14, height/4, width/7, -90, 90, 10, false, false, false);
}

function draw() {
  if (screenState == "Main Menu") {
    mainMenu();
  } else if (screenState == "Play Menu") {
    playMenu();
  } else if (screenState == "Tutorial") {
    tutorial();
  } else if (screenState == "Basketball") {
    basketball();
  } else if (screenState == "Trickshot") {
    trickshot();
  } else if (screenState == "Golf") {
    golf();
  }
}

function mousePressed() {
  clicking = true;
  //***** MAIN MENU BUTTONS ******//
  if (screenState == "Main Menu") {
    //Play Button
    if (
      mouseX > (width/1.95 - 75) && mouseX < (width/1.95 + 75) && 
      mouseY > (height/1.8 - 75) && mouseY < (height/1.8 + 75)
      ) {
      screenState = "Tutorial";
    }
  }
  //----------------------------------------------------------------
  //***** TUTORIAL BUTTONS ******//
  if (screenState == "Tutorial") {
    //Home Button
    if (
      mouseX > (width/14 - 30) && mouseX < (width/14 + 30) && 
      mouseY > (height/1.08 - 30) && mouseY < (height/1.08 + 30)
      ) {
      screenState = "Main Menu";
    }
    //Prev Button
    if (
      mouseX > (width/2 - 75) && mouseX < (width/2 + 75) && 
      mouseY > (height/1.5 - 75) && mouseY < (height/1.5 + 75)
      ) {
      //BRIAN YOUR CODE GOES HERE 
      //*SUGGESTION* Make another tab that contains the code of switching pngs. so final code can look like this
      //nextPage();
    }
    //Next Button
    if (
      mouseX > (width/2 - 75) && mouseX < (width/2 + 75) && 
      mouseY > (height/1.5 - 75) && mouseY < (height/1.5 + 75)
      ) {
      //BRIAN YOUR CODE GOES HERE 
      //*SUGGESTION* Make another tab that contains the code of switching pngs. so final code can look like this
      //nextPage();
    }
    //Play Button
    if (
      mouseX > (width/1.1 - 50) && mouseX < (width/1.1 + 50) && 
      mouseY > (height/1.08 - 50) && mouseY < (height/1.08 + 50)
      ) {
      screenState = "Play Menu";
    }
  }
  //----------------------------------------------------------------------
  if (screenState == "Play Menu") {
    //Home Button
    if (
      mouseX > (displayWidth/18 - 30) && mouseX < (displayWidth/18 + 30) && 
      mouseY > (displayHeight/1.235 - 30) && mouseY < (displayHeight/1.235 + 30)
      ) {
      screenState = "Main Menu";
    }
    //Basketball Mode Button
    if (
      mouseX > (width/2 - 150) && mouseX < (width/2 + 150) && 
      mouseY > (height*5/16 - 100) && mouseY < (height*5/16 + 100)
      ) {
      screenState = "Basketball";
      newBasketballGame(1);
    }
    //Trickshot Mode Button
    if (
      mouseX > (displayWidth/1.4 - 150) && mouseX < (displayWidth/1.4 + 150) && 
      mouseY > (displayHeight/2.0 - 100) && mouseY < (displayHeight/2.0 + 100)
      ) {
      screenState = "Trickshot";
      newTrickshotGame();
    }
    //Golf Mode Button
    if (
      mouseX > (displayWidth/1.34 - 150) && mouseX < (displayWidth/1.34 + 150) && 
      mouseY > (displayHeight/1.5 - 100) && mouseY < (displayHeight/1.5 + 100)
      ) {
      screenState = "Golf";
      newGolfGame();
    }
  }
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
