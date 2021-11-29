/** @module Client */

/**
 * Creates a new list item in the chat box and adds the text recieved server.
 * @constant
 * @param {String} text - Text to be sent into the chat box.
 */
 const writeEvent = (text) => {
    const parent = document.querySelector('#events')

    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);

};

/**
 * Writes the game over text to the empty h1 tag in the html.
 * @constant
 * @param {String} text - Text to be written inside the tag.
 */
const writeGameOver = (text) => {
    const h1 = document.querySelector('#gameOver')
    h1.innerHTML = text;
};

/**
 * Spawns a new power up on the board.
 * @constant
 * @param {Array} signal - An array when the index 0 is the row of the cell and index 1 is the collumn. Index 2 is the type of power up to be spawned.
 */
const spawnPowerUpEvent = (signal) => {
    cells[signal[0]][signal[1]] = types.powerUp;
    powerUpList.push(new PowerUp(signal[0],signal[1],signal[2]));
    console.log("powerUpSpawn");
};

/**
 * Takes a movement event from the server and calls a function to move the player.
 * @constant
 * @param {int} playerID - ID of the player to be moved.
 * @param {String} dir - Direction to move the player.
 */
const moveEvent = (signal) => {
    //movePlayers(dir,1);
    console.log(signal);
    tempArr = signal.split(",");
    sockID = tempArr[0]
    dir = signal.split(",")[1];
    PID = checkPlayer(sockID);
    console.log(PID);
    // console.log(sockID);
    if (PID == 1 || PID == 2 || PID == 3 || PID == 4){
        movePlayer(PID, dir);
    }
};

/**
 * Takes a place bomb event from the server and calls a function to place the bomb.
 * @constant
 * @param {String} sockID - ID of the player who is placing the bomb.
 */
const placeBombEvent = (sockID) => {
    
    PID = checkPlayer(sockID);
    console.log(PID);
    // console.log(sockID);
    if (PID == 1 || PID == 2 || PID == 3 || PID == 4){
        placeBomb(PID);
        console.log(PID + "Place the bomb");
    }
};

/**
 * Adds a new player into the game by pasing their socketID into the game.
 * @constant
 * @param {String} sockID - Socket ID of the player who is joining.
 */
const addPlayerEvent = (sockID) => {
    addPlayer(sockID);
}

/**
 * When a new player joins this is used to send them the current list of active players in the game.
 * @constant
 * @param {String} requestFrom - Socket ID of the player who is joining and requires the list of players.
 */
const sendPlayerInfo = (requestFrom) => {
    console.log("sock comparison " + sock.id + "  " + requestFrom);
    if (sock.id !== requestFrom){
        console.log("sent player info");
        tempArr = [P1, P2, P3, P4, waitList];
        sock.emit("playerList", tempArr);
    }
}

/**
 * Updates all of the active players in the game including the wait list.
 * @constant
 * @param {Array} playerInfo - Array of all of the active players in the game.
 */
const updatePlayerList = (playerInfo) => {
    console.log("received player list");
    P1 = playerInfo[0];
    P2 = playerInfo[1];
    P3 = playerInfo[2];
    P4 = playerInfo[3];
    waitList = playerInfo[4];
}

/**
 * Removes a new player from the game by deleting their socketID from the game.
 * @constant
 * @param {String} sockID - Socket ID of the player who is leaving.
 */
const removePlayerEvent = (disconnectedSock) => {
    console.log("removed player event called");
    removePlayer(disconnectedSock);
}

/**
 * When a new player joins this is used to send them the current game state.
 * @constant
 * @param {String} requestFrom - Socket ID of the player who is joining and requires the game state.
 */
const sendGameState = (requestFrom) => {
    if (sock.id !== requestFrom){
        tempArr = [cells, player, player2, player3, player4];
        sock.emit("updateGameState", tempArr);
        console.log("sent game state");
    }
}

/**
 * Updates the game board and all of the charecters in the game.
 * @constant
 * @param {Array} gameState - Includes the game board in index 0 and the current state of all charecters in index 1-4.
 */
const updateGameStateEvent = (gameState) => {
    console.log("Game State Updating");
    cells = gameState[0];
    player.copyPlayer(gameState[1]);
    player2.copyPlayer(gameState[2]);
    player3.copyPlayer(gameState[3]);
    player4.copyPlayer(gameState[4]);
    console.log("Game State Updated");
}

/**
 * Takes a generate new level event from the server and calls a function to generate the level.
 * @constant
 */
const generate = () => {
    generateLevel();
};

/**
 * Handles a from submition by sending the text in the input field to the server and clearing the input field.
 * @constant
 *
 */
const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
};

/**
 * Listens for keypresses and if valid game key, sends the coresponding signal to the server.
 * @constant
 */
const keyPressListener = () => {
    document.addEventListener('keydown', function(e) {
        // left arrow key
        if (e.which === 65) {
            // sock.emit('message', sock.id + "left");
            sock.emit('movement', sock.id + ",left");
        }
        // up arrow key
        else if (e.which === 87) {
            sock.emit('movement', sock.id + ",up");
        }
        // right arrow key
        else if (e.which === 68) {
            sock.emit('movement', sock.id + ",right");
        }
        // down arrow key
        else if (e.which === 83) {
            sock.emit('movement', sock.id + ",down");
        }
        // spacebar key
        else if (e.which === 32) {
            sock.emit('placeBomb', sock.id);
        }
        
    });
};



/**
 * Listens for the start game button to be pressed, and sends a signal to the server to generate the level.
 * @constant
 */
const generateListener = () => {

    const button = document.getElementById('generate');
    button.addEventListener('click', () => {
        sock.emit('message', id);
        sock.emit('generate');
    });
};

// writeEvent("Welcome to RPS");

const sock = io();
sock.on('message', writeEvent);
sock.on('gameOverMessage', writeGameOver);
sock.on('movement', moveEvent);
sock.on('generate', generateLevel);
sock.on('placeBomb', placeBombEvent);
sock.on('addPlayer', addPlayerEvent);
sock.on('requestPlayerList', sendPlayerInfo);
sock.on('playerList', updatePlayerList);
sock.on('removePlayer', removePlayerEvent);
sock.on('requestGameState', sendGameState);
sock.on('updateGameState', updateGameStateEvent);
sock.on('spawnPowerUp', spawnPowerUpEvent);

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);
keyPressListener();