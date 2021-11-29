/** @module StartGame */

/**
 * A function used to start the game by calling generateLevel and starting the game loop.
 * @function
 */
function startGame() {
    generateLevel();
    requestAnimationFrame(loop);
}

startGame();
