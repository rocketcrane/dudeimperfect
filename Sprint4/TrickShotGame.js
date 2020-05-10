/*
 *  TRICKSHOT BALL GAME
 */

//--------------------------------------

class TrickShotGame extends BasketballGame{
  constructor(canonicalDist) { // the ball mass should be constant
    super(canonicalDist);
    this.blockColor = new Array(5);
    for(let i = 0; i < 5; i++){
      this.blockColor[i] = new Array(3);
      for(let j = 0; j < 3; j++){
        this.blockColor[i][j] = random(255);
      }
    }
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
    if(LEVELUP){
      this.changeColor();
    }
    if(this.canonicalDist == 15){
      //console.log('canonicaldist = ' + this.canonicalDist);
      this.rectObstalce(width/2+HSCALE*9, width/2+HSCALE*10, -VSCALE, height/2, 1);
    }else if(this.canonicalDist == 20) {
      //console.log('canonicaldist = ' + this.canonicalDist);
      this.rectObstalce(width/2+HSCALE*12, width/2+HSCALE*13, -VSCALE, VSCALE*3.2, 1);
      this.rectObstalce(width/2+HSCALE*2, width/2+HSCALE*12, VSCALE*4, VSCALE*4.5, 2);
    }else if(this.canonicalDist == 25) {
      //console.log('canonicaldist = ' + this.canonicalDist);
      this.rectObstalce(width/2-HSCALE*7.9, width/2-HSCALE*6.9, VSCALE*4, height*7/8, 1);
      this.rectObstalce(width/2-HSCALE*2.7, width/2-HSCALE*1.7, VSCALE*2.5, height*7/8, 2);
      this.rectObstalce(width/2+HSCALE*2.5, width/2+HSCALE*3.5, VSCALE*1.5, height*7/8, 3);
      this.rectObstalce(width/2+HSCALE*7.7, width/2+HSCALE*8.7, VSCALE*1.5, height*7/8, 4);
      this.rectObstalce(width/2+HSCALE*7.7, width/2+HSCALE*8.7, VSCALE*(-10), height*1/8, 5);
    }else {
      //console.log('canonicaldist = ' + this.canonicalDist);
      this.rectObstalce(width/6.5, width/5.5, 0, height/4, 1);
    }
  }
  
  changeColor(){
    let i;
    for(i = 0; i < 5; i++){
      for(let j = 0; j < 3; j++){
        this.blockColor[i][j] = random(255);
      }
    }
    
  }
  
  rectObstalce(x1, x2, y1, y2, num) {
    // 4 smaller rectangles as boundaries for a large rectangle
    let thickness = 20;
    // drawImage();
    
    // noStroke();
    fill(this.blockColor[num-1][0], this.blockColor[num-1][1], this.blockColor[num-1][2]);
    //console.log(num+" color is ("+this.blockColor[num-1][0]+", "+this.blockColor[num-1][1]+", "+this.blockColor[num-1][2]+")");
    rectMode(CORNERS);
    rect(x1, y1, x2, y2, 10);
    //let left = rect(x1, y1, x1 + thickness, y2);
    //let bottom = rect(x1, y2 -thickness, x2, y2);
    //let right = rect(x2 - thickness, y1, x2, y2);
    
    //console.log('trueX is '+this.proj.trueX+' trueY is '+this.proj.trueY);
    //console.log('X1 is '+x1+' X2 is '+x2+'Y1 is '+y1+' Y2 is '+y2);
    
    let isAtTop = this.proj.trueX + this.proj.radius >= x1 && this.proj.trueX + this.proj.radius <= x2 && this.proj.trueY + this.proj.radius >= y1 && this.proj.trueY + this.proj.radius <= (y1 + thickness);
    let isAtLeft = this.proj.trueX + this.proj.radius >= x1 && this.proj.trueX + this.proj.radius <= (x1 + thickness) && this.proj.trueY + this.proj.radius >= y1 && this.proj.trueY + this.proj.radius <= y2;
    let isAtBottom = this.proj.trueX + this.proj.radius >= x1 && this.proj.trueX + this.proj.radius <= x2 && this.proj.trueY + this.proj.radius >= (y2 - thickness) && this.proj.trueY + this.proj.radius <= y2;
    let isAtRight = this.proj.trueX + this.proj.radius >= (x2 - thickness) && this.proj.trueX + this.proj.radius <= x2 && this.proj.trueY + this.proj.radius >= y1 &&this.proj.trueY + this.proj.radius <= y2;
  
    if ((this.proj.vel.y < 0 && isAtTop)||(this.proj.vel.y > 0 && isAtBottom)) {
      console.log('top/bottom');
      this.proj.vel.y *= -0.9;
    }else if((this.proj.vel.x > 0 && isAtLeft)||(this.proj.vel.x < 0 && isAtRight)) {
      console.log('left/right');
      this.proj.vel.x *= -0.9;
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
          BASKETBALL_GAME = new TrickShotGame(20);
        } else if (LEVEL == 7) {
          BASKETBALL_GAME = new TrickShotGame(25);
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
      text("Solution: 10.5 N", width*3/4, height/5);
    }else if (LEVEL == 6) {
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": TS2", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 10.7 N", width*3/4, height/5);
    }else if (LEVEL == 7) {
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": TS3", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 14.5 N", width*3/4, height/5);
    }else{
      textSize(60*FONTSIZECOEF);
      text("Level " + LEVEL + ": TS4", width/2, height/16);
      textSize(24*FONTSIZECOEF);
      text("Solution: 15 N", width*3/4, height/5);
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
