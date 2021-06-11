var monkey,food,forest,rock,monkey_Img,food_Img,forest_Img;
var invisibleG,PLAY,END,gameState,SERVE,mgh,play,mgh_Img,play_Img;
var monkeyStatic_Img,monkey5,rock1,rock2,rock3,rock4;
var banana_Img,score,time,rockGroup,bananaGroup,point_Img;
var restart,restart_Img,banana;
function preload(){
  forest_Img=loadImage("forest.jpg");
  monkey_Img=loadAnimation("monkey.png","monkey2.png","monkey3.png");
  mgh_Img=loadImage("mgh1.png");
  play_Img=loadImage("playy.png");
  monkeyStatic_Img=loadImage("monkey.png");
  rock1=loadImage("rockstnew.png");
  rock2=loadImage("Mrocknew.png");
  rock3=loadImage("rock4new.png");
  rock4=loadImage("rockienew.png");
  banana_Img=loadImage("Mbanana.png");
point_Img=loadAnimation("+5.png");
  restart_Img=loadImage("restrt.png");
 
}

function setup(){
  createCanvas(450,400);
  forest=createSprite(200,220,400,400);
  forest.addAnimation("forest",forest_Img);
  forest.scale=1.1;
  forest.x=forest.width/2;
 
  
  invisibleG=createSprite(200,395,800,2);
  invisibleG.visible=false;
  
  monkey= createSprite(50,360,15,15);
//  monkey.addAnimation("monkey",monkey_Img);
  monkey.scale=0.6;
  
  mgh=createSprite(240,200,15,15);
  mgh.addAnimation("mgh",mgh_Img);
  
  play=createSprite(250,230,15,15);
  play.addAnimation("play",play_Img);
  play.scale=0.4;
  
  monkey5= createSprite(50,360,15,15);
  monkey5.addAnimation("monkey",monkey_Img);
  monkey5.scale=0.6
  monkey5.visible=false;
  
  rockGroup= new Group();
  bananaGroup=new Group();
  
  restart=createSprite(205,230,15,15);
  restart.addAnimation("restart",restart_Img);
  restart.visible=false;
 
 
  
  score=0;
  time=40;
  
  PLAY=2;
  END=1;
  SERVE=0;
  gameState=SERVE;
  
  createEdgeSprites();
  
}

function draw(){
 background("white");
 drawSprites();
 monkey.collide(invisibleG);  
 monkey5.collide(invisibleG);  
 if(gameState===SERVE){
   monkey.addAnimation("monkey2",monkeyStatic_Img);
    fill("red");
     textFont("Arial Black")
   textSize(13);
     text("get banana to earn 5 points",130,260);
   if(mousePressedOver(play)){
    gameState=PLAY; 
    
   }
 
 }else if(gameState===PLAY){
   //  monkey.changeAnimation("monkey",monkey_Img);
   monkey.visible=false;
     mgh.visible=false;
    play.visible=false;
   monkey5.visible=true;
   restart.visible=false;
   forest.velocityX=-6;
   
   if(keyDown("space")&&monkey5.y>=340){
   monkey5.velocityY=-12;
   }
   monkey5.velocityY=monkey5.velocityY+0.8;
   if(forest.x<0){
   forest.x=forest.width/2;
 }  
   SpawnClouds();
   banana();
   textFont("Arial Black");
   textSize(20);
   fill("red");
   if(World.frameCount %30===0){
   time=time-1;
 }
 text("TIME:"+time,40,50);
   
   if(bananaGroup.collide(monkey5)){
    score=score+5;
      
   
     bananaGroup.destroyEach();
   
   }
   text("SCORE:"+score,280,50);
   
   if(rockGroup.isTouching(monkey5)||time===0){
   gameState=END;
   }
   }else if (gameState===END){
     forest.velocityX=0;
     rockGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     rockGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     monkey5.visible=false;
     monkey.visible=true;
     monkey5.velocityY=0;
     fill("red");
     textFont("Arial Black");
     textSize(30);
     text("GAME OVER",130,200);
     restart.visible=true;
      if(mousePressedOver(restart)){
        gameState=PLAY;
        rockGroup.destroyEach();
        bananaGroup.destroyEach();
        score=0;
        time=40;
   }
   
   
 
   
  
  
}

function SpawnClouds(){
  if(frameCount %70===0){
     var rock=createSprite(400,375,15,15);
    var rand=Math.round(random(1,4));
    rock.velocityX=-(5+score/2);
    switch(rand){
        case 1:rock.addImage(rock1);
        break;
        case 2:rock.addImage(rock2);
        break;
        case 3:rock.addImage(rock3);
        break;
        case 4:rock.addImage(rock4);
        break;
        default:rock.addImage(rock1);
    }
    rock.scale=0.19;
    rock.lifetime=90;  
     // rock.debug=true;
     rock.setCollider("rectangle",30,70,150,168);
    rockGroup.add(rock); 
 
  }
  
}

function banana(){
  if(frameCount %120===0){
var banana=createSprite(400,200,15,15);
   banana.addAnimation("banana",banana_Img);
 banana.addAnimation("point",point_Img);
   banana.y=random(270,300);
   banana.scale=0.05;
   banana.velocityX=-(4+score/2);
   banana.lifetime=115; 
   
   bananaGroup.add(banana); 
  }
  
  }













}