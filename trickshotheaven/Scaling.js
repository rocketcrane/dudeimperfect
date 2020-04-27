/*
 *  SCREEN/DISPLAY SCALING
 */

//--------------------------------------
// Triggers every time window is resized
function windowResized() {
  widthScale = Math.floor(window.innerWidth/16);
  heightScale = Math.floor(window.innerHeight/9);
  minScale = min(widthScale, heightScale);
  resizeCanvas(16 * minScale, 9 * minScale);
}

//--------------------------------------
// rescales world and all objects inside it
function rescale() {
  SCALE = ((height/3.213 + height/2.5) - (height/3.213)/1.7)/10; // numbers that work, DO NOT TOUCH
  SCALE /= 1;
  FLOOR = height * 7/8;
  
  // calculate size of objects based on their real-world size in meters
  playerWidth = canonicalToActual(0.6);
  PLAYERHEIGHT = canonicalToActual(1.8);
  BALLSIZE = canonicalToActual(0.3);
  BALLHEIGHT = PLAYERHEIGHT + canonicalToActual(0.1);
  HOOPSIZE = canonicalToActual(1.5);
  HOOPHEIGHT = HOOPSIZE + canonicalToActual(2.4);
  RIMHEIGHT = HOOPHEIGHT - HOOPSIZE/1.75;
  
  // resize objects based on their new size
  imgBasketball.resize(BALLSIZE, BALLSIZE);
  imgBasketballPlayer.resize(playerWidth, PLAYERHEIGHT);
  imgBasketballPlayerShoot.resize(playerWidth, PLAYERHEIGHT);
  imgBasketballPlayerStill.resize(playerWidth, PLAYERHEIGHT);
  imgBasketballHoop.resize(HOOPSIZE, HOOPSIZE);
  imgBasketballBackground.resize(width, FLOOR);
  
  //FIX NEEDED FOR IMAGES BLURRING AS THEY RESIZE
}

//--------------------------------------
// draws an image at x loc and y distance from the floor
function drawImage(img, x, heightInPixels) {
  imageMode(CORNER); // for drawing image
  image(img, x - img.width/2, FLOOR - heightInPixels);
  imageMode(CENTER); // set back to normal
}

//--------------------------------------
// draws a vertical height arrow with length + units label
function drawVerticalDist(x, y1, y2) {
  strokeWeight(1);
  line(x - 5, y1, x + 5, y1);
  line(x, y1, x, y2);
  line(x - 5, y2, x + 5, y2);
  strokeWeight(0);
  textSize(24);
  textAlign(LEFT, CENTER);
  text(getLength(y1, y2) + " " + UNIT, x + 20, max(y1, y2) - abs(y2 - y1)/2);
}

//--------------------------------------
// draws a horizontal distance arrow with length + units label
function drawHorizontalDist(y, x1, x2) {
  strokeWeight(1);
  line(x1, y - 5, x1, y + 5);
  line(x1, y, x2, y);
  line(x2, y - 5, x2, y + 5);
  strokeWeight(0);
  textSize(24);
  textAlign(LEFT, CENTER);
  text(getLength(x1, x2) + " " + UNIT, max(x1, x2) - abs(x2 - x1)/2, y + 20);
}

//--------------------------------------
function getLength(d1, d2) {
  return nf(abs(d2 - d1)/SCALE, 0, 2); // nf(nums, left, right) turns numbers to strings
}

//--------------------------------------
// converts real world size to onscreen size
// canonical = real world size, actual = pixel size onscreen
function canonicalToActual(canonicalHeight) {
  return canonicalHeight * SCALE;
}

//--------------------------------------
// converts pixel size to real world size
// canonical = real world size, actual = pixel size onscreen
function actualToCanonical(heightInPixels) {
  return heightInPixels / SCALE;
}

//--------------------------------------
// returns max size of the window based on width and height
function calcScale() {
  maxWidthScale = Math.floor(window.innerWidth/16); 
  maxHeightScale = Math.floor(window.innerHeight/9);
  
  // maximum size possible depends on which scale is smaller: width or height
  return min(maxWidthScale, maxHeightScale);
}
