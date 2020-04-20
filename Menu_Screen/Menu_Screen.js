let button1, button2, title;
let col;
let mainImage,helpImage;
let screenState = 0;

function preload() {
  mainImage = loadImage('assets/MainBackground.jpg');
  helpImage = loadImage('assets/helpImage2.jpg');
  logo = loadImage('assets/Logo.png');
  //font = loadFont('assets/AquireBold-8Ma60');
  
}

function setup() {
  maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);
  maxHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
  canvas = createCanvas(maxWidth, maxHeight);
  background(125);
  
  //PLAY BUTTON
  col = color(RGB,25, 23, 200, 180);
  playButton = createButton('Play');
  playButton.style('background-color', col);
  playButton.position(displayWidth/2, displayHeight/3);
  playButton.size(200/1.2,50/1.2);
  playButton.center('horizontal');
  playButton.style('font-size','23px');
  
  //HELP BUTTON
  helpButton = createButton('Help');
  helpButton.style('background-color', col);
  helpButton.position(displayWidth/2, displayHeight/2.2);
  helpButton.size(200/1.2,50/1.2);
  helpButton.center('horizontal');
  helpButton.style('font-size','23px');
}


// Triggers every time window is resized
function windowResized() {
  if (fullscreen()) {
    canvas.position(0, displayHeight - maxHeight);
  } else {
    canvas.position(0, (windowHeight - height) / 2);
  }
}

/*function imageResized(){
  if(fullscreen()){
    mainImage.resize(0,displayHeight - maxHeight);
  } else {
    mainImage.resize(0,(windowHeight - height) /2);
  }
}*/

function draw() {
  
  
  
  
  image(mainImage,0,0);
  mainImage.resize(width,height);
  
  text("Trickshot Heaven",displayWidth/2,displayHeight/7);
  textFont('Aquire',80);
  textAlign(CENTER);
  
  
  
  playButton.mousePressed(playState);
  helpButton.mousePressed(helpState);
   
  //PLAY STATE
  if (screenState == 1){
    clear();
    hideButtons();
    background(0,255,0);
    
    fill(0);
    textSize(20);
    text('Pending Gameplay Connectivity',525,30);
    text('Press "1" to go back to main menu',525,100);
    
  }
  //HELP STATE
  if (screenState == 2){
    clear();
    hideButtons();
    image(helpImage,0,0);
    helpImage.resize(width,height);
    //TEXT TO BE ADDED
    image(helpImage,0,0);
    helpImage.resize(width,height);
    
  }

}

function keyPressed() {
  if (key === 'f') {
    var fs = fullscreen();
    fullscreen(!fs);
  }
  if(key == '1'){
      screenState = 0;
      showButtons();
    }
}
