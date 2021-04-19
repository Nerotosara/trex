var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY=1;
var END=2;
var gameState;
var obstacleGroup,cloudGroup;
var cloudImage,ObstacleImage1,ObstacleImage2,ObstacleImage3,ObstacleImage4,ObstacleImage5,ObstacleImage6;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImage=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  ObstacleImage1=loadImage("obstacle1.png");
  ObstacleImage2=loadImage("obstacle2.png");
  ObstacleImage3=loadImage("obstacle3.png");
  ObstacleImage4=loadImage("obstacle4.png");
  ObstacleImage5=loadImage("obstacle5.png");
  ObstacleImage6=loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  obstacleGroup=new Group();
  cloudGroup=new Group();
}

function draw() {
  background('white');
  if(gameState === PLAY){
    if(keyDown("space")) {
    trex.velocityY = -10;
      trex.velocityY = trex.velocityY + 0.8
  }
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(trex.isTouching(obstacleGroup)){
      gameState=END;
    }
    Cloud();
  Obstacle();
  }
  else if(gameState===END){
   ground.velocityX=0; 
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}
function Cloud() {
var cloud ;
  if(frameCount%60===0){
    cloud=createSprite(600 ,130,10,10);
cloud.velocityX=-3;
    cloud.y=random(20,160);
cloud.addImage("cloud",cloudImage);
    cloud.scale=0.6;
    cloud.depth=trex.depth;
    trex.depth+=1;
    cloud.lifetime=200;
  
  }
  cloudGroup.add(cloud);
}
function Obstacle() {
  var obstacle;
  if(frameCount%120===0){
    obstacle=createSprite(600,170,20,50);
    obstacle.velocityX=-4;
    var r=Math.round(random(1,6));
    switch(r){
           case 1:obstacle.addImage(ObstacleImage1);
      break;
      case 2:obstacle.addImage(ObstacleImage2);
      break;
      case 3:obstacle.addImage(ObstacleImage3);
      break;
      case 4:obstacle.addImage(ObstacleImage4);
      break;
      case 5:obstacle.addImage(ObstacleImage5);
      break;
      case 6:obstacle.addImage(ObstacleImage6);
      break;
      default:break;
           }
    obstacle.scale=0.5 ;
    obstacleGroup.add(obstacle);
  }
  
}