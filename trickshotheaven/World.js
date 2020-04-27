class World {
  constructor(x, y, grav, time_force_applied, proj) {
    // distance/height of the hoop with respect to the ball at the launching point
    this.x = x;
    this.y = y;
    this.grav = grav;
    this.time_force_applied = time_force_applied;
    this.proj = proj;
    // times to reach target based on horizontal & vertical velocities
    this.time_hor = -1;
    this.time_ver = -1;
  }
}

//--------------------------------------
// create all world objects
function createObjects() {
  // CREATE INPUT FIELDS
  forceInput = createInput();
  forceInput.size(100, 50);
  forceInput.style('font-size', '24px');
  angleInput = createInput();
  angleInput.size(100, 50);
  angleInput.style('font-size', '24px');
  
  // CREATE BUTTONS
  enter = createButton('Enter');
  enter.size(100, 50);
  enter.mousePressed(newAttempt);
  reset = createButton('Reset');
  reset.size(100, 50);
  reset.mousePressed(resetAttempt);
}

//--------------------------------------
// update all world objects
function updateObjects() {
  // INPUT UPDATES AND POSITION
  forceInput.position(width/12, height/8);
  forceInput.size(SCALE * 2.5, SCALE * 1);
  angleInput.position(width/12, height/4);
  angleInput.size(SCALE * 2.5, SCALE * 1);
  enter.position(width/6, height/4 - height/12);
  reset.position(enter.x + width/16, enter.y);
  
  // TEXT UPDATES AND POSITION
  textSize(24);
  textAlign(LEFT);
  text("Force:", width/12, height/8 - height/32);
  enter.size(SCALE * 2.5, SCALE * 1);
  text("Angle:", width/12, height/4 - height/32);
  reset.size(SCALE * 2.5, SCALE * 1);
  textAlign(CENTER);
  textSize(60);
  text("Three-pointer", width/2, height/16);
  
  // update floor
  fill(0);
  strokeWeight(1);
  line(0, FLOOR, width, FLOOR);
  strokeWeight(0);
  drawHorizontalDist(FLOOR + 20, width/8, width - width/8);
}
