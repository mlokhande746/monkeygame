var play = 1;
var end = 0;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime = 0;
var gameState = play;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 200);
  monkey = createSprite(50, 172, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.08;

  ground = createSprite(400, 200, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");

  if (gameState === play) {
    food();
    obstacles();
  }
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  //console.log(monkey.y);
  if (keyDown("space") && monkey.y >= 120) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 1
  //console.log(FrameRate());
  survivalTime = Math.ceil(frameCount / frameRate());
  textSize(15);
  fill("black");
  text("Survival Time:" + survivalTime, 300, 20);
  monkey.collide(ground);

  if (obstacleGroup.isTouching(monkey)) {
    gameState = end;
  }

  if (gameState === end) {
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.velocityX = 0;
    ground.velocityX = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }

  drawSprites();

}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 165, 20, 50);
    banana.velocityX = -4;
    banana.addAnimation("banana", bananaImage);
    banana.y = Math.round(random(120, 100));
    banana.scale = 0.1;
    banana.lifetime = 150;
    banana.depth = monkey.depth;
    monkey.depth += 1;

    foodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 179, 10, 40);
    obstacle.velocityX = -4;
    obstacle.addAnimation("ob", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}