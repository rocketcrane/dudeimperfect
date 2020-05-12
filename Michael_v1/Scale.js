function calcScale() {
  maxWidthScale = Math.floor(window.innerWidth/16); 
  maxHeightScale = Math.floor(window.innerHeight/9);
  return min(maxWidthScale, maxHeightScale);
}

function windowResized() {
  maxScale = calcScale();
  resizeCanvas(16 * maxScale, 9 * maxScale);
  minX = width/32;
  maxX = width * 31/32;
  minY = -width/4;
  maxY = height * 7/8;
  resizeImgs();

  if (walls[0]) {
    for (let i = 0; i < walls.length; i++) {
      walls[i].x1 = width * walls[i].x1Scale;
      walls[i].y1 = height * walls[i].y1Scale;
      walls[i].x2 = width * walls[i].x2Scale;
      walls[i].y2 = height * walls[i].y2Scale;
      walls[i].w = walls[i].x2 - walls[i].x1;
      walls[i].h = walls[i].y2 - walls[i].y1;
    }
  }
  if (goal != null) {
    goal.x1 = width * goal.x1Scale;
    goal.y1 = height * goal.y1Scale;
    goal.x2 = width * goal.x2Scale;
    goal.y2 = height * goal.y2Scale;
    goal.w = goal.x2 - goal.x1;
    goal.h = goal.y2 - goal.y1;
  }
  
  slider = new Slider(width/2 - width/14, height*30/32, width/7, -90, 90, 10, false, false, false);
}

function resizeImgs() {
  imgBB.resize(height*10/189, height*10/189);
  imgGB.resize(height*4/189, height*4/189);
  bbBg.resize(width, height);
  bbLvl1.resize(width/3, height/3);
  bbLvl2.resize(width/3, height/3);
  bbLvl3.resize(width/3, height/3);
  bbLvl4.resize(width/3, height/3);
  bbBgWin.resize(width/3, height/3);
  bbLaunch.resize(width/12, height/6);
  bbLaunchGrey.resize(width/12, height/6);
  reset.resize(width/12, height/6);
  resetGrey.resize(width/12, height/6);
  nextLevel.resize(width/12, height/6);
  star1.resize(width/6, height/8);
  star2.resize(width/6, height/8);
  star3.resize(width/6, height/8);
}
