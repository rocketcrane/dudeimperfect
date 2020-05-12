/*
 *  BASKETBALL SPECIFIC
 */
function newBasketballGame(lvl) {
  //screenState = "Basketball";
  score = 0;
  canFire = true;
  win = false;
  friction = 0.15;
  slidingFriction = 0.0001;
  balls = [];
  walls = [];
  walls.push(new Wall(width*14/16, height*23/64, width/29, width/10)); //right backboard
  walls.push(new Wall(width*55/64, height/2, width/35, width/50)); //right choke
  walls.push(new Wall(width*52/64, height/2, width/90, width/50)); //right rim
  goal = new Goal(width*53/64, height/2, width/35, width/50);
  walls.push(new Wall(width*11/128, height*23/64, width/29, width/10)); //left backboard
  walls.push(new Wall(width*14/128, height/2, width/35, width/50)); //left choke
  walls.push(new Wall(width*22/128, height/2, width/90, width/50)); //left rim
  level = lvl;

  const backgroundLength = 41;
  switch(level) { //this is problematic. no distances here
  case 1:
    percentDist = 5/backgroundLength;
    //distance = width*4/6; 
    lives = 5;
    break;
  case 2:
    percentDist = 9/backgroundLength;
    //distance = width*9/16;
    lives = 5;
    break;
  case 3:
    percentDist = 15/backgroundLength;
    //distance = width*7/16;
    lives = 5;
    break;
  case 4:
    percentDist = 25/backgroundLength;
    //distance = width/5;
    lives = 5;
    break;
  }
}

function shootBB() {
  balls.push(new Basketball(hooploc - distance, maxY - width/8, forceSlider.sliderValue, 45));
  //balls.push(new Basketball(mix + distance, maxY - width/8, forceSlider.sliderValue, angleSlider.sliderValue));
  canFire = false;
  fireTimer = 120;
  lives--;
}

function bbCanFire() {
  if (canFire) {
    image(imgBB, hooploc - distance, maxY - width/8);
    //image(imgBB, minX + distance, maxY - width/8);
  } else if (fireTimer >= 0) {
    fireTimer--;
    if (lives > 0 && fireTimer == 0) {
      canFire = true;
    }
  }
}

function bbVisuals() {
  updateScale();
  image(bbBg, width/2, height/2);
  drawVerticalDist(hooploc + width/20, floor, floor - rimHeight);
  drawVerticalDist(roboloc - width/20, floor, floor - playerHeight);
  drawHorizontalDist(floor, roboloc, hooploc);
  if (win) {
    canFire = false;
    image(bbBgWin, width/2, height/4);
    if (lives >= 4) {
      image(star3, width/2, height*3/8);
    } else if (lives >= 2) {
      image(star2, width/2, height*3/8);
    } else {
      image(star1, width/2, height*3/8);
    }
  } else {
    switch(level) {
    case 1:
      image(bbLvl1, width/2, height/4);
      break;
    case 2:
      image(bbLvl2, width/2, height/4);
      break;
    case 3:
      image(bbLvl3, width/2, height/4);
      break;
    case 4:
      image(bbLvl4, width/2, height/4);
      break;
    }
  }
  if (!win) {
    for (let i = 0; i < lives; i++) {
      image(imgBB, width*3/8 + i*width*1/50, height*6/16);
    }
  }
}

function showButtons() {
  if (win) {
    image(nextLevel, width*5/8, height*7/8);
    image(reset, width*3/8, height*7/8);
  } else {
    if (lives == 0) {
      image(reset, width*5/8, height*6/16);
    } else if (canFire) {
      image(bbLaunch, width*5/8, height*6/16);
    } else {
      image(bbLaunchGrey, width*5/8, height*6/16);
    }
    //image(reset, width*3/8, height*7/8);
  }
}

function Basketball(x, y, force, angle) {
  this.pos = createVector(x, y);
  force /= 10; //what??
  this.vel = createVector(cos(angle)*force*HSCALE/(width*0.034375), -sin(angle)*force*VSCALE/(width*0.034375));
  this.acc = createVector(0, 0);
  this.rad = 23;
  this.mass = 10; //yeah?
  this.isGrounded = false;
  this.angle = 0;
  this.show = function() {
    image(imgBB, this.pos.x, this.pos.y);
  };

  this.update = function() {
    this.edges();
    this.vel.add(this.acc.div(iterations));
    this.vel.limit(12.5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.applyForce = function(f) {
    this.acc.add(f);
  };

  this.edges = function() {
    let bounced = false;
    if (this.isGrounded) {
      this.vel.x *= 1 - slidingFriction;
    }
    if (this.pos.y > maxY - this.rad) {
      this.pos.y = maxY - this.rad;
      this.vel.x *= 1 - friction/10;
      this.vel.y *= -(1 - friction);
      bounced = true;
    }
    if (this.pos.x < minX + this.rad) {
      this.pos.x = minX + this.rad;
      this.vel.x *= -(1 - friction);
      bounced = true;
    }
    if (this.pos.x > maxX - this.rad) {
      this.pos.x = maxX - this.rad;
      this.vel.x *= -(1 - friction);
      bounced = true;
    }
    if (bounced) {
      this.bounceSound();
    }
    let heightAboveGround = this.pos.y - (maxY - this.rad);
    this.groundedCheck(heightAboveGround, this.pos.x, this.pos.y, 0, maxX, maxY + 100);
  };

  this.walls = function(x1, y1, x2, y2) {
    let bounced = false;
    let x = this.pos.x;
    let y = this.pos.y;
    let withinX = x >= x1 && x <= x2;
    let withinY = y >= y1 && y <= y2;
    // Sliding friction
    if (this.isGrounded) {
      this.vel.x *= 1 - slidingFriction;
    }
    // Top
    if (this.vel.y > 0 && withinX && y + this.rad > y1 && y + this.rad < y1 + (y2-y1)/2) {
      this.pos.y = y1 - this.rad;
      this.vel.x *= 1 - friction/10;
      this.vel.y *= -(1 - friction);
      bounced = true;
    }
    // Bottom
    if (this.vel.y < 0 && withinX && y - this.rad < y2 && y - this.rad > y1 + (y2-y1)/2) {
      this.pos.y = y2 + this.rad;
      this.vel.x *= 1 - friction/10;
      this.vel.y *= -(1 - friction);
      bounced = true;
    }
    // Left
    if (this.vel.x > 0 && withinY && x + this.rad > x1 && x + this.rad < x1 + (x2-x1)/2) {
      this.pos.x = x1 - this.rad;
      this.vel.x *= -(1 - friction);
      bounced = true;
    }
    // Right
    if (this.vel.x < 0 && withinY && x - this.rad < x2 && x - this.rad > x1 + (x2-x1)/2) {
      this.pos.x = x2 + this.rad;
      this.vel.x *= -(1 - friction);
      bounced = true;
    }
    if (bounced) {
      this.bounceSound();
    }
    let heightAboveGround = this.pos.y - (y1 - this.rad);
    this.groundedCheck(heightAboveGround, x, y, x1, x2, y2);
  };

  this.groundedCheck = function(dist, x, y, x1, x2, y2) {
    let withinX = x >= x1 && x <= x2;
    if (!withinX || y > y2) {
      return;
    }
    if (abs(dist) <= tolerance && abs(this.vel.y) <= tolerance/2) {
      this.vel.set(this.vel.x, 0);
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }
  }

  this.bounceSound = function() {
    if (this.vel.mag() < 0.5) {
      return;
    }
    if (random(2) == 0) {
      bbBounce1.play();
    } else {
      bbBounce2.play();
    }
  }

  this.collideCircle = function(other) {
    var distance = sqrt(((this.pos.x - other.pos.x) * (this.pos.x - other.pos.x)) + ((this.pos.y - other.pos.y) * (this.pos.y - other.pos.y)));
    if (distance < this.rad + other.rad) {
      resolveCollision(this, other);
      this.bounceSound();
    }
  };
}


// Code obtained from p5js.org
function rotateVel(velocity, angle) {
  let rotatedVelocities = {
  x: 
  velocity.x * cos(angle) - velocity.y * sin(angle), 
  y: 
  velocity.x * sin(angle) + velocity.y * cos(angle)
};
rotatedVelocities = createVector(rotatedVelocities.x, rotatedVelocities.y);
return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.vel.x - otherParticle.vel.x;
  const yVelocityDiff = particle.vel.y - otherParticle.vel.y;

  const xDist = otherParticle.pos.x - particle.pos.x;
  const yDist = otherParticle.pos.y - particle.pos.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    // Grab angle between the two colliding particles
    const angle = -atan2(otherParticle.pos.y - particle.pos.y, otherParticle.pos.x - particle.pos.x);

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotateVel(particle.vel, angle);
    const u2 = rotateVel(otherParticle.vel, angle);

    // Velocity after 1d collision equation
    let v1 = {
    x: 
    u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), 
    y: 
    u1.y
  };
  v1 = createVector(v1.x * (1 - friction), v1.y * (1 - friction));
  let v2 = {
  x: 
  u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), 
  y: 
  u2.y
};
v2 = createVector(v2.x * (1 - friction), v2.y * (1 - friction));

// Final velocity after rotating axis back to original location
const vFinal1 = rotateVel(v1, -angle);
const vFinal2 = rotateVel(v2, -angle);

// Swap particle velocities for realistic bounce effect
particle.vel.x = vFinal1.x;
particle.vel.y = vFinal1.y;
otherParticle.vel.x = vFinal2.x;
otherParticle.vel.y = vFinal2.y;
}
}
