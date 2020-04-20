/*
 *  GAME TEXT SCREEN/DISPLAY 
 */
function gameDisplay() {
  fill(0);
  imageMode(CENTER);
  textSize(20);
  textAlign(LEFT, TOP);
  text("time: "+nf(sec,0,2)+"s", 10, 50);  // time ref
  textAlign(CENTER, TOP);
  text("Launch Angle: "+world.proj.angle+"°", width/2, 50);
  if (world.proj.force == null) { // still asking for inputs
    text("Launch Force: ___ N", width/2, 80);  //show ques for input asked
    textSize(15);
    text("Insert an angle and a force down below", width/2, 20); // hint action
  } else { // already ran calc()
    //forceInput = "";
    //button = "";
    text("Launch Force: "+world.proj.force+" N", width/2, 80);  //repeat user input
    sec = (frameCount - frameSinceStart)/frameRate(); // updates by 1/30 starting the moment the user submits a force
    if (sec % 1 == 0) {
      show = sec; // update time every second
    }
    textSize(15);
    text("The hoop is "+world.x+" meters away and "+world.y+" meters high", width/2, 20); // display inputs
  }

  if (world.proj.force != null) {
    world.calc(world.x, world.y, world.proj.angle, world.proj.force);
    world.proj.move();
    // draws SPLASH when the player scores 
    if (world.make(world.time_hor, world.time_ver)) { 
      textSize(20);
      text(bucket+"s to make the shot", width/2, 110);
      if (sec > bucket) {
        textSize(60);
        rotate(radians(345));
        text("SPLASH !!", 150, 300);
        rotate(radians(15));
        colorMode(RGB, 255);
        wallpaper = 'rgb(20%,100%,50%)'; //background turns green
      }
      //or else...
    } else {
      textAlign(LEFT, TOP);
      textSize(15);
      text("veloc_proj: "+world.proj.veloc_proj+" m/s", 350, 65);
      text("horizontal velocity at launch: ~ "+Math.round((world.proj.veloc_hor+Number.EPSILON)*100)/100+" m/s\nvertical velocity at launch: ~ "+Math.round((world.proj.veloc_ver+Number.EPSILON)*100)/100+" m/s", 10, 110);
      text("-> it takes "+world.time_hor+"s to reach "+world.x+"m in distance", 10, 150);
      if (isNaN(world.time_ver)) {
        text("-> but it does not reach "+world.y+"m in height", 10, 170);
        textSize(20);
        text("TOO LITTLE POWER", 280, 135);
      } else {
        text("-> it takes "+world.time_ver+"s to descend to "+world.y+"m in height", 10, 170);
        textSize(20);
        if (world.time_hor > world.time_ver) {
          text("TOO LITTLE POWER", 280, 135);
        } else {
          text("TOO MUCH POWER", 280, 135);
        }
      }

      if (sec > bucket) {
        textSize(60);
        text("oops .", 150, 300);
        colorMode(RGB, 255);
        wallpaper = 'rgb(100%,0%,20%)'; // background to red
      }
    }
  }
}
