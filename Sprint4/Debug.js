function runDebug() {
  debugBorders();
  debugInfo();
}

function debugBorders() {
  fill(0);
  strokeWeight(1);
  line(0, 0, 0, height);
  line(0, 0, width, 0);
  line(0, height, width, height);
  line(width, 0, width, height);
  strokeWeight(0);
}

function debugInfo() {
  textSize(24);
  var actualX = nf(actualToCanonical(BASKETBALL_GAME.proj.x), 0, 2);
  var actualY = nf(actualToCanonical(BASKETBALL_GAME.proj.y), 0, 2);
  var actualVelX = nf(actualToCanonical(BASKETBALL_GAME.proj.vel.x), 0, 2);
  var actualVelY = nf(actualToCanonical(BASKETBALL_GAME.proj.vel.y), 0, 2);
  var actualVel = nf(actualToCanonical(BASKETBALL_GAME.proj.vel.mag()), 0, 2);
  text("(" + actualX + " " + UNIT + ", " + actualY + " " + UNIT + ")", width/2, height/2 - 50);
  text(actualVelX + ", " + actualVelY, width/2, height/2);
  text(actualVel, width/2, height/2 + 50);
}

//--------------------------------------
// draws a properly aligned rectangle
function drawRect(x1, y1, x2, y2) {
  stroke(255, 0, 0);
  strokeWeight(5);
  line(alignX(x1), alignY(y1), alignX(x2), alignY(y1));
  line(alignX(x1), alignY(y2), alignX(x2), alignY(y2));
  line(alignX(x1), alignY(y1), alignX(x1), alignY(y2));
  line(alignX(x2), alignY(y1), alignX(x2), alignY(y2));
  strokeWeight(0);
  stroke(0);
}

//--------------------------------------
// draws a properly aligned point
function drawPoint(x, y, thickness) {
  stroke(255, 0, 0);
  strokeWeight(thickness);
  point(alignX(x), alignY(y));
  strokeWeight(0);
  stroke(0);
}
