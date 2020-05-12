function updateWorld() {
  if (balls[0]) {
    for (let i = 0; i < balls.length; i++) {
      ball = balls[i];
      let g = createVector(0, gravity); //0.25. -9.8m/s/s/FPS. 30
      if (!ball.isGrounded) {
        ball.applyForce(g);
      }
      for (let i = 0; i < iterations; i++) {
        ball.update();
      }
      for (let other of balls) {
        if (other != ball) {
          ball.collideCircle(other);
        }
      }
      for (let wall of walls) {
        ball.walls(wall.x1, wall.y1, wall.x2, wall.y2);
      }
      ball.show();
      goal.contains(ball.pos.x, ball.pos.y);
    }
  }
  if (walls[0]) {
    for (let wall of walls) {
      wall.show();
    }
  }
  if (goal != null) {
    goal.show();
  }
}

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
    lives = 5;
    break;
  case 2:
    percentDist = 9/backgroundLength;
    lives = 5;
    break;
  case 3:
    percentDist = 15/backgroundLength;
    lives = 5;
    break;
  case 4:
    percentDist = 25/backgroundLength;
    lives = 5;
    break;
  }
}

function shootBB() {
  balls.push(new Basketball(hooploc - distance, floor - playerHeight, forceSlider.sliderValue, 60));
  balls.push(new Basketball(hooploc - distance, maxY - width/8, forceSlider.sliderValue, 60));

  canFire = false;
  fireTimer = 120;
  lives--;
}

function bbCanFire() {
  if (canFire) {
    image(imgBB, hooploc - distance, floor - playerHeight);
  } else if (fireTimer >= 0) {
    fireTimer--;
    if (lives > 0 && fireTimer == 0) {
      canFire = true;
    }
  }
}

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
