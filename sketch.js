
var PLAY=0;
var END=1;

var ground,groundImg;

var mainPlayer,mainPLayerRide,mainPLayerHit;

var obstacleGroup,ob1,ob2,ob3;

var opponentGroup;

var a_sp,aGroup,opp1,opp1Hit;

var b_sp,bGroup,opp2,opp2Hit;

var c_sp,cGroup,opp3,opp3Hit;

var gameState=PLAY;

var gameOver,gameOverImg;

var score=0;

function preload()
{
groundImg=loadImage("Road.png");

mainPLayerRide=loadAnimation("mainPlayer1.png","mainPlayer2.png");
mainPLayerHit=loadAnimation("mainPlayer3.png");

ob1=loadAnimation("obstacle1.png");
ob2=loadAnimation("obstacle2.png");
ob3=loadAnimation("obstacle3.png");

opp1=loadAnimation("opponent1.png","opponent2.png");
opp1Hit=loadAnimation("opponent3.png");

opp2=loadAnimation("opponent4.png","opponent5.png");
opp2Hit=loadAnimation("opponent6.png");

opp3=loadAnimation("opponent7.png","opponent8.png");
opp3Hit=loadAnimation("opponent9.png");

gameOverImg=loadAnimation("gameOver.png");
}

function setup()
{
createCanvas(windowWidth,windowHeight);

ground=createSprite(width/2,height/2,width,height);
ground.addImage("ground",groundImg);
ground.scale=1;

mainPlayer=createSprite(width/8,height/2);
mainPlayer.addAnimation("ride",mainPLayerRide);
mainPlayer.addAnimation("hit",mainPLayerHit);
mainPlayer.scale=0.1;

obstacleGroup=new Group();
opponentGroup=new Group();

mainPlayer.setCollider("circle",0,0,600);
//mainPlayer.debug = true;

gameOver=createSprite(width/2,height/2)
gameOver.addAnimation("end",gameOverImg);
gameOver.scale=1;

aGroup=new Group();
bGroup=new Group();
cGroup=new Group();
}

function draw()
{
background("white");

drawSprites();

textSize(30);
fill("white");
text("Score: "+ score,width-200,height/12);

if(gameState==PLAY)
{
ground.velocityX=-6;
mainPlayer.y=World.mouseY;
score=score+Math.round(getFrameRate()/60);
ground.velocityX = -(6 + 2*score/150);
spawnObstacle();

gameOver.visible=false;

    if(ground.x<0)
     {
       ground.x=ground.width/2;
     }

     var r=Math.round(random(1,3))

     if(frameCount%125==0)
     {
     if(r==1)
     {
       spawnA();
     }
     else if(r==2)
     {
       spawnB();
     }
     else
     {
      spawnC();
     }
    }

      if(obstacleGroup.isTouching(mainPlayer))
        {
       gameState=END; 
      }

     if(aGroup.isTouching(mainPlayer))
     {
      
      gameState=END;
      
      aGroup.setVelocityXEach(0);
      console.log("a change")
      a_sp.addAnimation("a",opp1Hit);
      
           
     }
      if(bGroup.isTouching(mainPlayer))
     {
      gameState=END;
      console.log("b change")
      bGroup.setVelocityXEach(0);
      b_sp.addAnimation("b",opp2Hit);
       
     }
      if(cGroup.isTouching(mainPlayer))
     {
      gameState=END;
      console.log("c change")
      cGroup.setVelocityXEach(0);
      c_sp.addAnimation("c",opp3Hit);
       
     }
      
}

else if(gameState==END)
{
     
      gameOver.visible=true;
     
     

      textSize(30);
      fill("white");
      text("press 'enter' to start again",width/2-170,height/2+100);

      ground.velocityX=0;
      mainPlayer.velocityX=0;
      mainPlayer.changeAnimation("hit",mainPLayerHit);
   

     
      obstacleGroup.setVelocityXEach(0);
      aGroup.setVelocityXEach(0);
      bGroup.setVelocityXEach(0);
      cGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      aGroup.setLifetimeEach(-1);
      bGroup.setLifetimeEach(-1);
      cGroup.setLifetimeEach(-1);
      
  if(keyDown("enter"))
   {
    restart();
    mainPlayer.changeAnimation("ride",mainPLayerRide);
   }
}

}

function spawnObstacle()
{
  if(frameCount%100==0)
  {
  var obstacle=createSprite(width,height/2);
  obstacle.velocityX = -(6 + 2*score/150);
  obstacle.y=Math.round(random(height/12,height));

var rand=Math.round(random(1,3));

switch(rand)
{
case 1:
  obstacle.addAnimation("cone",ob1);
  break;

case 2:
  obstacle.addAnimation("manhole",ob2);
  break;
 
case 3:
  obstacle.addAnimation("chain",ob3); 
  break;
  
default:break;
}
obstacle.scale = 0.1;
obstacle.lifetime = 300;
obstacleGroup.add(obstacle);
obstacle.setCollider("circle",0,0,200);
obstacle.debug = true;
  }

}

function spawnA()
{
    a_sp=createSprite(width,height/2);
    a_sp.y=Math.round(random(height/12,height))
    a_sp.addAnimation("a",opp1);
    a_sp.velocityX = -(6 + 2*score/150);
    a_sp.scale=0.1;
    a_sp.setlifetime=300;
    
    a_sp.setCollider("circle",0,0,600);
    aGroup.add(a_sp);
}

function spawnB()
{
    b_sp=createSprite(width,height/2);
    b_sp.y=Math.round(random(height/12,height))
    b_sp.addAnimation("b",opp2);
    b_sp.velocityX = -(6 + 2*score/150);
    b_sp.scale=0.1;
    b_sp.setlifetime=300;
    
    b_sp.setCollider("circle",0,0,600);
    bGroup.add(b_sp);
    
  
}

function spawnC()
{
    c_sp=createSprite(width,height/2);
    c_sp.y=Math.round(random(height/12,height))
    c_sp.addAnimation("c",opp3);
    c_sp.velocityX = -(6 + 2*score/150);
    c_sp.scale=0.1;
    c_sp.setlifetime=300;
    
    c_sp.setCollider("circle",0,0,600);
    cGroup.add(c_sp);
    
  
}

function restart()
{
  score=0;
  mainPlayer.addAnimation("ride",mainPLayerRide);
  gameState=PLAY;
  
  aGroup.destroyEach();
  bGroup.destroyEach();
  cGroup.destroyEach();

  obstacleGroup.destroyEach();
}
