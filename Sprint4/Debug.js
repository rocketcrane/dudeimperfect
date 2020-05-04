function runDebug() {
  
  debugBorders();
  debugInfo();
}

function debugBorders() {
  fill(0);
  strokeWeight(1);
  stroke(255, 0, 90);
  line(0, 0, 0, height); // left border
  line(0, 0, width, 0); // top border
  line(0, height, width, height); // bottom border
  line(width, 0, width, height); // right border
  strokeWeight(0); 
}

function debugInfo() {
  textSize(24*FONTSIZECOEF);
  var centX = nf(actualToCanonical(BASKETBALL_GAME.proj.x, HSCALE), 0, 2);
  var centY = nf(actualToCanonical(BASKETBALL_GAME.proj.y, VSCALE), 0, 2);
  var canonicalVelX = nf(actualToCanonical(BASKETBALL_GAME.proj.vel.x, HSCALE), 0, 2);
  var canonicalVelY = nf(actualToCanonical(BASKETBALL_GAME.proj.vel.y, VSCALE), 0, 2);
  let TSCALE = Math.sqrt(HSCALE*HSCALE+VSCALE*VSCALE);
  var canonicalVel = nf(actualToCanonical(BASKETBALL_GAME.proj.vel.mag(), TSCALE), 0, 2);
  fill(255, 0, 90);
  // text("TRUE XY: " + BASKETBALL_GAME.proj.trueX + ", " + BASKETBALL_GAME.proj.trueY, width/2, height/2 - 50);
  text("COORD: " + centX + " m, " + centY + " m", width/2, height/2);
  text("VEL: " + canonicalVelX + " m/s H, " + canonicalVelY + " m/s V", width/2, height/2 + 50);
  text(canonicalVel + " m/s Tot", width/2, height/2 + 100);
  text("(0,0) m", WALL, FLOOR - 20);
  fill(0);
  strokeWeight(1);
  line(0, FLOOR, width, FLOOR);
  strokeWeight(10);
  point(WALL, FLOOR);
  strokeWeight(0);
}

//--------------------------------------
// draws rectangle; used to show the rim and the backboard
function drawRect(x1, y1, x2, y2) {
  stroke(255, 0, 90);
  strokeWeight(5);
  rectMode(CORNERS);
  noFill();
  rect(x1, y1, x2, y2);
  stroke(0);
  strokeWeight(0);
}

//--------------------------------------
// draws a properly aligned point; used to locate the projected object
function drawPoint(x, y, thickness){
  stroke(255, 0, 90);
  strokeWeight(thickness);
  point(x,y);
  strokeWeight(0);
  stroke(0);
}
