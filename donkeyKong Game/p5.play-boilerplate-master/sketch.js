
function preload() {

 path=loadImage("../pink-path2.png");
 ladder=loadImage("../ladder.png");
 marioImg=loadImage("../mario2.webp");
 barrelimg = loadImage("../barrel-removebg-preview.png")
 DKimg = loadImage("../DK.png");
 marioHurting = loadSound("../mario loses a life.wav");
 marioWon = loadSound("../winSound.wav");
 marioLost = loadSound("../loseSound.wav");
 console.log(barrelimg);

}


function setup() {
  createCanvas(800,600);

  floor1=createSprite(400, 550, 800, 30);

  //floor1.shapeColor = "pink"
  floor1.addImage(path)

  ladder1=createSprite(700, 430, 800, 10);
  ladder1.addImage(ladder);
  ladder1.scale = 0.8;

  floor2=createSprite(400,350, 800, 30);
  floor2.addImage(path);

  ladder2=createSprite(100, 245, 800, 10);
  ladder2.addImage(ladder);
  ladder2.scale = 0.6;

  floor3=createSprite(400,150, 800, 30);
  floor3.addImage(path);


  mario=createSprite(400, 500, 30, 30);
  edges = createEdgeSprites()
  mario.addImage(marioImg);
  mario.scale = 0.1;

  DK=createSprite(650,70, 30, 30);
  DK.addImage(DKimg);
  DK.scale = 0.3;

  barrelGroup = new Group();

  lives = 5 ;

  gameState = "play" ;

}

function draw() {
  background(0,0,0);
  
  if(gameState === "play"){

    spawnBarrels();

    stroke("white");
    textSize(20);
    fill("white");
    text("lives: " + lives, 700,50);
    if(mario.isTouching(DK)){

      background("green");
      text("you won" , 400,300);
      marioWon.play();
    }
      if(keyDown("LEFT_ARROW")){
 
        //mario.velocityX = 10; 
        mario.x -= 3;
    
          }
      
    

 if(keyDown("RIGHT_ARROW")){
 
    //mario.velocityX = 10; 
    mario.x += 3;

  }

  if(keyDown("space")) {
    mario.velocityY = -8;
  }
mario.velocityY += 0.8;

mario.collide (floor1);
mario.collide (floor2);
mario.collide (floor3);

  drawSprites();

  }

  
  
  if(mario.isTouching(barrelGroup) && gameState === "play"){

    gameState = "restart" ;
    if(lives > 0 ){
      console.log(lives);
      lives -= 1;
      marioHurting.play();

    }
  
    else {
      console.log(lives);
      gameState = "end";

    }
  }

    if(gameState === "restart"){

      barrelGroup.removeSprites();
      text("press enter to restart" , 400,300);

    }

    if(keyDown ("enter")){

      gameState = "play";

    }

    if(gameState === "end"){

      barrelGroup.removeSprites();
      background("red");
      textSize(20);
      text("you lost" , 400,300);
      marioLost.play();
    }

      /*if(mario.isTouching(edges[0])){

      mario.velocityX = -0.5;
      mario.x = 20;
      
   }

   if(mario.isTouching(edges[1]) ){

    mario.velocityX = 0.5;
    mario.x = 780;
    
 }*/







  

      if(mario.isTouching(ladder1) && mario.x >+ 700){
       
        mario.y = 300;
     
      }

      if(mario.isTouching(ladder2) && mario.x <+ 700){
    
        mario.y = 130;
      }

     // if(keyIsDown (RIGHT_ARROW)) {

    
     //   console.log()

      //}
  
 

}
 
function spawnBarrels(){

  if(frameCount % 100 === 0){

    var barrel = createSprite(650,100);
    barrel.addImage ( barrelimg );
  barrel.scale = 0.07;
  barrel.rotation = 35

 barrel.velocityX = - (Math.random()*5);
  console.log(barrel.velocityX);
 barrelGroup.add(barrel);
 
for(var i = 0; i < barrelGroup.length; i++){

  if (barrelGroup[i].isTouching(edges[0])){

    console.log("checking"+ i);
    //barrel.y = 220;
    //barrel.velocityX = 2;
    
   barrelGroup.get(i).y = 300;
   // barrelGroup.get (i). collide(floor2);
    barrelGroup.get (i).velocityX = 2;
        }

}


  }

}
