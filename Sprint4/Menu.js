

function mainMenu() {
  clear();
  image(mainImage, width/2, height/2);
  //TITLE
  fill(0);
  textAlign(CENTER);
  textFont('Aquire', 80);
  text("Trickshot Heaven", displayWidth/2, displayHeight/7);
  
  //BUTTONS
  //play
  image(playButton,displayWidth/2, displayHeight/2);
  playButton.resize(150,150);
  //playButton.mousePressed();
  
  //help
  image(helpButton,width/2, height/1.29);
  helpButton.resize(150,150);
  
}

function playMenu() {
  clear();
  image(playImage,width/2, height/2);
  image(orangeHome,displayWidth/18,displayHeight/1.235);
  image(storyMode,displayWidth/3.1, displayHeight/2.5);
  image(trickshotMode,displayWidth/3.1, displayHeight/1.5);
  
  fill(255, 150, 0);
  textFont('Aquire', 45);
  text("Choose Your Game Mode", displayWidth/2.7, displayHeight/7);
}

function helpMenu() {
  clear();
  image(helpBackground,width/2, height/2);
  image(helpScreen,width/2, height/2);
  image(whiteHome,displayWidth/18,displayHeight/1.235);
  
}

function storyMode(){

}

function trickshotMode() {

}

function hideBasketballGameButtons(){
  BasketballGame.enter.hide();
  BasketballGame.reset.hide();
  BasketballGame.nextLevel.hide();
  BasketballGame.debug.hide();
}
 
