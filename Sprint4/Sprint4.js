/***********************TRICK SHOT HEAVEN***********************/
/***************************************************************/
// May 11th 3:00OPM
// by Jason Han, Brian Lee, Michael Averin, Lingxiu Zhang
let screenState = 0;

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
  //Main Menu
  mainImage = loadImage('assets/Sports.jpg');
  playButton = loadImage('assets/playButton.jpg');
  helpButton = loadImage('assets/helpIcon.png');
  //Play Menu
  playImage = loadImage('assets/playScreen.jpg');
  orangeHome = loadImage('assets/orangeHome1.png');
  storyMode = loadImage('assets/storyMode.png');
  trickshotMode = loadImage('assets/trickshotMode.png');
  //Help Menu
  helpScreen = loadImage('assets/tutorialScreen.jpg');
  helpBackground = loadImage('assets/helpBackground1.jpg');
  whiteHome = loadImage('assets/whiteHome.png');
  
  
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
  TRICKSHOT_GAME = new TrickShotGame(15); // Begins
  // INITIALZE MENU
  imageMode(CENTER);
  maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);
  maxHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
  canvas = createCanvas(maxWidth, maxHeight);
  mainImage.resize(displayWidth, displayHeight);
  playImage.resize(displayWidth, displayHeight);
  helpBackground.resize(displayWidth, displayHeight);
  
  playButton.resize(150,150);
  helpButton.resize(150,150);
  orangeHome.resize(60,60);
  whiteHome.resize(60,60);
  storyMode.resize(250,150);
  trickshotMode.resize(250,150);
}


function draw() {
  if (screenState == 0) {
    
    mainMenu();
  } else if (screenState == 1) {
    
    playMenu();
  } else if (screenState == 2) {
   
    helpMenu();
  } else if (screenState == 3) {
    // GAME
  FONTSIZECOEF = width*0.001;
  BASKETBALL_GAME.update();
  } else if (screenState == 4) {
    FONTSIZECOEF = width*0.001;
    TRICKSHOT_GAME.update();
  } 
  

  // DEBUG MODE
  if (DEBUG) {
    runDebug();
  }
}

function keyPressed() {
  if (key === 'f') { 
    var fs = fullscreen();
    fullscreen(!fs);
  }
  if (key === 'q') {
    screenState = 0;
  }
}

//THIS FUNCTION IS ESSENTIAL TO MAKING IMAGE CLICKING WORK
function mousePressed() {
  //***** HOME SCREEN BUTTONS ******//
  if (screenState == 0){
  //Play Button
    if(       //
    mouseX > (width/2 - 75) && mouseX < (width/2 + 75) && 
    mouseY > (height/2 - 75) && mouseY < (height/2 + 75)
    ){
      screenState = 1; 
    }
  //Help Button
    if( mouseX > (width/2 - 75) && mouseX < (width/2 + 75) && 
        mouseY > (height/1.29 - 75) && mouseY < (height/1.29 + 75) ){
      screenState = 2; 
    }
  }
  //***** PLAY SCREEN BUTTONS ******//
  if (screenState == 1){
    //Home Button
    if(       
    mouseX > (displayWidth/18 - 30) && mouseX < (displayWidth/18 + 30) && 
    mouseY > (displayHeight/1.235 - 30) && mouseY < (displayHeight/1.235 + 30)
  ){
    screenState = 0; 
  }
  //Story Mode Button
  if(       
    mouseX > (displayWidth/3.1 - 125) && mouseX < (displayWidth/3.1 + 125) && 
    mouseY > (displayHeight/2.5 - 75) && mouseY < (displayHeight/2.5 + 75)
  ){
    screenState = 3; 
  }
  //Story Mode Button
  if(       
    mouseX > (displayWidth/3.1 - 125) && mouseX < (displayWidth/3.1 + 125) && 
    mouseY > (displayHeight/1.5 - 75) && mouseY < (displayHeight/1.5 + 75)
  ){
    screenState = 4; 
  }
}
  //***** HELP SCREEN BUTTONS ******//
  if (screenState == 2){
    //Home Button
    if(       
    mouseX > (displayWidth/18 - 30) && mouseX < (displayWidth/18 + 30) && 
    mouseY > (displayHeight/1.235 - 30) && mouseY < (displayHeight/1.235 + 30)
  ){
    screenState = 0; 
  }
  //***** GAME SCREEN BUTTONS ******//
  

}
}
