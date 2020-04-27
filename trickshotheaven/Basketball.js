//--------------------------------------
// updates basketball
function updateBasketball() {
  if (ISMOVING) {
    if (SHOOTINGTIMER <= 60) {
      SHOOTINGTIMER++;
      drawImage(imgBasketballPlayerShoot, width/8, PLAYERHEIGHT);
    } else {
      drawImage(imgBasketballPlayerStill, width/8, PLAYERHEIGHT);
    }
    WORLD.proj.move();
  } else {
    drawImage(imgBasketballPlayer, width/8, PLAYERHEIGHT);
  }
  WORLD.proj.display();
  drawVerticalDist(width/5, FLOOR, FLOOR - BALLHEIGHT);

  // update hoop
  drawImage(imgBasketballHoop, width - width/8, HOOPHEIGHT);
  drawVerticalDist(width - width/4, FLOOR, FLOOR - RIMHEIGHT);
}

//--------------------------------------
function newAttempt() {
  if (ISMOVING) {
    return;
  }
  SHOOTINGTIMER = 0;
  WORLD.proj = new Ball(imgBasketball, width/8, BALLHEIGHT, BALLSIZE, 1, forceInput.value(), angleInput.value());
  ISMOVING = true;
}

//--------------------------------------
function resetAttempt() {
  if (ISMOVING) {
    ISMOVING = false;
  }
  SHOOTINGTIMER = 0;
  WORLD.proj = new Ball(imgBasketball, width/8, BALLHEIGHT, BALLSIZE, 1, 0, 0);
}
