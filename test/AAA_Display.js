function showButtons() {
  if (win) {
    image(nextLevel, width*5/8, height*14/16);
    image(resetGrey, width*3/8, height*14/16);
  } else {
    if (canFire) {
      image(bbLaunch, width*5/8, height*14/16);
    } else {
      image(bbLaunchGrey, width*5/8, height*14/16);
    }
    image(reset, width*3/8, height*14/16);
  }
}

function bbVisuals() {
  image(bbBg, width/2, height/2);
  if (win) {
    canFire = false;
    image(bbBgWin, width/2, height/4);
    image(star1, width/2, height*3/8);
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
    for (let i = 0; i < lives; i++) {
      image(imgBB, width*3/8 + i*width*1/50, height*6/16);
    }
  }
}
