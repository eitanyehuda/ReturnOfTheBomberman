/** @module Collisions */

/**
 * A function that checks if any player collided with an explosion
 * @function
 * @param {int} row - Current row of the Explosion object.
 * @param {int} col - Current col of the Explosion object.
 * @param {Array<Player>} playerList - list of players.
 */
 function collisions(row,col, playerList){
    playerList.forEach((p) => {
        if (p.row === row && p.col === col){
            p.killPlayer();
            
        }
    });
    
}

/**
 * A function that checks if the player collided with a power up
 * @function
 * @param {int} row - Current row of the Player.
 * @param {int} col - Current col of the Player.
 * @param {Array<Player>} owner - player that just moved.
 */
function checkPowerUpType(row, col,owner){
    powerUpList.forEach((p) => {
        if (p.row === row && p.col === col){
            p.usePowerUp(owner);
        }
    });
}