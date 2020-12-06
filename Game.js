class Game{
  constructor(){
    this.winline = [];
    this.board = [[null, null, null],
                  [null, null, null],
                  [null, null, null]];
    this.noplayer = null;
    this.player1 = true;
    this.player2 = false;
    this.currentplayer = true;
    this.done = false;
  }
  
  show(mode){
    stroke(0, 0, 0);
    strokeWeight(3);
    for(let i = 0; i < 4; i++){
      line(width*i/3, 0, width*i/3, height);
      line(0, height*i/3, width, height*i/3);
    }
    for(let y = 0; y < this.board.length; y++){
      for(let x = 0; x < this.board.length; x++){
        if(this.board[y][x] == this.player1){
          line(width*(x+1)/3-width/6, height*(y+1)/3-height/4, width*(x+1)/3-width/6, height*(y+1)/3-(height/3-height/4));
          line(width*(x+1)/3-width/4, height*(y+1)/3-height/6, width*(x+1)/3-(width/3-width/4), height*(y+1)/3-height/6);
        }
        else if(this.board[y][x] == this.player2){
          circle(width*(x+1)/3-width/6, height*(y+1)/3-height/6, width/4);
        }
      }
    }
    if(this.done && mode){
      stroke(255, 0, 0);
      strokeWeight(6);
      line(this.winline[0], this.winline[1], this.winline[2], this.winline[3]);
    }
  } 
  
  Hupdate(x, y){
    if(this.done || this.currentplayer == this.player2){
      return null; 
    }
    let xm = floor(map(x, 0, width, 0, this.board.length));
    let ym = floor(map(y, 0, height, 0, this.board.length));
    if(this.board[ym][xm] == this.noplayer){
      this.board[ym][xm] = this.currentplayer;
      if(this.won(xm, ym, this.currentplayer)){
        this.done = true;
      }
      this.currentplayer = this.player2;
    }
  }
  
  AIupdate(){
    if(this.done || this.currentplayer == this.player1){
      return null;
    }
    let bestscore = Infinity;
    let move;
    for(let y = 0; y < this.board.length; y++){
      for(let x = 0; x < this.board.length; x++){
        if(this.board[y][x] == this.noplayer){
          this.board[y][x] = this.player2;
          let score = this.minimax(x, y, this.player1);
          this.board[y][x] = this.noplayer;
          if(score < bestscore){
            bestscore = score;
            move = [x, y];
          }
        }
      }
    }
    this.board[move[1]][move[0]] = this.player2;
    console.log(this.board);
    if(this.won(move[0], move[1], this.currentplayer)){
      this.done = true;
    }
    this.currentplayer = this.player1;
  }

  minimax(x, y, pl){
    let done = [this.won(x, y, this.player1), this.won(x, y, this.player2)];
    if(done[0]){
      return 1;
    }
    else if(done[1]){
      return -1;
    }
    else if(done[0] == null && done[1] == null){
      return 0;
    }
    
    if(pl == this.player1){
      let bestscore = -Infinity;
      for(let y = 0; y < this.board.length; y++){
        for(let x = 0; x < this.board.length; x++){
          if(this.board[y][x] == this.noplayer){
            this.board[y][x] = this.player1;
            let score = this.minimax(x, y, this.player2);
            this.board[y][x] = this.noplayer;
            if(score > bestscore){
              bestscore = score;
            }
          }
        }
      }
      return bestscore;
    }
    else{
      let bestscore = Infinity;
      for(let y = 0; y < this.board.length; y++){
        for(let x = 0; x < this.board.length; x++){
          if(this.board[y][x] == this.noplayer){
            this.board[y][x] = this.player2;
            let score = this.minimax(x, y, this.player1);
            this.board[y][x] = this.noplayer;
            if(score < bestscore){
              bestscore = score;
            }
          }
        }
      }
      return bestscore;
    }
  }
  
  won(x, y, pl){
    let i;
    let counter = 0;
    for(i = 0; i < this.board.length; i++){
      if(this.board[y][i] == pl){
        counter++;
      } 
    }
    if(counter == this.board.length){
      this.winline = [0, height*y/3+height/6, width, height*y/3+height/6];
      return true;
    }
    
    counter = 0;
    for(i = 0; i < this.board.length; i++){
      if(this.board[i][x] == pl){
        counter++;
      } 
    }
    if(counter == this.board.length){
      this.winline = [width*x/3+width/6, 0, width*x/3+width/6, height];
      return true;
    }
    
    counter = 0;
    for(i = 0; i < this.board.length; i++){
      if(this.board[i][i] == pl){
        counter++;
      } 
    }
    if(counter == this.board.length){
      this.winline = [0, 0, width, height];
      return true;
    }
    
    counter = 0;
    for(i = 0; i < this.board.length; i++){
      if(this.board[i][this.board.length-i-1] == pl){
        counter++;
      } 
    }
    if(counter == this.board.length){
      this.winline = [0, height, width, 0];
      return true;
    }
    
    counter = 0;
    for(let y = 0; y < this.board.length; y++){
      for(let x = 0; x < this.board.length; x++){
        if(this.board[y][x] == this.noplayer){
          counter++;
          break;
        }
      }
    }
    if(counter == 0){
      return null;
    }
    
    return false;
  }
}
