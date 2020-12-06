let game, h1; 
let counter = 0;
let mode = false;
let fr = 30;
let size = 500;
let pos = 100;

let gamestart = false;

function setup() {
  background(255);
  frameRate(fr);
  canvas = createCanvas(size, size);
  canvas.position(pos, pos);
  game = new Game();
  
  h1 = createElement("h1", "Play TIC TAC TOE! Press the left arrow key <br> if you want to start and the right arrow key <br> for the AI to start.");
  h1.position(650, 150);
}

function draw(){
  counter++;
  if(counter == floor(fr*2/3)){
    counter = 0;
  }
  else if(counter < floor(fr/3)){
    mode = true;
  }
  else{
  mode = false;
  }
  background(255);
  game.show(mode);
}

function mousePressed() {
  if(gamestart && mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
    game.Hupdate(mouseX, mouseY);
    game.AIupdate();
  }
}

function keyPressed(){
  if(!gamestart){
    switch(keyCode){
    
    case LEFT_ARROW:
      gamestart = !gamestart;
      game.currentplayer = game.player1;
      break;
      
    case RIGHT_ARROW:
      gamestart = !gamestart;
      game.currentplayer = game.player2;
      game.AIupdate();
      break;
    }
  }
}
