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
  var actualX = nf(actualToCanonical(WORLD.proj.x), 0, 2);
  var actualY = nf(actualToCanonical(WORLD.proj.y), 0, 2);
  var actualVelX = nf(actualToCanonical(WORLD.proj.vel.x), 0, 2);
  var actualVelY = nf(actualToCanonical(WORLD.proj.vel.y), 0, 2);
  var actualVel = nf(actualToCanonical(WORLD.proj.vel.mag()), 0, 2);
  text("(" + actualX + " " + UNIT + ", " + actualY + " " + UNIT + ")", width/2, height/2 - 50);
  text(actualVelX + ", " + actualVelY, width/2, height/2);
  text(actualVel, width/2, height/2 + 50);
}
