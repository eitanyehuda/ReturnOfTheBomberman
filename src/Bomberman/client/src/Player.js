/**
 * Represents a Player.
 */
class Player {
  /**
  * Constructor of Player object.
  * @constructs
  * @param {int} id - The id of the player.
  */
  constructor(id) 
  { 
    this.id = id;
    this.shield = false;
    if (id == 1){ this.row = 1; this.col = 1; }
    else if (id == 2){ this.row = 1; this.col = 13; }
    else if (id == 3){ this.row = 11; this.col = 13; }
    else if (id == 4){ this.row = 11; this.col = 1; }
    this.numBombs = 0;
    this.bombSize = 3;
    this.alive = true;
    this.radius = grid * 0.35;
    this.bombLimit = 1;
    // this.powerType = type;
  }
  /**
  * Visually draws the player on the board.
  */
  render(){
    const x = (this.col + 0.5) * grid;
    const y = (this.row + 0.5) * grid;
  
    context.save();
    if (this.id == 1){ context.fillStyle = 'white'; }
    else if (this.id == 2){ context.fillStyle = 'red'; }
    else if (this.id == 3){ context.fillStyle = '#42f5ef'; }
    else if (this.id == 4){ context.fillStyle = '#eb34df'; }
    context.beginPath();
    context.arc(x, y, this.radius, 0, 2 * Math.PI);
    context.fill();
    if (this.shield){
      context.fillStyle = 'rgba(255, 255, 0, 0.5)';
      context.beginPath();
      context.arc(x, y, this.radius+10, 0, 2 * Math.PI);
      context.fill();
    }
  }

  /**
  * Increment the number of bombs a player can place at the same time.
  */
  increaseNumBombs(){
    this.bombLimit++;
  }
  /**
  * Increase the radius of explosions produced by player's bombs by one.
  */
  enlargeBombSize(){
    this.bombSize++;
  }
  /**
  * Adds a sheild to the player.
  */
  shieldUp(){
    this.shield = true;
  }
  /**
  * Increments the number of bombs that are currently placed by this player.
  */
  placedBomb() {
    this.numBombs = this.numBombs + 1;
  }
  /**
  * Decrements the number of bombs that are currently placed by this player.
  */
  bombExploded() {
    this.numBombs = this.numBombs - 1;
  }
  /**
  * Sets player to dead or removes shield if there is one.
  */
  killPlayer() {
    if (this.shield === true){
      this.shield = false;
    }
    else{
      this.alive = false;
    }
  }
  /**
  * check if player is alive.
  */
  isPlayerAlive() {
    return this.alive;
  }
  /**
   * Function that copies all player values for syncronizing purposes when players connect.
   * @param {Player} player - player being copied.
   */
  copyPlayer(player){
    this.row = player.row;
    this.col = player.col;
    this.bombSize = player.bombSize;
    this.numBombs = player.numBombs;
    this.alive = player.alive;
    this.bombLimit = player.bombLimit;
  }
}