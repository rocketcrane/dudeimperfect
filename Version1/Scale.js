function calcScale() {
  maxWidthScale = Math.floor(window.innerWidth/16); 
  maxHeightScale = Math.floor(window.innerHeight/9);
  return min(maxWidthScale, maxHeightScale);
}

function windowResized() {
  maxScale = calcScale();
  resizeCanvas(16 * maxScale, 9 * maxScale);
  minX = width/32;
  maxX = width * 31/32;
  minY = -width/4;
  maxY = height * 7/8;
  resizeImgs();

  if (walls[0]) {
    for (let i = 0; i < walls.length; i++) {
      walls[i].x1 = width * walls[i].x1Scale;
      walls[i].y1 = height * walls[i].y1Scale;
      walls[i].x2 = width * walls[i].x2Scale;
      walls[i].y2 = height * walls[i].y2Scale;
      walls[i].w = walls[i].x2 - walls[i].x1;
      walls[i].h = walls[i].y2 - walls[i].y1;
    }
  }
  if (goal != null) {
    goal.x1 = width * goal.x1Scale;
    goal.y1 = height * goal.y1Scale;
    goal.x2 = width * goal.x2Scale;
    goal.y2 = height * goal.y2Scale;
    goal.w = goal.x2 - goal.x1;
    goal.h = goal.y2 - goal.y1;
  }
  
  forceSlider = new Slider(width/2 - width/14, height*30/32, width/7, -90, 90, 10, false, false, false);
}

function resizeImgs() {
  imgBB.resize(height*10/189, height*10/189);
  imgGB.resize(height*4/189, height*4/189);
  bbBg.resize(width, height);
  bbLvl1.resize(width/3, height/3);
  bbLvl2.resize(width/3, height/3);
  bbLvl3.resize(width/3, height/3);
  bbLvl4.resize(width/3, height/3);
  bbBgWin.resize(width/3, height/3);
  bbLaunch.resize(width/16, 0);
  bbLaunchGrey.resize(width/16, 0);
  reset.resize(width/14, 0);
  resetGrey.resize(width/12, height/6);
  nextLevel.resize(width/12, height/6);
  star1.resize(width/6, height/8);
  star2.resize(width/6, height/8);
  star3.resize(width/6, height/8);
  
  //Menu Items
  //IMAGE INITIALIZATIONS
  tutorialImage1.resize(displayWidth, displayHeight);
  playImage1.resize(displayWidth, displayHeight);
  mainImage.resize(displayWidth, displayHeight);
  playButton.resize(150,150);
  
  orangeHome.resize(60,60);
  storyMode.resize(250,150);
  trickshotMode.resize(250,150);
  
  basketballModePassive.resize(300,200);
  trickshotModePassive.resize(300,200);
  golfModePassive.resize(300,200);
  
  //Tutorial
  prevButton.resize(80,80);
  nextButton.resize(80,80);
  tutorialPlayButton.resize(100,100);
  tutorialHomeButton.resize(60,60);
}

function updateScale(){
  hooploc = width * 27 / 32; // hoop location consistent with screensize
  distance = width * percentDist; // shot distance depends on screensize & level; small screen + free throws having the shortest, large screen + half court the longest
  roboloc = hooploc - distance; // canonical (0, )
  floor = height * 7/8; // canonical (, 0)
  
  useAsPixelReference(width, backgroundLength, 3/8*height, 3); // calculate scalar coefficients for translating actual & canonical (pixel & real)
  
  // calculate item sizes based on their real-world
  rimHeight = canonicalToActual(3, VSCALE);
  //this.PLAYERWIDTH = canonicalToActual(1.5, HSCALE);
  //this.PLAYERHEIGHT = canonicalToActual(1.8, VSCALE);
  //this.BALLSIZE = canonicalToActual(1, HSCALE);
  playerHeight = canonicalToActual(1.8, VSCALE);
}

function useAsPixelReference(lengthInPixels, canonicalLength, heightInPixels, canonicalHeight) {
  HSCALE = lengthInPixels / canonicalLength;
  VSCALE = heightInPixels / canonicalHeight;
}

// draws a vertical height arrow with length + units label
function drawVerticalDist(x, y1, y2) {
  strokeWeight(1);
  stroke(100, 200, 255);
  line(x - 5, y1, x + 5, y1); // top serif
  line(x, y1, x, y2); // arrow body
  line(x - 5, y2, x + 5, y2); // do we need a bottom serif?
  strokeWeight(0);
  textSize(24*fontsize);
  textAlign(LEFT, CENTER);
  fill(100, 200, 255);
  text(getLength(y1, y2, VSCALE) + " m", x - 50 , max(y1, y2) - abs(y2 - y1)/2); // show distance string
}

//--------------------------------------
// draws a horizontal distance arrow with length + units label
function drawHorizontalDist(y, x1, x2) {
  strokeWeight(1);
  stroke(100, 200, 255);
  line(x1, y - 5, x1, y + 5); // left serif
  line(x1, y, x2, y); // arrow body
  line(x2, y - 5, x2, y + 5); // right serif
  strokeWeight(0);
  textSize(24*fontsize);
  textAlign(CENTER, CENTER);
  fill(100, 200, 255);
  text(getLength(x1, x2, HSCALE) + " m", max(x1, x2) - abs(x2 - x1)/2, y + 20); // show distance string
}

function getLength(d1, d2, SCALE) {
  return nf(abs(d2 - d1)/SCALE, 0, 2); // nf(nums, left, right) turns numbers to strings
}

//--------------------------------------
// converts real world size to onscreen size
// canonical = real world size, actual = pixel size onscreen
function canonicalToActual(canonical, SCALE) {
  return canonical * SCALE;
}

//--------------------------------------
// converts pixel size to real world size
// canonical = real world size, actual = pixel size onscreen
function actualToCanonical(actual, SCALE) {
  return actual / SCALE;
}
