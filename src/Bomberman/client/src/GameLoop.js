/** @module GameLoop */

/** @var {timestamp} last variable to store last timestamp when it was checked. */
let last;
/** @var {timestamp} timeDifference variable to store difference in timestamp. */
let timeDifference;
/** @var {Player} player initialize first player. */
let player = new Player(1);
/** @var {Player} player2 initialize second player. */
let player2 = new Player(2);
/** @var {Player} player3 initialize third player. */
let player3 = new Player(3);
/** @var {Player} player4 initialize forth player. */
let player4 = new Player(4);
/** @var {Array<Player>} playerList Array containing list of all players. */
let playerList = [player,player2,player3,player4];
/** @var {Array<PowerUp>} powerUpList Array containing list of all players. */
let powerUpList = [];


/**
 * Loop is a constant loop that continously runs while the game is played an updates the visuals on the screen. It views all cells on the board and draws any
 * existing walls, along with rendering players, bombs, and explosions in their current position. Also removes dead entities from the board.
 * @function
 * @param {timestamp} timestamp - Current timestamp.
 */
function loop(timestamp) {
  requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);

  // calculate the time difference since the last update. requestAnimationFrame
  // passes the current timestamp as a parameter to the loop
  if (!last) {
    last = timestamp;
  }
  timeDifference = timestamp - last;
  last = timestamp;

  // update and render everything in the grid
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      switch(cells[row][col]) {
        case types.wall:
          context.drawImage(wallCanvas, col * grid, row * grid);
          break;
        case types.softWall:
          context.drawImage(softWallCanvas, col * grid, row * grid);
          break;
        case types.powerUp:
          powerUpList.forEach((p) => {
            if (p.checkCell(row,col)){
              p.render();
            }
          });
          break;
      }
    }
  }

  // update and render all entities
  entities.forEach((entity) => {
    entity.update(timeDifference);
    entity.render();
  });

  // remove dead entities
  entities = entities.filter((entity) => entity.alive);
  playerList.forEach((p) => {
    if (p.isPlayerAlive()){
      p.render();
    }
  });
}