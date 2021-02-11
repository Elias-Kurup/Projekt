//virtual camera
//move the mouse around
//the sprite follows the mouse but appears at the center of the sketch
//because the camera is following it

var ghost;
var bg;
var frame;
//the scene is twice the size of the canvas
var SCENE_W = 1600;
var SCENE_H = 800;
var enemy;


function setup() {
  createCanvas(1600, 800);
  collectibles = new Group();
  
  for(var j=0; j<10; j++)
  {
    var dot = createSprite(random(0, width), random(0, height));
    dot.addAnimation('normal', 'assets/small_circle0001.png', 'assets/small_circle0001.png');
    collectibles.add(dot);
  }


  //create a sprite and add the 3 animations
  ghost = createSprite(400, 200, 50, 100);

  var myAnimation = ghost.addAnimation('floating', 'assets/ghost_standing0002.png', 'assets/ghost_standing0007.png');
  myAnimation.offY = 18;

  ghost.addAnimation('moving', 'assets/ghost_walk0001.png', 'assets/ghost_walk0004.png');

  bg = new Group();

  //create some background for visual reference
  for(var i=0; i<80; i++)
  {
    //create a sprite and add the 3 animations
    var rock = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
    //cycles through rocks 0 1 2
    rock.addAnimation('normal', 'assets/rocks'+i%3+'.png');
    bg.add(rock);
  }

  frame = loadImage();
}

function draw() {
  background(255, 255, 255);

  //mouse trailer, the speed is inversely proportional to the mouse distance
  ghost.velocity.x = (camera.mouseX-ghost.position.x)/20;
  ghost.velocity.y = (camera.mouseY-ghost.position.y)/20;

  //a camera is created automatically at the beginning

  //.5 zoom is zooming out (50% of the normal size)


  //set the camera position to the ghost position
  camera.position.x = ghost.position.x;
  camera.position.y = ghost.position.y;

  //limit the ghost movements
  if(ghost.position.x < 0)
    ghost.position.x = 0;
  if(ghost.position.y < 0)
    ghost.position.y = 0;
  if(ghost.position.x > SCENE_W)
    ghost.position.x = SCENE_W;
  if(ghost.position.y > SCENE_H)
    ghost.position.y = SCENE_H;

  //draw the scene
  //rocks first
  drawSprites(bg);

  //shadow using p5 drawing
  noStroke();
  fill(0, 0, 0, 20);
  //shadow
  ellipse(ghost.position.x, ghost.position.y+90, 80, 30);
  //character on the top
  drawSprite(ghost);
    drawSprites();
  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at
  //the absolute 0,0 (try to see what happens if you don't turn it off
  camera.off();
  image(frame, 0, 0);

}


function mousePressed() {

  //create a sprite at the mouse position and store it in a temporary variable
  var s = createSprite(ghost.position.x, ghost.position.y, 30, 30);
  //if no image or animation is associated it will be a rectancle of the specified size
  //and a random color

  //now you can use the variable to set properties
  //e.g. a random velocity on the x and y coordinates
  s.velocity.x = (camera.mouseX-ghost.position.x)/2;
  s.velocity.y = (camera.mouseY-ghost.position.y)/2;
}
  collectibles.attractionPoint(0.2, ghost.position.x, ghost.position.y);
  //since the force keeps incrementing the speed you can
  //set a limit to it with maxSpeed
  collectibles.maxSpeed = 5;
