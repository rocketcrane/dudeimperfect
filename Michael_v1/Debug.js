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
