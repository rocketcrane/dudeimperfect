function drawImage(img, x, heightInPixels) {
  imageMode(CORNER);
  image(img, x - img.width/2, floor - heightInPixels);
  imageMode(CENTER);
}

// Draws a vertical height arrow with length + units label
function drawVerticalDist(x, y1, y2) {
  strokeWeight(1);
  line(x - 5, y1, x + 5, y1);
  line(x, y1, x, y2);
  line(x - 5, y2, x + 5, y2);
  strokeWeight(0);
  textSize(24);
  textAlign(LEFT, CENTER);
  text(getLength(y1, y2) + " " + unit, x + 20, max(y1, y2) - abs(y2 - y1)/2);
}

function drawHorizontalDist(y, x1, x2) {
  strokeWeight(1);
  line(x1, y - 5, x1, y + 5);
  line(x1, y, x2, y);
  line(x2, y - 5, x2, y + 5);
  strokeWeight(0);
  textSize(24);
  textAlign(LEFT, CENTER);
  text(getLength(x1, x2) + " " + unit, max(x1, x2) - abs(x2 - x1)/2, y + 20);
}

function getLength(d1, d2) {
  return round(abs(d2 - d1)/scale);
}

function canonicalToActual(canonicalHeight) {
  return canonicalHeight * scale;
}

function actualToCanonical(heightInPixels) {
  return heightInPixels / scale;
}
