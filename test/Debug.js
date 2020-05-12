function debug() {
  showEdges();
}

function showEdges() {
  strokeWeight(3);
  fill(0);
  line(minX, minY, maxX, minY);
  line(minX, maxY, maxX, maxY);
  line(minX, minY, minX, maxY);
  line(maxX, minY, maxX, maxY);
  fill(255);
  strokeWeight(0);
}

function showWalls(x, y, w, h) {
  
  strokeWeight(3);
  fill(255, 0, 0);
  line(x, y, x+w, y);
  line(x+w, y, x+w, y+h);
  line(x, y+h, x+w, y+h);
  line(x, y, x, y+h);
  fill(255);
  strokeWeight(0);
}
