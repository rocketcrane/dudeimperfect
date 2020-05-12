/*
 *  GOLF SPECIFIC
 */

function newGolfGame(lvl) {
  canFire = false;
  friction = 0.2;
  slidingFriction = 0.001;
  balls = [];
  for (let i = 0; i < 3; i++) {
    balls[i] = new GolfBall(random(20, width - 20), random(20, height - 20));
  }
  walls = [];
  walls.push(new Wall(width/2, height/2, 300, 50, true));
  walls.push(new Wall(width/3, height/4, 200, 50, true));
}

function GolfBall(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(1/3, -1/3);
  this.acc = createVector(0, 0);
  this.rad = 10;
  this.mass = 1;
  this.isGrounded = false;
  this.show = function() {
    image(imgGB, this.pos.x, this.pos.y);
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
    if (this.isGrounded) {
      this.vel.x *= 1 - slidingFriction;
    }
    if (this.pos.y < minY + this.rad) {
      this.pos.y = minY + this.rad;
      this.vel.x *= 1 - friction/10;
      this.vel.y *= -(1 - friction);
    }
    if (this.pos.y > maxY - this.rad) {
      this.pos.y = maxY - this.rad;
      this.vel.x *= 1 - friction/10;
      this.vel.y *= -(1 - friction);
    }
    if (this.pos.x < minX + this.rad) {
      this.pos.x = minX + this.rad;
      this.vel.x *= -(1 - friction);
    }
    if (this.pos.x > maxX - this.rad) {
      this.pos.x = maxX - this.rad;
      this.vel.x *= -(1 - friction);
    }
    let heightAboveGround = this.pos.y - (maxY - this.rad);
    this.groundedCheck(heightAboveGround, this.pos.x, this.pos.y, 0, maxX, maxY + 100);
  };

  this.walls = function(x1, y1, x2, y2) {
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
    }
    // Bottom
    if (this.vel.y < 0 && withinX && y - this.rad < y2 && y - this.rad > y1 + (y2-y1)/2) {
      this.pos.y = y2 + this.rad;
      this.vel.x *= 1 - friction/10;
      this.vel.y *= -(1 - friction);
    }
    // Left
    if (this.vel.x > 0 && withinY && x + this.rad > x1 && x + this.rad < x1 + (x2-x1)/2) {
      this.pos.x = x1 - this.rad;
      this.vel.x *= -(1 - friction);
    }
    // Right
    if (this.vel.x < 0 && withinY && x - this.rad < x2 && x - this.rad > x1 + (x2-x1)/2) {
      this.pos.x = x2 + this.rad;
      this.vel.x *= -(1 - friction);
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
  };

  this.collideCircle = function(other) {
    var distance = sqrt(((this.pos.x - other.pos.x) * (this.pos.x - other.pos.x)) + ((this.pos.y - other.pos.y) * (this.pos.y - other.pos.y)));
    if (distance < this.rad + other.rad) {
      resolveCollision(this, other);
    }
  };
}


// Modified code to suit this project

function rotateVel(velocity, angle) {
  var rotatedVelocities = {
  x: 
  velocity.x * cos(angle) - velocity.y * sin(angle), 
  y: 
  velocity.x * sin(angle) + velocity.y * cos(angle)
};

rotatedVelocities = createVector(rotatedVelocities.x, rotatedVelocities.y);

return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

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
