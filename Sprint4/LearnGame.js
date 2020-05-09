/*
 *  LEARN BALL GAME
 */

//--------------------------------------

class LearnGame extends BasketballGame{
  constructor(canonicalDist) { // the ball mass should be constant
    super(canonicalDist);
  }
  
  proceed() {
    if (LEVELUP) {
      if (!IS_MOVING) {  //can I remove this?
        LEVELUP = false;
        LEVEL = LEVEL % 8 + 1;
        console.log(LEVEL);
        if (LEVEL == 2) {
          BASKETBALL_GAME = new LearnGame(10);
        } else if (LEVEL == 3) {
          BASKETBALL_GAME = new LearnGame(15);
        } else if (LEVEL == 4){
          BASKETBALL_GAME = new LearnGame(30);
        } else {
          BASKETBALL_GAME = new TrickShotGame(8);
        }
      }
    }
  }
  
  displayText() {
    fill(200,255,100);
    textSize(24*FONTSIZECOEF);
    textAlign(LEFT);
    
    text("Angle: 60°", width/12, height/8);
    text("Time to sink shot: " + this.splash + " s", width/12, height*3/16);
    text("Force:              N", width/12, height/4);
    
    textAlign(CENTER);
    if (LEVEL== 1) {
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": Free Throw", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 8 N", width*3/4, height/5);
    }else if (LEVEL == 2) {
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": Three Pointer", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 11 N", width*3/4, height/5);
    }else if (LEVEL == 3) {
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": Half Court", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 13.3 N", width*3/4, height/5);
    }else{
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": Full Court", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 18.6 N", width*3/4, height/5);
    }
    if (IS_WIN) {
      fill(255,255,255);
      textSize(60*FONTSIZECOEF);
      text("WIN", width/2, 13/20*height);
      textSize(30*FONTSIZECOEF);
      text("you may now hit 'Reset'\n and move onto level "+(LEVEL%4+1), width/2, 28/32*height);
      LEVELUP = true;
    }
  }
  
  
}
