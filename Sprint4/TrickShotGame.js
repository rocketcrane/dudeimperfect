/*
 *  TRICKSHOT BALL GAME
 */

//--------------------------------------

class TrickShotGame extends BasketballGame{
  constructor(canonicalDist) { // the ball mass should be constant
    super(canonicalDist);
  }
  
  proceed() {
    if (LEVELUP) {
      if (!IS_MOVING) {  //can I remove this?
        LEVELUP = false;
        LEVEL = LEVEL % 8 + 1;
        console.log(LEVEL);
        if (LEVEL == 6) {
          BASKETBALL_GAME = new TrickShotGame(12);
        } else if (LEVEL == 7) {
          BASKETBALL_GAME = new TrickShotGame(17);
        } else if (LEVEL == 8){
          BASKETBALL_GAME = new TrickShotGame(30);
        } else {
          BASKETBALL_GAME = new LearnGame(5);
        }
      }
    }
  }
  
  displayText() {
    fill(200,255,100);
    textSize(24*FONTSIZECOEF);
    textAlign(LEFT);
    
    text("Angle: 60°", width/12, height/8);
    text("Force:              N", width/12, height/4);
    
    textAlign(CENTER);
    if (LEVEL== 5) {
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": TS1", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 10 N", width*3/4, height/5);
    }else if (LEVEL == 6) {
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": TS2", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 12 N", width*3/4, height/5);
    }else if (LEVEL == 7) {
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": TS3", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 14 N", width*3/4, height/5);
    }else{
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": TS4", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 18.6 N", width*3/4, height/5);
    }
    if (IS_WIN) {
      fill(255,255,255);
      textSize(60*FONTSIZECOEF);
      text("WIN", width/2, 13/20*height);
      textSize(30*FONTSIZECOEF);
      text("you may now hit 'Reset'\n and move onto level "+(LEVEL%8+1), width/2, 28/32*height);
      LEVELUP = true;
    }
  }
  
  
}
