/** @module ActivePlayers */
P1 = "";
P2 = "";
P3 = "";
P4 = "";
waitList = [];

/**
 * Adds a new player into the game by saving their Socket ID into the first avaliable charecter, and if none are avaliable placing them into the wait list.
 * @function
 * @param {String} playerID - The Socket ID of the player entering the game.
 */
function addPlayer(playerID){
    // console.log("Add Players called");
    if (P1 === ""){
        P1 = playerID;
        console.log(playerID + " is player 1");
    } else if (P2 === ""){
        P2 = playerID;
        console.log(playerID + " is player 2");
    } else if (P3 === ""){
        P3 = playerID;
        console.log(playerID + " is player 3");
    } else if (P4 === ""){
        P4 = playerID;
        console.log(playerID + " is player 4");
    } else {
        waitList.push(playerID);
    }

    console.log("P1: " + P1);
    console.log("P2: " + P2);
    console.log("P3: " + P3);
    console.log("P4: " + P4);
}

/**
 * Removes a player from the game by figuring out which player is leaving then replacing them with someone in the wait list. 
 * If the wait list is empty sets the player to null and waits for a new player to connect.
 * @function
 * @param {String} playerID - The Socket ID of the player leaving the game.
 */
function removePlayer(playerID){
    // console.log('Remove Player Called');
    if (P1 === playerID){
        if (waitList.length > 0){
            P1 = waitList.shift();
        } else {
            P1 = "";
            sock.emit('message', "No player available to fill spot");
        }
        console.log('Removed P1, P1 is now: ' + P1);
    } else if (P2 === playerID){
        if (waitList.length > 0){
            P2 = waitList.shift();
        } else {
            P2 = "";
            sock.emit('message', "No player available to fill spot");
        }
        console.log('Removed P2, P2 is now: ' + P2);
    } else if (P3 === playerID){
        if (waitList.length > 0){
            P3 = waitList.shift();
        } else {
            P3 = "";
            sock.emit('message', "No player available to fill spot");
        }
        console.log('Removed P3, P3 is now: ' + P2);
    } else if (P4 === playerID){
        if (waitList.length > 0){
            P4 = waitList.shift();
        } else {
            P4 = "";
            sock.emit('message', "No player available to fill spot");
        }
        console.log('Removed P4, P4 is now: ' + P2);
    }
}
/**
 * Takes in a Socket ID and returns the player ID of which ever charecter the player is controlling. If they are on the wait list it returns 0.
 * @function
 * @param {String} playerID - The Socket ID of the the user we want the player ID of.
 * @returns The player ID of the charecter the player is controlling. Or 0 if none. 
 */
function checkPlayer(playerID){
    if (P1 === playerID) return 1;
    if (P2 === playerID) return 2;
    if (P3 === playerID) return 3;
    if (P4 === playerID) return 4;
    console.log(playerID + " vs " + P2);

    return 0;
}