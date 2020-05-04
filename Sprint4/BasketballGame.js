class BasketballGame{
  constructor(canonicalDist) { // the ball mass should be constant
    this.canonicalDist = canonicalDist;
    this.canonicalFullCourt = 41;
    this.percentDist = this.canonicalDist / this.canonicalFullCourt; // percentage of full court length (width of background) the level represents
    this.SHOOTINGTIMER = 0;
    // CREATE INPUT FIELDS
    this.forceInput = createInput();
    this.forceInput.size(100, 50);
    this.forceInput.style('font-size', '24px');
    this.angleInput = createInput();
    this.angleInput.size(100, 50);
    this.angleInput.style('font-size', '24px');

    // CREATE BUTTONS
    this.enter = createButton('Enter');
    //this.enter.size(100, 50);
    this.enter.mousePressed(this.newAttempt);
    this.reset = createButton('Reset');
    //this.reset.size(100, 50);
    this.reset.mousePressed(this.resetAttempt);
    this.nextLevel = createButton('Next Level');
    //this.nextLevel.size(100, 50);
    this.nextLevel.mousePressed(nextLevel);
    this.debug = createButton('DEBUG MODE');
    //this.debug.size(100, 50);
    this.debug.mousePressed(  
      function() {
        DEBUG = !DEBUG;
      }
    );
    
    

    this.updateConstants();
    this.proj = new Basketball(imgBasketball, WALL, this.BALLHEIGHT, 1, 0, 0, this.BALLSIZE);
  }

  update() {
    this.updateConstants();
    this.updateInput();
    if (IS_MOVING) {
      this.proj.move();
      this.hitBackboard();
      this.hitBasket();
    }
    this.proj.display();
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
    let y2 = 33/64 * height;  // FLOOR - RIMHEIGHT
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

  updateConstants() {
    /*
     *  CONSTANTS
     */
    
    // basically background
    drawImageOnFloor(imgBasketballBackground, width/2, 7/8*height); 
    
    //location of objects
    this.HOOPLOC = width * 27 / 32; // hoop location consistent relative to the background
    // game board location depends on screen size & level; small screen + free throws having the shortest, large screen + half court the longest
    this.DISTANCE = width * this.percentDist; // distance between launch and hoop in pixels
    WALL = this.HOOPLOC - this.DISTANCE; // canonical (0, ); where the ball starts
    FLOOR = height * 7/8; // canonical (, 0)
    // mark distance to hoop
    drawHorizontalDist(FLOOR + 20, WALL, this.HOOPLOC);
    
    useAsPixelReference(width, this.canonicalFullCourt, 3/8*height, 3); // scalar coefficient from pixel to real.   OG: useAsHeightReference(this.DISTANCE, this.canonicalDist)
    
    // calculate size of objects based on their real-world size
    this.RIMHEIGHT = canonicalToActual(3, VSCALE); //this.HOOPHEIGHT - this.HOOPSIZE/1.75;
    // this.HOOPSIZE = canonicalToActual(4, HSCALE); // this.HOOPSIZE = canonicalToActual(1.5, HSCALE);
    // this.HOOPHEIGHT = this.HOOPSIZE + canonicalToActual(2.4, VSCALE);
    this.PLAYERWIDTH = canonicalToActual(1.5, HSCALE);
    this.PLAYERHEIGHT = canonicalToActual(1.8, VSCALE);
    this.BALLSIZE = canonicalToActual(1, HSCALE);
    this.BALLHEIGHT = this.PLAYERHEIGHT + canonicalToActual(0.1, VSCALE);
    
    // resize objects based on their new size
    imgBasketball.resize(this.BALLSIZE, this.BALLSIZE);
    imgBasketballPlayer.resize(this.PLAYERWIDTH, this.PLAYERHEIGHT);
    imgBasketballPlayerShoot.resize(this.PLAYERWIDTH, this.PLAYERHEIGHT);
    imgBasketballPlayerStill.resize(this.PLAYERWIDTH, this.PLAYERHEIGHT);
    // imgBasketballHoop.resize(this.HOOPSIZE, this.HOOPSIZE);
    imgBasketballBackground.resize(0, height);

    //FIX NEEDED FOR IMAGES BLURRING AS THEY RESIZE

    if (IS_MOVING) {
      if (this.SHOOTINGTIMER <= 60) {
        this.SHOOTINGTIMER++;
        drawImageOnFloor(imgBasketballPlayerShoot, WALL, this.PLAYERHEIGHT);
      } else {
        drawImageOnFloor(imgBasketballPlayerStill, WALL, this.PLAYERHEIGHT);
      }
      this.proj.move();
    } else {
      drawImageOnFloor(imgBasketballPlayer, WALL, this.PLAYERHEIGHT);
    }
    
    drawVerticalDist(WALL - width/20, FLOOR, FLOOR - this.BALLHEIGHT);

    // update hoop
    // drawImageOnFloor(imgBasketballHoop, this.HOOPLOC, this.HOOPHEIGHT); // always overlaps with hoop on the background
    drawVerticalDist(this.HOOPLOC+ width/20, FLOOR, FLOOR - this.RIMHEIGHT);
  }

  updateInput() {
    // INPUT UPDATES AND POSITION
    this.forceInput.position(width/12, height/8);
    this.forceInput.size(width/12, width/32);
    this.angleInput.position(width/12, this.forceInput.y + this.forceInput.height + height/16);
    this.angleInput.size(width/12, width/32);
    this.enter.position(width/5, height/6.5);
    this.enter.size(width/12, width/18);
    this.reset.position(this.enter.x + this.enter.width/2 + width/16, this.enter.y);
    this.reset.size(width/12, width/18);
    this.nextLevel.position(width * 3/6, height/6.5);
    this.nextLevel.size(width/12, width/18);
    this.debug.position(width * 5/6, height/6.5);
    this.debug.size(width/12, width/18);
  }

  newAttempt() {
    if (!IS_MOVING) {
      IS_MOVING = true;
      BASKETBALL_GAME.SHOOTINGTIMER = 0;
      BASKETBALL_GAME.proj = new Basketball(imgBasketball, WALL, BASKETBALL_GAME.BALLHEIGHT, 1, BASKETBALL_GAME.forceInput.value(), BASKETBALL_GAME.angleInput.value(), BASKETBALL_GAME.BALLSIZE);
    }
  }

  resetAttempt() {
    IS_MOVING = false;
    IS_WIN = false;
    BASKETBALL_GAME.SHOOTINGTIMER = 0;
    BASKETBALL_GAME.proj = new Basketball(imgBasketball, WALL, BASKETBALL_GAME.BALLHEIGHT, 1, 0, 0, BASKETBALL_GAME.BALLSIZE);
  }
}
