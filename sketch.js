var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var survivalTime = 0;

function preload(){
  //loading images and animation
  monkey_running =                          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  //creating a canvas
  createCanvas(700,400);

  //creating monkey and adding animation to it
  monkey = createSprite(80,315,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.13;
  
  //creating ground
  ground = createSprite(400,358,900,10);
  //moving the ground
  ground.velocityX = -2.9 ;
  ground.x = ground.width/2;
  
  //creating groups
  foodGroup = new Group();
  obstacleGroup = new Group();
 
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
 
  //initialising score
  score = 0;
  
}

function draw() {
  //creating a black background
  background("black");
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
 
  //jump when the space key is pressed
  if(keyDown("space") &&  monkey.y >= 313){
    monkey.velocityY = -15;
  }
  
  //adding gravity
  monkey.velocityY  = monkey.velocityY + 0.45;
  console.log(monkey.y);
  //making the monkey collide with the ground
  monkey.collide(ground);
  
  //calling the functions
  food();
  obstacles();
  
  //stopping everything when monkey touches the obstacle
  if(monkey.isTouching(obstacleGroup)){
    foodGroup.setVelocityXEach (0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    monkey.velocityY = 0;
  }
  
  //displaying the score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
  //displaying the survival time
  stroke("blue");
  textSize(20);
  fill("blue");
  survivalTime =Math.ceil(frameCount/frameRate());
  text("Survival Time:"+ survivalTime,100,50);
  
  //drawing the sprites
  drawSprites();

}

//creating a function for banana
function food(){
  //creating bananas randomly
  if(frameCount % 80 === 0){
    banana = createSprite(700,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5.7;
    banana.lifetime = 160;
    
    //adding each banana to a group
    foodGroup.add (banana);
    
  }
  
}

//creating a function for obstacles
function obstacles(){
  //creating obstacles randomly
  if(frameCount % 300 === 0){
    obstacle = createSprite(700,328,15,15);
    obstacle.addImage (obstacleImage);
    obstacle.scale = 0.13;
    obstacle.velocityX = -3.1;
    obstacle.lifetime = 300;
   
    obstacle.setCollider("circle",0,0,140); 
    obstacle.debug = false;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding each obstacles to a group
    obstacleGroup.add(obstacle);
 
  }
  
}
