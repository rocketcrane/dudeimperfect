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
  textSize(24);
  var canonicalX = nf(actualToCanonical(BASKETBALL_GAME.proj.x, HSCALE), 0, 2); // shouldn't it be canonicalX?
  var canonicalY = nf(actualToCanonical(BASKETBALL_GAME.proj.y, VSCALE), 0, 2);
  var canonicalVelX = nf(actualToCanonical(BASKETBALL_GAME.proj.vel.x, HSCALE), 0, 2);
  var canonicalVelY = nf(actualToCanonical(BASKETBALL_GAME.proj.vel.y, VSCALE), 0, 2);
  let TSCALE = Math.sqrt(HSCALE*HSCALE+VSCALE*VSCALE);
  var canonicalVel = nf(actualToCanonical(BASKETBALL_GAME.proj.vel.mag(), TSCALE), 0, 2);
  fill(255, 0, 90);
  text("(" + canonicalX + " " + UNIT + ", " + canonicalY + " " + UNIT + ")", width/2, height/2 - 50);
  text(canonicalVelX + ", " + canonicalVelY, width/2, height/2);
  text(canonicalVel, width/2, height/2 + 50);
  fill(0);
  strokeWeight(1);
  line(0, FLOOR, width, FLOOR);
  strokeWeight(0);
}

//--------------------------------------
// draws a properly aligned rectangle; used to show the rim and the backboard
function drawRect(x1, y1, x2, y2) {
  stroke(255, 0, 90);
  strokeWeight(5);
  line(alignX(x1), alignY(y1), alignX(x2), alignY(y1));
  line(alignX(x1), alignY(y2), alignX(x2), alignY(y2));
  line(alignX(x1), alignY(y1), alignX(x1), alignY(y2));
  line(alignX(x2), alignY(y1), alignX(x2), alignY(y2));
  strokeWeight(0);
  stroke(0);
}

//--------------------------------------
// draws a properly aligned point; used to locate the projected object
function drawPoint(x, y, thickness) {
  stroke(255, 0, 0);
  strokeWeight(thickness);
  point(alignX(x), alignY(y));
  strokeWeight(0);
  stroke(0);
}
