function showButtons() {
  if (win) {
    image(nextLevel, width*5/8, height*7/8);
    image(reset, width*3/8, height*7/8);
  } else {
    if (canFire) {
      image(bbLaunch, width*5/8, height*6/16);
    } else {
      image(bbLaunchGrey, width*5/8, height*6/16);
    }
    //image(reset, width*3/8, height*7/8);
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
    image(star1, width/2, height*3/8);
  }else{
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
  for (let i = 0; i < lives; i++) {
      image(imgBB, width*3/8 + i*width*1/50, height*6/16);
    }
  
}
