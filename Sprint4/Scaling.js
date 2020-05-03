/*
 *  SCREEN/DISPLAY SCALING
 */

//--------------------------------------
// triggers every time window is resized
function windowResized() {
  widthScale = Math.floor(window.innerWidth/16);
  heightScale = Math.floor(window.innerHeight/9);
  minScale = min(widthScale, heightScale);
  resizeCanvas(16 * minScale, 9 * minScale);
  BASKETBALL_GAME.updateInput();
}

//--------------------------------------
// Aligns (x,y) coordinate that begins at bottom left to canonical (0,0); x increases towards right, y increases towards up.
// Canonical (0,0) is NOT actual (pixel) (0,0); pixel (0,0) is not very useful here
function alignX(x) {
  return WALL + x; // the wall is where the vertical line where the shooter stands with the ball; will move depending on the question
}

function alignY(y) {
  return FLOOR - y; // the floor is the horizontal line down the middle of the court
}

//--------------------------------------
// draws an image where its midpoint is at x pixels and its top is y pixels from the floor
function drawImageOnFloor(img, x, heightInPixels) {
  imageMode(CORNER);
  image(img, x - img.width/2, alignY(heightInPixels));
  imageMode(CENTER);
}

//--------------------------------------
// draws a vertical height arrow with length + units label
function drawVerticalDist(x, y1, y2) {
  strokeWeight(1);
  stroke(100, 200, 255);
  line(x - 5, y1, x + 5, y1); // top serif
  line(x, y1, x, y2); // arrow body
  line(x - 5, y2, x + 5, y2); // do we need a bottom serif?
  strokeWeight(0);
  textSize(24);
  textAlign(LEFT, CENTER);
  fill(100, 200, 255);
  text(getLength(y1, y2) + " " + UNIT, x + 20, max(y1, y2) - abs(y2 - y1)/2); // show distance string
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
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(100, 200, 255);
  text(getLength(x1, x2) + " " + UNIT, max(x1, x2) - abs(x2 - x1)/2, y + 20); // show distance string
}

function useAsPixelReference(lengthInPixels, canonicalLength, heightInPixels, canonicalHeight) {
  HSCALE = lengthInPixels / canonicalLength;
  VSCALE = heightInPixels / canonicalHeight;
}


//--------------------------------------
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

//--------------------------------------
// returns max size of the window based on width and height
// maximum size possible depends on which scale is smaller: width or height
function calcScale() {
  maxWidthScale = Math.floor(window.innerWidth/16); 
  maxHeightScale = Math.floor(window.innerHeight/9);
  return min(maxWidthScale, maxHeightScale);
}
