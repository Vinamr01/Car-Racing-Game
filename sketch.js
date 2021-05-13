const Bodies = Matter.Bodies;
var car , carImage;
var roadImage;
var backGround;
var restart , restartImage;
var obstacle ,obstacle1,obstacle2,obstacle3,obstacle4;
var gameState;
var end;
var score;

var obstacleGroup;


function preload() {
	carImage = loadImage("car.png");
  roadImage = loadImage("road1.png");
	restartImage = loadImage("restart.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
} 

function setup() {
 createCanvas(800,700);

	backGround = createSprite(800,50,900,0)
	backGround.addImage(roadImage);
	backGround.scale = 7.2;
	backGround.velocityX = -4;
 
 

  car = createSprite(100 , 200 , 100 , 5);
  car.addImage(carImage);

	restart = createSprite(400,350,50,50);
	restart.addImage(restartImage);
  restart.visible = false;
  
  obstacle = createSprite(Math.round(random(500, 700)), Math.round(random(100, 200)),5 , 5);
 
  gameState = 1;
  score = 0;
 obstacleGroup = new Group();

  end = new End();
 
    
}


function draw() {
  background(180);
  end.display();

 
  
 
   
  if(gameState === 1){
  
  if (frameCount % 50 === 0) {

   obstacle.scale =   0.5;
   
    //obstacle.x = random(400,700);
    //obstacle.y = random(100,600);

    obstacle.lifetime = 200;
    obstacle.depth = car.depth;
    car.depth += 1;
    obstacleGroup.add(obstacle);
    
    
     var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    
    }
  
}

 
 
  if (backGround.x < 90) {
    backGround.x = backGround.width / 2;
  }

  if (keyDown("up")) {
    car.y = car.y - 2;
  }

  if (keyDown("down")){
    car.y = car.y + 2;
  }

  car.setCollider("rectangle" , 100 , 200 , 100 , 5);
  obstacle.setCollider("rectangle" , obstacle.x, obstacle.y , 5,5);
  obstacle.velocityX = -1;
  obstacle.shapeColor = color(91 , 74 , 66);


  if(car.x == obstacle.x-140){
    gameState = 2;
  }


}else if (gameState === 2){
  restart.visible =true;
  car.visible = false;
  obstacle.visible = false;
  backGround.velocityX = 0;
     score = 0;

     if(mousePressedOver(restart)){
       gameState = 1;
    restart.visible =false;
     car.visible = true;
     obstacle.visible = true;
     backGround.velocityX = -4;
     obstacle.x = Math.round(random(500, 700))
     obstacle.y = Math.round(random(100, 200));
     obstacle.width = 5;
     obstacle.height = 5;
     car.x = 100;
     car.y = 200;

     }
  }


  
 drawSprites();

  textSize(20)
  fill ("white")
  text("Distance: "+ score + " M", 20,50);
   score = score + Math.round(getFrameRate()/60);

}

