var monkey, monkey_running, monkey_jumping, monkey_rerun, monkeyS;
var banana, bananaImage, obstacle, ob1, ob2, ob3, ob4, ob5, ob6, ground, groundImage, invisibleGround, invisibleGroundImage, backgI, backg;
var foodGroup, obstacleGroup;
var score = 0,
  life, l1,l2,l3, l1I,l2I,l3I, over, replayI;
var PLAY = 1,
  END = 0,
  life = 3;
var gameState = PLAY;


function preload() {


  monkey_running = loadAnimation("m1.png", "m2.png", "m4.png", "m6.png");

  monkey_rerun = loadAnimation("m1.png", "m2.png", "m4.png", "m6.png");

  monkey_jumping = loadAnimation("mx.png", "mx.png", "mx.png", "mx.png", "mx2.png", "mx2.png", "mx2.png", "mx2.png", "mx2.png");

  monkeyS = loadAnimation("dead.png");

  backgI = loadImage("images.jfif");

  bananaImage = loadImage("banana.png");

  groundImage = loadImage("ground.png");
  invisibleGroundImage = loadImage("ground.png");

  ob1 = loadImage("ob1.png");
  ob2 = loadImage("ob2.png");
  ob3 = loadImage("ob3.png");
  ob4 = loadImage("ob4.png");
  ob5 = loadImage("ob5.png");
  ob6 = loadImage("ob6.png");

  over = loadImage("over.png");
  replayI = loadImage("replay.png");
  
  l1I = loadImage("life.png");

}



function setup() {
  createCanvas(800, 400);

  backg = createSprite(380, 490, 20, 20);
  backg.addImage(backgI);
  backg.scale = 4;

  monkey = createSprite(80, 340, 20, 20);
  monkey.addAnimation("running monkey", monkey_running);
  monkey.addAnimation("jumping monkey", monkey_jumping);
  monkey.addAnimation("stop", monkeyS);

  monkey.scale = 0.5;
  //monkey.debug = true;

  ground = createSprite(650, 350, 100, 20);
  ground.addImage("moving ground", groundImage);
  ground.scale = 2;

  invisibleGround = createSprite(100, 370, 100, 20);
  invisibleGround.addImage("moving ground", invisibleGroundImage);
  invisibleGround.scale = 2;
  invisibleGround.visible = false;
  invisibleGround.debug = true;

  gameover = createSprite(400, 150, 20, 20);
  gameover.addImage("game over", over);
  gameover.scale = 0.5;
  gameover.visible = false;

  replay = createSprite(400, 300, 20, 20);
  replay.addImage("replay button", replayI);
  replay.scale = 0.3;
  replay.visible = false;
  
  l1 = createSprite(50,20,20,20);
  l1.addImage("life",l1I);
  l1.scale=0.16;
  
  l2 = createSprite(100,20,20,20);
  l2.addImage("life",l1I);
  l2.scale=0.16;
  
  l3 = createSprite(150,20,20,20);
  l3.addImage("life",l1I);
  l3.scale=0.16;
  
  

  monkey.depth = ground.depth = invisibleGround.depth;
  monkey.depth = ground.depth + 1;


  foodGroup = new Group();
  obstacleGroup = new Group();



}


function draw() {
  background(220);

  stroke(20);
  textSize(30);

  text("Survival Time: " + score, 280, 30);
 // text("Life:" + life, 600, 30);

  if (ground.x < -150) {
    ground.x = 750;
  }

  invisibleGround.setCollider("circle", -10, 29, 20);
  monkey.collide(invisibleGround);



  if (gameState === PLAY) {

     food();
     hurdle();

    score = score + 0.05 * 10


    ground.velocityX = -7 - (score / 80);

    if (gameState === PLAY && keyWentDown("space") && monkey.y > 329) {
      monkey.velocityY = -8;

    }

    if (monkey.y < 320) {
      monkey.changeAnimation("jumping monkey", monkey_jumping);
    } else {
      monkey.changeAnimation("running monkey", monkey_rerun);
    }

    if (monkey.y < 130) {
      monkey.velocityY = 8;
    }



    for (var i = 0; i < obstacleGroup.length; i++) {
      if (monkey.isTouching(obstacleGroup.get(i))) {
        obstacleGroup.get(i).destroy();
        life = life - 1;
      }
    }
    
    for(var j=0; j<foodGroup.length; j++){
      if(monkey.isTouching(foodGroup.get(j))){
        foodGroup.get(j).destroy();
      }
    }
    
    if(life<=2){
      l3.visible=false;
    }
    if(life<=1){
      l2.visible=false;
    }
    if(life<1){
      l1.visible=false;
    }
    
    

    if (life === 0 ) {
      gameState = END;

    }

  }





  if (gameState === END) {
    monkey.changeAnimation("stop", monkeyS);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    gameover.visible = true;
    replay.visible = true;

    if (mousePressedOver(replay)) {
      reset();
    }
  }


  drawSprites();
}



function food() {

  if (frameCount % 80 === 0) {

    var rand = Math.round(random(150, 350));

    banana = createSprite(810, rand, 20, 20);
    banana.velocityX = -7 - (score / 80);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.7;
    banana.lifetime = 250;
    //banana.debug = true;
    foodGroup.add(banana);
  }
}

function hurdle() {

  if (frameCount % 100 === 0) {

    var obstacle = createSprite(810, 340, 20, 20);
    obstacle.velocityX = -7 - (score / 80);
    // obstacle.debug = true;
    obstacle.lifetime = 900;
    obstacleGroup.add(obstacle);
    var rand = Math.round(random(1, 6));

    switch (rand) {
      case 1:
        obstacle.addImage(ob1);
        obstacle.scale = 2;
        obstacle.y = 360;
        obstacle.setCollider("circle", 0, 0, 0);
        obstacleGroup.add(obstacle);
        break;
      case 2:
        obstacle.addImage(ob2);
        obstacle.scale = 2;
        obstacle.setCollider("circle", 0, 0, 0);
        obstacleGroup.add(obstacle);

        break;
      case 3:
        obstacle.addImage(ob3);
        obstacle.scale = 2;
        obstacle.setCollider("circle", 0, 0, 18);
        obstacleGroup.add(obstacle);
        break;
      case 4:
        obstacle.addImage(ob4);
        obstacle.scale = 2;
        obstacle.setCollider("circle", 0, 0, 20);
        obstacleGroup.add(obstacle);
        break;
      case 5:
        obstacle.addImage(ob5);
        obstacle.scale = 2;
        obstacle.setCollider("circle", 0, -5, 18);
        obstacleGroup.add(obstacle);
        break;
      case 6:
        obstacle.addImage(ob6);
        obstacle.scale = 1.7;
        obstacle.y = 340;
        obstacle.setCollider("circle", 0, 0, 0);
        obstacleGroup.add(obstacle);
        break;

      default:
        break;

    }

  }

}

function reset() {
  score = 0;
  life = 3;
  gameState = PLAY;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameover.visible = false;
  replay.visible = false;
  l1.visible=true;
  l2.visible=true;
  l3.visible=true;
}