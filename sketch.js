var backgroundimg, zombieimg, playerimg,playerimg2;
var player,zombie,zombieGroup,heart1,heart2,heart3;
var heartimg1,heartimg2,heartimg3,bullet,bulletGroup;
var bullets =70;
var gamestate = "fight";
var lose,wining,explosionsound;
var score = 0;
var life = 3;
var bg;


function preload(){

    backgroundimg = loadImage("assets/bg.jpeg");
    zombieimg = loadImage("assets/zombie.png");
    playerimg  = loadImage("assets/shooter_2.png");
    playerimg2 = loadImage("assets/shooter_3.png");
    heartimg1 = loadImage("assets/heart_1.png");
    heartimg2 = loadImage("assets/heart_2.png");
    heartimg3 = loadImage("assets/heart_3.png");

    lose = loadSound("assets/lose.mp3");
    wining = loadSound("assets/win.mp3");
    explosionsound = loadSound("assets/explosion.mp3");
    
    
}

function setup(){
    createCanvas(windowWidth,windowHeight);

    bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
    bg.addImage(backgroundimg);
    bg.scale = 1.1


    player = createSprite(displayWidth-1150,displayHeight-300);
    player.addImage(playerimg);
    player.scale = 0.5;
    player.debug = true;
    player.setCollider("rectangle",0,0,300,300)

    heart1 = createSprite(displayWidth-150,80);
    heart1.addImage(heartimg1);
    heart1.scale = 0.25;
    heart1.visible = false

    heart2 = createSprite(displayWidth-100,80);
    heart2.addImage(heartimg2);
    heart2.scale = 0.25;
    heart2.visible = false


    heart3 = createSprite(displayWidth-100,80);
    heart3.addImage(heartimg3);
    heart3.scale = 0.25;

    bulletGroup = new Group();



    zombieGroup = new Group();

}

function draw(){
    background(0);

    if (gamestate === "fight"){
        if(life === 3){
            heart3.visible = true;
            heart1.visible = false;
            heart2.visible = false;
        }
        if(life === 2){
            heart3.visible = false;
            heart1.visible = false;
            heart2.visible = true;
        }
        if(life ===1){
            heart3.visible = false;
            heart1.visible = true;
            heart2.visible = false;
        }
    }
    
    if(life === 0){
        gamestate = "lost";
    
    }
    if(score === 100){
        gamestate = "won";
        wining.play();
    }


    if(keyDown(UP_ARROW)|| touches.length>0){
        player.y = player.y-30;
    }

    if(keyDown(DOWN_ARROW)|| touches.length>0){
        player.y = player.y+30;
    }

    if(keyWentDown("space")){
        bullet = createSprite(player.x,player.y-30,20,10);
        bullet.velocityX = 10;
        bulletGroup.add(bullet);
        player.depth = bullet.depth;
        player.depth = player.depth +2;
        bullets = bullets -1;
        explosionsound.play();
    
        player.addImage(playerimg2);
    }

    else if(keyWentUp("space")){
        player.addImage(playerimg);
    }

    if(bullets === 0){
        gamestate = "bullets";
        lose.play();
    }

    if(zombieGroup.isTouching(bulletGroup)){
        for(var i = 0; i<zombieGroup.length; i = i+1){
            if(zombieGroup[i].isTouching(bulletGroup)){
                zombieGroup[i].destroy();
                bulletGroup.destroyEach();
                explosionsound.play();
                score = score + 2;
            }
        }
    }
    if(zombieGroup.isTouching(player)){
        lose.play();
        for(var i = 0; i<zombieGroup.length; i = i+1){
            if(zombieGroup[i].isTouching(player)){
                zombieGroup[i].destroy();
                life = life - 1;
            //   player.destroy;
            }
        }
    }


    enemy()
    

    drawSprites();

// exibir a pontuação e as vidas restantes./
    textSize(20);
    fill("white");
    text("balas ="+bullets,displayWidth - 210,displayHeight/2 - 250);
    text("score ="+score,displayWidth - 200,displayHeight/2 - 220);
    text("vidas ="+life,displayWidth - 200,displayHeight/2 - 280);

    if(gamestate === "lost"){
        textSize(100);
        fill("red");
        text("você perdeu",400,400);
        zombieGroup.destroyEach();
        player.destroy();
    }
    else if(gamestate === "won"){
        textSize(100);
        fill("yellow");
        text("você venceu",400,400);
        zombieGroup.destroyEach();
        player.destroy();
    }
    else if(gamestate === "bullets"){
        textSize(100);
        fill("yellow");
        text("você não tem mais balas",470,410);
        zombieGroup.destroyEach();
        player.destroy();
        bulletGroup.destroyEach();  
    }

}
function enemy(){
    if(frameCount%50===0){
        zombie = createSprite(random(500,1100),random(100,500));
        zombie.addImage(zombieimg);
        zombie.scale = 0.25;
        zombie.velocityX = -10;

        zombie.debug = true;
        zombie.setCollider("rectangle",0,0,500,500)

        zombie.lifetime = 120;
        zombieGroup.add(zombie);
    }
}