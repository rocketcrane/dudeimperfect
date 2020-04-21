/*
 *  GAME TEXT SCREEN/DISPLAY 
 */

function displayVectors() {
  var actualX = nf(actualToCanonical(world.proj.x), 0, 2);
  var actualY = nf(actualToCanonical(world.proj.y), 0, 2);
  var actualVelX = nf(actualToCanonical(world.proj.vel.x), 0, 2);
  var actualVelY = nf(actualToCanonical(world.proj.vel.y), 0, 2);
  var actualVel = nf(actualToCanonical(world.proj.vel.mag()), 0, 2);
  text("(" + actualX + " " + unit + ", " + actualY + " " + unit + ")", width/2, height/2 - 50);
  text(actualVelX + ", " + actualVelY, width/2, height/2);
  text(actualVel, width/2, height/2 + 50);
}
