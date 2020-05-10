let screenState = 0;

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
}

function setup() {
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

// Triggers every time window is resized
function windowResized() {
  if (fullscreen()) {
    canvas.position(0, displayHeight - maxHeight);
  } else {
    canvas.position(0, (windowHeight - height) / 2);
  }
}

function draw() {
  if (screenState == 0) {
    mainMenu();
  } else if (screenState == 1) {
    playMenu();
  } else if (screenState == 2) {
    helpMenu();
  } else if (screenState == 3) {
    storyMode();
  } else if (screenState == 4) {
    trickshotMode();
  } 
}

function keyPressed() {
  if (key === 'f') { 
    var fs = fullscreen();
    fullscreen(!fs);
  }
  if (key === '0') {
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
