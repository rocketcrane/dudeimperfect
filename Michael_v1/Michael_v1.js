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

/*
 *  GAME STUFF
 */
const DEBUG = false;

let balls = [], walls = [], goal;
let iterations = 10;
const gravity = 0.25;
let friction, slidingFriction, tolerance = 0.25;
let canFire = false, fireTimer = 0;
let minX, maxX, minY, maxY;
let bbBounce1, bbBounce2;
let win = false;
let distance;
let level, score, lives;
let force;
let angle;

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
  //Play Menu
  playImage = loadImage('assets/Menu_playScreen.jpg');
  playImage1 = loadImage('assets/Menu_playScreen1.jpg');
  orangeHome = loadImage('assets/Menu_orangeHome1.png');
  storyMode = loadImage('assets/Menu_storyMode.png');
  trickshotMode = loadImage('assets/Menu_trickshotMode.png');
  
  //Basketball Game
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
  
  forceSlider = new Slider(width/2 - width/14, height*27/32, width/7, 0, 200, 5, false, false, false);
  angleSlider = new Slider(width/2 - width/14, height*30/32, width/7, -90, 90, 10, false, false, false);
  
  tutorialImage1.resize(displayWidth, displayHeight);
  playImage1.resize(displayWidth, displayHeight);
  mainImage.resize(displayWidth, displayHeight);
  
  orangeHome.resize(60,60);
  storyMode.resize(250,150);
  trickshotMode.resize(250,150);
}

function draw() {
  background(255);
  if (screenState == "Main Menu") {
    mainMenu();
  } else if (screenState == "Play Menu") {
    playMenu();
  }else if (screenState == "Tutorial") {
    tutorial();
  }else if (screenState == "Basketball") {
    basketballGame();
  }else if (screenState == "Trickshot") {
    trickshotMode();
  }else if (screenState == "Golf") {
    golfGame();
  }
}

function mousePressed() {
  clicking = true;
   //***** MAIN MENU BUTTONS ******//
  if (screenState == "Main Menu"){
  //Play Button
    if(       //
    mouseX > (width/1.95 - 75) && mouseX < (width/1.95 + 75) && 
    mouseY > (height/1.8 - 75) && mouseY < (height/1.8 + 75)
    ){
      screenState = "Tutorial"; 
    }
  }
  //----------------------------------------------------------------
  //***** TUTORIAL BUTTONS ******//
  if (screenState == "Tutorial"){
    //Home Button
    if(       //
    mouseX > (width/14 - 30) && mouseX < (width/14 + 30) && 
    mouseY > (height/1.08 - 30) && mouseY < (height/1.08 + 30)
    ){
      screenState = "Main Menu"; 
    }
    //Prev Button
    if(       //
    mouseX > (width/2 - 75) && mouseX < (width/2 + 75) && 
    mouseY > (height/1.5 - 75) && mouseY < (height/1.5 + 75)
    ){
      //BRIAN YOUR CODE GOES HERE 
      //*SUGGESTION* Make another tab that contains the code of switching pngs. so final code can look like this
      //nextPage();
    }
    //Next Button
    if(       //
    mouseX > (width/2 - 75) && mouseX < (width/2 + 75) && 
    mouseY > (height/1.5 - 75) && mouseY < (height/1.5 + 75)
    ){
      //BRIAN YOUR CODE GOES HERE 
      //*SUGGESTION* Make another tab that contains the code of switching pngs. so final code can look like this
      //nextPage();
    }
    //Play Button
    if(       //
    mouseX > (width/1.1 - 50) && mouseX < (width/1.1 + 50) && 
    mouseY > (height/1.08 - 50) && mouseY < (height/1.08 + 50)
    ){
      screenState = "Play Menu"; 
    }
  }
  //----------------------------------------------------------------------
  if (screenState == "Play Menu"){
    //Home Button
    if(       //
    mouseX > (displayWidth/18 - 30) && mouseX < (displayWidth/18 + 30) && 
    mouseY > (displayHeight/1.235 - 30) && mouseY < (displayHeight/1.235 + 30)
    ){
      screenState = "Main Menu"; 
    }
}
}

function mouseReleased() {
  clicking = false;
}

function keyPressed() {
 
  if (key === 'f') {
    if (canFire) {
      shootBB();
    } else if (win) {
      level++;
      newBasketballGame(level);
    }
  } 
  if (key === 'r') {
    if (!win) {
      newBasketballGame(level);
    }
  } else if (key === 'g') {
    newBasketballGame(1);
  } else if (key === 'j') {
    bbBounce1.play();
  } else if (key === 't') {
    level++;
    newBasketballGame(level);
  }
}
