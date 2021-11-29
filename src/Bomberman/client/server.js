/** @module Server */

/**
 * Defines the express variable.
 * @constant
 */
const express = require('express');

/**
 * Defines the socketio variable.
 * @constant
 */
const socketio = require('socket.io');

/**
 * Defines the app using express.
 * @constant
 */
const app = express();

/**
 * Defines the http connection.
 * @constant
 */
const http = require('http');
const { sign } = require('crypto');

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

/**
 * Creates the server using the http connection.
 * @constant
 */
const server = http.createServer(app);

/**
 * Defines the input/output channel on the server using socketio.
 * @constant
 */
const io = socketio(server);

/**
 * Defines connecting to the socket and how to handle different messages recieved from the connected clients.
 * @constant
 * @param {socketio} sock - The socket which the player is connected to.
 */
io.on('connection', (sock) => {
    io.emit('addPlayer', sock.id);
    console.log("Someone Connected");
    sock.emit("message", 'Player Connected');

    //update player list
    io.emit('requestPlayerList', sock.id);
    io.emit('requestGameState', sock.id);
    

    sock.on('updateGameState', (gameState) => {
        io.emit('updateGameState', gameState);
    });

    sock.on('playerList', (playerInfo) => {
        io.emit('playerList', playerInfo);
    });

    sock.on('message', (text) => {
        io.emit('message', text);
    });

    sock.on('gameOverMessage', (text) => {
        io.emit('gameOverMessage', text);
    });

    sock.on('wallDestroyed', (signal) => {
        if (sock.id == signal[0]){
            randNum = Math.floor(Math.random() * 3); 
            if (randNum == 0){
                powerUpType = Math.floor(Math.random() * 3); 
                output = [signal[1], signal[2], powerUpType];
                io.emit('spawnPowerUp', output);
            }
        }
    });

    sock.on('movement', (dir) =>{
        input = dir.split(",");
        // io.emit('message', input[0] + "moved " + input[1]);
        io.emit('movement', dir);
    });

    sock.on('placeBomb', (id) =>{
        io.emit('placeBomb', id);
    });

    sock.on('generate', () =>{
        io.emit('generate');
    });

    sock.on('disconnect', () => {
        io.emit('message', "Player Disconnected");
        io.emit('removePlayer', sock.id);
    });
});



server.on('error', (err) => {
    console.error('Server error:', err)
});

server.listen(process.env.PORT ||3000, () => {
    console.log("RPS stated on 3000");
});


