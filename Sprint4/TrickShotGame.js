/*
 *  TRICKSHOT BALL GAME
 */

//--------------------------------------

class TrickShotGame extends BasketballGame{
  constructor(canonicalDist) { // the ball mass should be constant
    super(canonicalDist);
  }
  
  update() {
    this.updateGame();
    this.updateInput();
    this.setObstacle();
    if (IS_MOVING) {
      this.proj.move();
      this.hitBackboard();
      this.hitBasket();
    }
    this.proj.display();
    this.displayText();
  }
  
  setObstacle(){
    if(this.canonicalDist == 8){
      console.log('canonicaldist = ' + this.canonicalDist);
      this.rectObstalce(width/2, width/2+HSCALE*10, height/2, height/2+VSCALE*10);
    }else if(this.canonicalDist == 12) {
      console.log('canonicaldist = ' + this.canonicalDist);
      this.rectObstalce(width/4, width/2, height/4, height/2);
    }else if(this.canonicalDist == 17) {
      console.log('canonicaldist = ' + this.canonicalDist);
      this.rectObstalce(width/5, width/2, height/6, height/2);
    }else {
      console.log('canonicaldist = ' + this.canonicalDist);
      this.rectObstalce(width/6, width/3, height/5, height/4);
    }
    
  }
  
  rectObstalce(x1, x2, y1, y2) {
    // 4 smaller rectangles as boundaries for a large rectangle
    let thickness = 10;
    // drawImage();
    
    // noStroke();
    //rectMode(CORNERS);
    //let top = rect(x1, y1, x2, y1 + thickness);
    //let left = rect(x1, y1, x1 + thickness, y2);
    //let bottom = rect(x1, y2 -thickness, x2, y2);
    //let right = rect(x2 - thickness, y1, x2, y2);
    
    let isAtTop = this.proj.trueX >= x1 && this.proj.trueX <= x2 && this.proj.trueY >= y1 && this.proj.trueY <= y1 + thickness;
    let isAtLeft = this.proj.trueX >= x1 && this.proj.trueX <= (x1 + thickness) && this.proj.trueY >= y1 && this.proj.trueY <= y2;
    let isAtBottom = this.proj.trueX >= x1 && this.proj.trueX <= x2 && this.proj.trueY >= (y2 - thickness) && this.proj.trueY <= y2;
    let isAtRight = this.proj.trueX >= (x2 - thickness) && this.proj.trueX <= x2 && this.proj.trueY >= y1 && this.proj.trueY <= y2;
  
    if (isAtTop && isAtBottom) {
      console.log('top/bottom');
      this.proj.vel.y *= -1;
    }
    if (this.proj.vel.x > 0 && isAtLeft && isAtRight) {
      console.log('left/right');
      this.proj.vel.x *= -1;
    }
    //console.log('rectObstacle ' + x1 + x2 + y1 + y2);
    if (DEBUG) {
      drawRect(x1, y1, x2, y1 + thickness);
      drawRect(x1, y1, x1 + thickness, y2);
      drawRect(x1, y2 -thickness, x2, y2);
      drawRect(x2 - thickness, y1, x2, y2);
    }
  }
  
  proceed() {
    if (LEVELUP) {
      if (!IS_MOVING) {  //can I remove this?
        LEVELUP = false;
        LEVEL = LEVEL % 8 + 1;
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
