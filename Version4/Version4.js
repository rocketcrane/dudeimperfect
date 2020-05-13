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
let tutorialPage = 0;

/*
 *  GAME STUFF
 */
let DEBUG = false;

let balls = [], walls = [], goal;
let iterations = 10;
const gravity = 0.3266;
let friction, slidingFriction, tolerance = 0.25;
let canFire = false, fireTimer = 0, swingTimer;
let minX, maxX, minY, maxY;
let bbBounce1, bbBounce2;
let win = false;
//let distance;
let level, score, lives;
let force;
let angle;
let fontsize;
const backgroundLength = 41;
let hooploc, distance, distanceG, percentDist, rimHeight, playerHeight;
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
  // Basketball
  imgBB = loadImage("assets/basketball/basketball.png");
  bbBg = loadImage("assets/basketball/bbBg.png");
  bbLvl1 = loadImage("assets/basketball/bbLvl1.png");
  bbLvl2 = loadImage("assets/basketball/bbLvl2.png");
  bbLvl3 = loadImage("assets/basketball/bbLvl3.png");
  bbLvl4 = loadImage("assets/basketball/bbLvl4.png");
  bbBgWin = loadImage("assets/basketball/bbBgWin.png");
  bbLaunch = loadImage("assets/basketball/bbLaunch.png");
  bbLaunchGrey = loadImage("assets/basketball/bbLaunchGrey.png");
  robotB = loadImage("assets/basketball/robotB.png");
  robotBShoot = loadImage("assets/basketball/robotBShoot.png");
  robotBStand = loadImage("assets/basketball/robotBStand.png");
  robotBWin = loadImage("assets/basketball/robotBWin.png");
  // Golf
  imgGB = loadImage("assets/golf/golfBall.png");
  gbBg = loadImage("assets/golf/gbBg.png");
  robotG = loadImage("assets/golf/robotG.png");
  robotGWin = loadImage("assets/golf/robotGWin.png");
  robotSwing1 = loadImage("assets/golf/robotSwing1.png");
  robotSwing2 = loadImage("assets/golf/robotSwing2.png");
  robotSwing3 = loadImage("assets/golf/robotSwing3.png");
  robotSwing4 = loadImage("assets/golf/robotSwing4.png");
  robotSwing5 = loadImage("assets/golf/robotSwing5.png");
  robotSwing6 = loadImage("assets/golf/robotSwing6.png");
  // Misc
  reset = loadImage("assets/misc/reset.png");
  resetGrey = loadImage("assets/misc/resetGrey.png");
  nextLevel = loadImage("assets/misc/nextLevel.png");
  star1 = loadImage("assets/misc/star1.png");
  star2 = loadImage("assets/misc/star2.png");
  star3 = loadImage("assets/misc/star3.png");
  soundFormats('mp3');
  bbBounce1 = loadSound('assets/basketball/bbBounce1');
  bbBounce2 = loadSound('assets/basketball/bbBounce2');
  font = loadFont('assets/firaCode.ttf');

  // Tutorial
  t1Image = loadImage("assets/tutorial/tutorial1.png");
  t2Image = loadImage("assets/tutorial/tutorial2.png");
  t3Image = loadImage("assets/tutorial/tutorial3.png");
  t4Image = loadImage("assets/tutorial/tutorial4.png");
  t5Image = loadImage("assets/tutorial/tutorial5.png");
  t6Image = loadImage("assets/tutorial/tutorial6.png");
  t7Image = loadImage("assets/tutorial/tutorial7.png");
  t8Image = loadImage("assets/tutorial/tutorial8.png");
  t9Image = loadImage("assets/tutorial/tutorial9.png");
  t10Image = loadImage("assets/tutorial/tutorial10.png");
  t11Image = loadImage("assets/tutorial/tutorial11.png");
  t12Image = loadImage("assets/tutorial/tutorial12.png");
  t13Image = loadImage("assets/tutorial/tutorial13.png");
  t14Image = loadImage("assets/tutorial/tutorial14.png");
  t15Image = loadImage("assets/tutorial/tutorial15.png");
  t16Image = loadImage("assets/tutorial/tutorial16.png");
  t17Image = loadImage("assets/tutorial/tutorial17.png");
  t18Image = loadImage("assets/tutorial/tutorial18.png");
  t19Image = loadImage("assets/tutorial/tutorial19.png");
}

function setup() {
  maxScale = calcScale();
  createCanvas(16 * maxScale, 9 * maxScale);
  imageMode(CENTER);
  angleMode(DEGREES);
  textSize(20);
  textAlign(CENTER);
  resizeImgs();
  updateScale();
  forceSlider = new Slider(width/2 - width/14, height/4, width/7, 0, 20, 1, false, false, false);
  angleSlider = new Slider(width/2 - width/14, height/4, width/7, 0, 90, 5, false, false, false);
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
      mouseX > (width/2.2 - 75) && mouseX < (width/2.2 + 75) && 
      mouseY > (height/1.08 - 75) && mouseY < (height/1.08 + 75)
      ) {
      tutorialPage --;
      if (tutorialPage < 0) {
        tutorialPage = 18;
      }
      tutorialShow(tutorialPage);
      //BRIAN YOUR CODE GOES HERE 
      //*SUGGESTION* Make another tab that contains the code of switching pngs. so final code can look like this
      //nextPage();
    }
    //Next Button
    if (
      mouseX > (width/1.83 - 75) && mouseX < (width/1.83 + 75) && 
      mouseY > (height/1.08 - 75) && mouseY < (height/1.08 + 75)
      ) {
      tutorialPage ++;
      if (tutorialPage > 18) {
        tutorialPage = 0;
      }
      tutorialShow(tutorialPage);
      //BRIAN YOUR CODE GOES HERE 
      //*SUGGESTION* Make another tab that contains the code of switching pngs. so final code can look like this
      //nextPage();
    }
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
    mouseX > (width/14 - 30) && mouseX < (width/14 + 30) && 
    mouseY > (height/1.08 - 30) && mouseY < (height/1.08 + 30)
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
  //if (
  //  mouseX > (width/2 - 150) && mouseX < (width/2 + 150) && 
  //  mouseY > (height/2 - 100) && mouseY < (height/2 + 100)
  //  ) {
  //  screenState = "Trickshot";
  //  newTrickshotGame(1);
  //}
  //Golf Mode Button
  if (
    mouseX > (width/2 - 150) && mouseX < (width/2 + 150) && 
    mouseY > (height*11/16 - 100) && mouseY < (height*11/16 + 100)
    ) {
    screenState = "Golf";
    newGolfGame(1);
  }
}
//-------------------------------------------
//Shoot Basketball
if (screenState == "Basketball") {
  //Home Button
  if (
    mouseX > (width/14 - 30) && mouseX < (width/14 + 30) && 
    mouseY > (height/1.08 - 30) && mouseY < (height/1.08 + 30)
    ) {
    screenState = "Main Menu";
  }
  if (mouseX > (width*5/8 - 50) && mouseX < (width*5/8 + 50) && mouseY > (height*6/16 - 50) && mouseY < (height*6/16 + 50)) {
    if (lives == 0) {
      newBasketballGame(level);
    } else if (canFire) {
      swingTimer = 130;
      canFire = false;
    } else if (win) {
      level++;
      newBasketballGame(level);
    }
  }
  //Next Level
  if (
    mouseX > (width*5/8 - 50) && mouseX < (width*5/8 + 50) && 
    mouseY > (height*7/8 - 50) && mouseY < (height*7/8 + 50)
    ) {
    if (win) {
      level++;
      newBasketballGame(level);
    }
  }
  //Reset Level (AFTER WIN)
  if (
    mouseX > (width*3/8 - 50) && mouseX < (width*3/8 + 50) && 
    mouseY > (height*7/8 - 50) && mouseY < (height*7/8 + 50)
    ) {
    if (win) {
      newBasketballGame(level);
    }
  }
}
//-------------------------------------------
// Shoot Golf ball
if (screenState == "Golf") {
  //Home Button
  if (
    mouseX > (width/14 - 30) && mouseX < (width/14 + 30) && 
    mouseY > (height/1.08 - 30) && mouseY < (height/1.08 + 30)
    ) {
    screenState = "Main Menu";
  }
  if (mouseX > (width*5/8 - 50) && mouseX < (width*5/8 + 50) && mouseY > (height*6/16 - 50) && mouseY < (height*6/16 + 50)) {
    if (lives == 0) {
      newGolfGame(level);
    } else if (canFire) {
      swingTimer = 130;
      canFire = false;
    } else if (win) {
      level++;
      newGolfGame(level);
    }
  }
  //Next Level
  if (
    mouseX > (width*5/8 - 50) && mouseX < (width*5/8 + 50) && 
    mouseY > (height*7/8 - 50) && mouseY < (height*7/8 + 50)
    ) {
    if (win) {
      level++;
      newGolfGame(level);
    }
  }
  //Reset Level (AFTER WIN)
  if (
    mouseX > (width*3/8 - 50) && mouseX < (width*3/8 + 50) && 
    mouseY > (height*7/8 - 50) && mouseY < (height*7/8 + 50)
    ) {
    if (win) {
      newGolfGame(level);
    }
  }
}
}

function mouseReleased() {
  clicking = false;
}

function keyPressed() {
  if (key === 'r') { //reset round
    DEBUG = !DEBUG;
  } else if (key === 'j') { //play sound
    bbBounce1.play();
  }
}
