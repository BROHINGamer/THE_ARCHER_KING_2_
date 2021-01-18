const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var b_img;
var player;
var p_img;
var target;
var t_img;
var gameState="onSling";
var score=0;
var arrow1,arrow2,arrow3,arrow4,arrow5
var arrows=[]

function preload(){
b_img=loadImage("images.png")
p_img=loadImage("player.png")

}

function setup(){
  var canvas=createCanvas(displayWidth-20,displayHeight-30);
 
  engine=Engine.create();
  world=engine.world
  player=createSprite(100,displayHeight/2)
  player.addImage(p_img);
 
  form=new Form();
  arrow1=new Arrow(200,displayHeight/2)
  arrow2=new Arrow()
  arrow3=new Arrow()
  arrow4=new Arrow()
  arrow5=new Arrow()
  
  arrows.push(arrow5);
  arrows.push(arrow4);
  arrows.push(arrow3);
  arrows.push(arrow2);
  arrows.push(arrow1);
  //form.display();
chain=new Chain(arrow1.body,{x:200,y:displayHeight/2})


}
function draw(){
  background(b_img);
  Engine.update(engine);

  fill("black")
  text("mouseX:"+mouseX,displayWidth/2,displayHeight/2)
  text("mouseY:"+mouseY,displayWidth/2,displayHeight/2+50)
arrow1.display();
arrow2.display();
arrow3.display();
arrow4.display();
arrow5.display();
chain.display();
drawSprites()
}
function mouseDragged(){
  if(gameState!=="launched")
  {
      Matter.Body.setPosition(arrows[arrows.length-1].body, {x: mouseX , y: mouseY});
  Matter.Body.applyForce(arrows[arrows.length-1].body,arrows[arrows.length-1].body.position,{x:5,y:-5})

return false;    
}
}



function mouseReleased(){
  chain.fly();
 
  arrows.pop()
 
  gameState="launched"
  return false
}

function keyPressed(){
  if(keyCode === 32&&gameState==="launched"){
      if(arrows.length>=0){
          Matter.Body.setPosition(arrows[arrows.length-1].body, {x: mouseX , y: mouseY});
      
     chain.attach(arrows[arrows.length-1].body);
     gameState="onSling"
     
      }
    }
  }