//variables for sprites
var playerS, back1_1, back1_2, edges, bottom;
var life1, life2, life3;

//varibles for groups
var gBullet, gEnemy;

//variables for resources
var shipP, backImg1, backImg2, bullImg, ship1, ship2, ship3, ship4, Game, heart;

//variables for extras
var gameState = 0;
var lives = 3;
var score = 0;
var shootA = true;
var speed;
var Enx;

function preload() {
  shipP = loadImage("Resource/Invade.gif");
  backImg1 = loadImage("Resource/Back1.png");
  backImg2 = loadImage("Resource/Back2.png");
  bullImg = loadImage("Resource/Bullet.png");
  ship1 = loadImage("Resource/Ship1.png");
  ship2 = loadImage("Resource/Ship2.png");
  ship3 = loadImage("Resource/Ship3.png");
  ship4 = loadImage("Resource/Ship4.png");
  Game = loadImage("Resource/gameOver.jpg");
  heart = loadImage("Resource/health.png");
}

function setup() {
  createCanvas(700, 500);

  textSize(19);
  fill("red");

  //background
  back1_1 = createSprite(350, 250);
  back1_1.addImage(backImg1);
  back1_2 = createSprite(350, -250);
  back1_2.addImage(backImg1);

  //player ship
  playerS = createSprite(350, 450);
  playerS.addImage(shipP);

  //egde sprites
  bottom = createSprite(350, 496, 750, 3);
  bottom.visible = 0;
  edges = createEdgeSprites();

  //life hearts
  life1 = createSprite(560, 30);
  life2 = createSprite(580, 30);
  life3 = createSprite(600, 30);
  life1.addImage(heart);
  life2.addImage(heart);
  life3.addImage(heart);
  life1.visible = 0;
  life2.visible = 0;
  life3.visible = 0;

  //groups
  gBullet = new Group();
  gEnemy = new Group();
}

function draw() {
  background(230);
  showMouse(75, 25, "p", true);

  stage = gameState;

  if (lives === 0) {
    gameState = "over";
  }

  if (gameState === 0) {
    if (keyWentDown("space")) {
      gameState = 1;
    }

    back1_1.visible = 0;

    back1_1.velocityY = 0;
    back1_2.velocityY = 0;
    back1_1.y = 250;
    back1_2.y = -250;
  } else if (gameState === 1) {
    speed = 6;

    back1_1.visible = 1;
    back1_2.visible = 1;
    back1_1.addImage(backImg1);
    back1_2.addImage(backImg1);

    //moving background
    back1_1.velocityY = speed;
    back1_2.velocityY = speed;
    if(back1_1.y > 749){
      back1_1.y = -249;
    }
    if(back1_2.y > 749){
      back1_2.y = -249;
    }

    //player ship movement
    playerS.x = mouseX;

    if (keyWentDown("space") && shootA === true) {
      shoot();
      shootA = false;
      setTimeout(() => {
        shootA = true;
      }, 700);
    }

    if (frameCount % 80 === 0) {
      spawnEnemy(speed + 2);
    }
    gEnemy.bounceOff(edges);

    if (gEnemy.isTouching(bottom)) {
      gEnemy.destroyEach();
      lives = lives - 1;
    }

    if (gEnemy.isTouching(gBullet)) {
      gEnemy.destroyEach();
      score++;
    }

    if (score === 10) {
      gameState = 2;
    }
  } else if (gameState === 2) {
    if(speed <= 8){
      speed+=0.2;
    }

    back1_1.addImage(backImg2);
    back1_2.addImage(backImg2);
    back1_1.velocityY = speed;
    back1_2.velocityY = speed;
    if(back1_1.y > 749){
      back1_1.y = -249;
    }
    if(back1_2.y > 749){
      back1_2.y = -249;
    }

    //player ship movement
    playerS.x = mouseX;

    if (keyWentDown("space") && shootA === true) {
      shoot();
      shootA = false;
      setTimeout(() => {
        shootA = true;
      }, 800);
    }

    if (frameCount % 80 === 0) {
      spawnEnemy(speed + 2);
    }
    gEnemy.bounceOff(edges);

    if (gEnemy.isTouching(bottom)) {
      gEnemy.destroyEach();
      lives = lives - 1;
    }

    if (gEnemy.isTouching(gBullet)) {
      gEnemy.destroyEach();
      score++;
    }
  } else if (gameState === "over") {
    back1_1.addImage(Game);
    back1_1.velocityY = 0;
    back1_2.velocityY = 0;
    back1_1.y = 250;
    back1_2.y = -250;

    if(keyWentDown("space")){
      gameState = 0;
      lives = 3;
      score = 0;
      playerS.x = 350;
    }
  }

  drawSprites();
  textSize(12);
  text("Version: Beta 1.0", 600, 490);
  if (gameState === 0) {
    textSize(19);
    text("Press space to start", 270, 240);
    textSize(16);
    text("Lives: " + lives, 320, 270);
    life1.visible = 0;
    life2.visible = 0;
    life3.visible = 0;
  } else if (gameState === 1 || gameState === 2) {
    textSize(16);
    text("Press space to shoot. Use the mouse to move the space ship", 140, 55);
    text("Score: " + score, 75, 30);
    text("Stage: " + stage, 325, 30);
    if(lives === 3){
      life1.visible = 1;
      life2.visible = 1;
      life3.visible = 1;
    }
    if(lives === 2){
      life1.visible = 1;
      life2.visible = 1;
      life3.visible = 0;
    }
    if(lives === 1){
      life1.visible = 1;
      life2.visible = 0;
      life3.visible = 0;
    }
  } else if (gameState === "over") {
    textSize(19);
    text("Score: " + score, 75, 300);
    text("Press space to restart", 260, 300);
    text("Stage: " + stage, 540, 300);
    life1.visible = 0;
    life2.visible = 0;
    life3.visible = 0;
  }
}

function shoot() {
  var bullet = createSprite(playerS.x, playerS.y);
  bullet.addImage(bullImg);
  bullet.velocityY = -45;
  bullet.lifetime = 13;
  bullet.depth = playerS.depth;
  playerS.depth = playerS.depth + 1;

  gBullet.add(bullet);
}

function spawnEnemy(y) {
  var img = loadImage("Resource/Ship" + Math.round(random(1, 4)) + ".png");
  nop();
  var x = random(3, 7) * Enx;
  var enemy = createSprite(random(10, 690), -1);
  enemy.addImage(img);
  enemy.velocityY = y;
  enemy.velocityX = x;

  gEnemy.add(enemy);
}

function nop() {
  var ret = Math.round(random(0, 1));
  if (ret === 0) {
    Enx = 1;
  } else if (ret === 1) {
    Enx = -1;
  }
}