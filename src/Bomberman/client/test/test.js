'use strict';

for (let i =0; i < 10; i++){
        cells[i] = []
    for (let j=0; j<10; j++){
        cells[i][j] = null;
    }
}
player.row = 4;
player.col = 4;

describe('Test suite for movements', function() {

    describe('Movement Up Test', function() {
        it('Player should move up one row', function() {
            movePlayer(1, "up");
            
            console.log("assertion player row:" + player.row);
            chai.assert.equal(player.row, 3);
        });
        
    });

    describe('Movement Down Test', function() {
        it('Player should move down one row', function() {
            movePlayer(1, "down");
            chai.assert.equal(player.row, 4);
        });
    });

    describe('Movement left Test', function() {
        it('Player should move left one row', function() {
            movePlayer(1, "left");
            chai.assert.equal(player.col, 3);
        });
    });

    describe('Movement right Test', function() {
        it('Player should move right one row', function() {
            movePlayer(1, "right");
            chai.assert.equal(player.col, 4);
        });
    });

    describe('Test Move Through Walls', function() {
        it('The player should not move.', function() {
            player.row = 4;
            player.col = 4;
            cells[5][4] = types.softWall;
            movePlayer(1, "down");
            chai.assert.equal(player.row, 4);
            cells[4][3] = types.wall;
            movePlayer(1, "left");
            chai.assert.equal(player.col, 4);
        });
    });
});

describe('Test suite for bombs', function() {

    describe('Test Place Bomb', function() {
        it('Player should place bomb on the players cell', function() {
            placeBomb(1);
            chai.assert.equal(cells[player.row][player.col], types.bomb);
        });
        
    });

    describe('Test Bomb Limit', function() {
        it('The second bomb should not be played', function() {
            movePlayer(1, "up");
            placeBomb(1);
            chai.assert.equal(cells[player.row][player.col], null);
            movePlayer(1, "up");
            movePlayer(1, "right");
        });
        
    });

    // Multiple different time delays were tried and none worked. Which is why any testing with bomb detonation was moved to manual


});
