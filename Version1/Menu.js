function mainMenu() {
  clear();
  image(mainImage,displayWidth/2, displayHeight/2);
  fill(255);
  image(playButton,width/1.95, height/1.8);
  
}


function playMenu() {
  clear();
  image(playImage1,width/2, height/2);
  image(orangeHome,displayWidth/18,displayHeight/1.235);

  
  image(basketballModePassive,displayWidth/1.4, displayHeight/3.0);
  image(trickshotModePassive,displayWidth/1.4, displayHeight/2.0);
  image(golfModePassive,displayWidth/1.34, displayHeight/1.5);
  
  
  
  
  fill(255, 0, 0);
  textFont('Aquire', 45);
  text("Choose Your Game Mode", displayWidth/2, displayHeight/7);
}

function tutorial(){
  clear();
  image(tutorialImage1,width/2, height/2);
  image(prevButton,width/2.2,height/1.08);
  image(nextButton,width/1.83,height/1.08);
  image(tutorialPlayButton,width/1.1,height/1.08);
  image(tutorialHomeButton,width/14,height/1.08);
  noStroke();
  fill(255);
  rectMode(CENTER);
  c = color(255);
  c.setAlpha(120);
  fill(c);
  rect(width/2,height/2,750,500);
  stroke(51);
}

function basketballGame() {
  fontsize = width*0.001;
  bbVisuals();
  bbCanFire();
  updateWorld();
  showButtons();
    
  textSize(20);
  text("Force (N)", width/2, height*5/16);
  strokeWeight(2);
  forceSlider.move();
  forceSlider.display();
  //text("Angle (°)", width/2, height*31/32);
  //angleSlider.move();
  //angleSlider.display();
  strokeWeight(0);
  if (DEBUG) {
    debug();
  }
}

function trickshotMode(){}
function golfGame(){}
