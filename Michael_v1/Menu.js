function mainMenu() {
  clear();
  image(mainImage,displayWidth/2, displayHeight/2);
  fill(255);
  image(playButton,width/1.95, height/1.8);
  playButton.resize(150,150);
}


function playMenu() {
  clear();
  image(playImage1,width/2, height/2);
  image(orangeHome,displayWidth/18,displayHeight/1.235);
  image(storyMode,displayWidth/3.1, displayHeight/2.5);
  image(trickshotMode,displayWidth/3.1, displayHeight/1.5);
  
  fill(255, 150, 0);
  textFont('Aquire', 45);
  text("Choose Your Game Mode", displayWidth/2.7, displayHeight/7);
}

function tutorial(){
  clear();
  image(tutorialImage1,width/2, height/2);
  
  image(prevButton,width/2.2,height/1.08);
  prevButton.resize(80,80);
  image(nextButton,width/1.83,height/1.08);
  nextButton.resize(80,80);
  image(tutorialPlayButton,width/1.1,height/1.08);
  tutorialPlayButton.resize(100,100);
  image(tutorialHomeButton,width/14,height/1.08);
  tutorialHomeButton.resize(60,60);
}

function basketballGame() {
  clear();
  bbVisuals();
  bbCanFire();
  updateWorld();
  showButtons();
  
  textSize(20);
  text("Force (N)", width/2, height*28/32);
  forceSlider.move();
  forceSlider.display();
  text("Angle (°)", width/2, height*31/32);
  angleSlider.move();
  angleSlider.display();
  if (DEBUG) {
    debug();
  }
}

function trickshotMode(){}
function golfGame(){}
