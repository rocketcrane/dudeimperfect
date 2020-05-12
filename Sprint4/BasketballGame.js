/*
 *  LEVELED BALL GAME
 */

//--------------------------------------

class BasketballGame{
  constructor(canonicalDist) { // the ball mass should be constant
    this.canonicalDist = canonicalDist;
    this.canonicalFullCourt = 41;
    this.percentDist = this.canonicalDist / this.canonicalFullCourt; // percentage of full court length (width of background) the level represents
    this.SHOOTINGTIMER = 0;
    
    this.reset = createButton('Reset');
    this.reset.mousePressed(this.resetAttempt);
    this.nextLevel = createButton('Next Level');
    this.nextLevel.mousePressed(this.proceed);
    this.debug = createButton('DEBUG MODE');
    this.debug.mousePressed(  
      function() {
        DEBUG = !DEBUG;
      }
    );
    this.updateGame();
    this.proj = new Basketball(imgBasketball, WALL, this.BALLHEIGHT, 0, this.BALLSIZE); 
    this.make = new Time(this.canonicalDist); 
    this.splash = this.make.run(20);
  }

  update() {
    this.updateGame();
    this.updateInput();
    this.updateSpecifc();
    if (IS_MOVING) {
      this.proj.move();
      this.hitBackboard();
      this.hitBasket();
    }
    this.proj.display();
    this.displayText();
  }
  
  updateGame() {
    
    // item locations in pixels
    drawImageOnFloor(imgBasketballBackground, width/2, 7/8*height); // background location consistent with screensize
    this.HOOPLOC = width * 27 / 32; // hoop location consistent with screensize
    this.DISTANCE = width * this.percentDist; // shot distance depends on screensize & level; small screen + free throws having the shortest, large screen + half court the longest
    WALL = this.HOOPLOC - this.DISTANCE; // canonical (0, )
    FLOOR = height * 7/8; // canonical (, 0)
    
    useAsPixelReference(width, this.canonicalFullCourt, 3/8*height, 3); // calculate scalar coefficients for translating actual & canonical (pixel & real)
    
    // calculate item sizes based on their real-world
    this.RIMHEIGHT = canonicalToActual(3, VSCALE);
    this.PLAYERWIDTH = canonicalToActual(1.5, HSCALE);
    this.PLAYERHEIGHT = canonicalToActual(1.8, VSCALE);
    this.BALLSIZE = canonicalToActual(1, HSCALE);
    this.BALLHEIGHT = this.PLAYERHEIGHT + canonicalToActual(0.1, VSCALE);
    
    // resize items based on screensize
    imgBasketball.resize(this.BALLSIZE, this.BALLSIZE);
    imgBasketballPlayer.resize(this.PLAYERWIDTH, this.PLAYERHEIGHT);
    imgBasketballPlayerShoot.resize(this.PLAYERWIDTH, this.PLAYERHEIGHT);
    imgBasketballPlayerStill.resize(this.PLAYERWIDTH, this.PLAYERHEIGHT);
    imgBasketballBackground.resize(0, height);
    
    // mark distances & heights
    drawHorizontalDist(FLOOR + 20, WALL, this.HOOPLOC);
    drawVerticalDist(WALL - width/20, FLOOR, FLOOR - this.BALLHEIGHT);
    drawVerticalDist(this.HOOPLOC+ width/20, FLOOR, FLOOR - this.RIMHEIGHT);

    //FIX NEEDED FOR IMAGES BLURRING AS THEY RESIZE

    if (IS_MOVING) {
      if (this.SHOOTINGTIMER <= 60) { // under 3/4 of a second
        this.SHOOTINGTIMER++;
        drawImageOnFloor(imgBasketballPlayerShoot, WALL, this.PLAYERHEIGHT);
      } else { // 3/4 of a second later
        drawImageOnFloor(imgBasketballPlayerStill, WALL, this.PLAYERHEIGHT);
      }
      this.proj.move();
    } else {
      drawImageOnFloor(imgBasketballPlayer, WALL, this.PLAYERHEIGHT);
    }
  }
  
  updateSpecifc(){
  }

  updateInput() {

    this.reset.position(width*2/5, height*2/8);
    this.reset.size(width/12, width/18);
    this.nextLevel.position(width*11/21, height/8);
    this.nextLevel.size(width/12, width/18);
    this.debug.position(width*11/21, height*2/8);
    this.debug.size(width/12, width/18);
    this.updateSpecificInput();
  }
  
  updateSpecificInput(){
  }

  hitBackboard() {
    // x1, x2, y1, y2 represent true coord
    let x1 = 19/22 * width; //this.HOOPLOC + this.HOOPSIZE/6;
    let x2 = 10/11 * width; //this.HOOPLOC + this.HOOPSIZE/2;
    let y1 = 3/8 * height; // FLOOR - HOOPHEIGHT
    let y2 = 1/2 * height;  // FLOOR - RIMHEIGHT
    let isAtBackboardX = this.proj.trueX >= x1 && this.proj.trueX <= x2;
    let isAtBackboardY = this.proj.trueY >= y1 && this.proj.trueY <= y2;
    if (this.proj.vel.x > 0 && isAtBackboardX && isAtBackboardY) {
      this.proj.vel.x *= -1;
    }
    if (DEBUG) {
      drawRect(x1, y1, x2, y2);
    }
  }

  hitBasket() {
    let x1 = 18/22 * width; //this.HOOPLOC + this.HOOPSIZE/6;
    let x2 = 19/22 * width; //this.HOOPLOC + this.HOOPSIZE/2;
    let y1 = 1/2 * height; // FLOOR - HOOPHEIGHT
    let y2 = 35/64 * height;  // FLOOR - RIMHEIGHT
    if (DEBUG) {
      //stroke(255, 200, 100);
      drawRect(x1, y1, x2, y2);
    }
    let isAtWinX = this.proj.trueX >= x1 && this.proj.trueX <= x2;
    let isAtWinY = this.proj.trueY >= y1 && this.proj.trueY <= y2;
    if (isAtWinX && isAtWinY) {
      IS_WIN = true;
    }
  }

  newAttempt() {
    if (!IS_MOVING) {
      IS_MOVING = true;
      BASKETBALL_GAME.SHOOTINGTIMER = 0;
      BASKETBALL_GAME.proj = new Basketball(imgBasketball, WALL, BASKETBALL_GAME.BALLHEIGHT, BASKETBALL_GAME.forceInput.value(), BASKETBALL_GAME.BALLSIZE);
      BASKETBALL_GAME.make = new Time(BASKETBALL_GAME.canonicalDist);
    }
  }

  resetAttempt() {
    IS_MOVING = false;
    IS_WIN = false;
    BASKETBALL_GAME.SHOOTINGTIMER = 0;
    BASKETBALL_GAME.proj = new Basketball(imgBasketball, WALL, BASKETBALL_GAME.BALLHEIGHT, 0, BASKETBALL_GAME.BALLSIZE);
  }
  
  proceed() {
  }
  
  displayText() {
  }
  
  
}
