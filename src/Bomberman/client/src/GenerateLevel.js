/** @module GenerateLevel */


/**
 * Defines Canvas by the HTML ID
 * @constant
 */
const canvas = document.getElementById('game');

/**
 * Defines context of the Canvas.
 * @constant
 */
const context = canvas.getContext('2d');

/**
 * Defines grid size.
 * @constant
 */
const grid = 64;

/**
 * Defines number of Rows in the game.
 * @constant
 */
const numRows = 13;

/**
 * Defines number of Columns in the game.
 * @constant
 */
const numCols = 15;

// create a new canvas and draw the soft wall image. then we can use this
// canvas to draw the images later on

/**
 * Defines a canvas for soft walls.
 * @constant
 */
const softWallCanvas = document.createElement('canvas');

/**
 * Defines a variable which can be used to create the graphics of a soft wall.
 * @constant
 */
const softWallCtx = softWallCanvas.getContext('2d');
softWallCanvas.width = softWallCanvas.height = grid;

softWallCtx.fillStyle = 'black';
softWallCtx.fillRect(0, 0, grid, grid);
softWallCtx.fillStyle = '#a9a9a9';

// 1st row brick
softWallCtx.fillRect(1, 1, grid - 2, 20);

// 2nd row bricks
softWallCtx.fillRect(0, 23, 20, 18);
softWallCtx.fillRect(22, 23, 42, 18);

// 3rd row bricks
softWallCtx.fillRect(0, 43, 42, 20);
softWallCtx.fillRect(44, 43, 20, 20);

// create a new canvas and draw the soft wall image. then we can use this
// canvas to draw the images later on

/**
 * Defines a canvas for a hard wall
 * @constant
 */
const wallCanvas = document.createElement('canvas');

/**
 * Defines a variable which can be used to create the graphics of a hard wall.
 * @constant
 */
const wallCtx = wallCanvas.getContext('2d');
wallCanvas.width = wallCanvas.height = grid;

wallCtx.fillStyle = 'black';
wallCtx.fillRect(0, 0, grid, grid);
wallCtx.fillStyle = 'white';
wallCtx.fillRect(0, 0, grid - 2, grid - 2);
wallCtx.fillStyle = '#a9a9a9';
wallCtx.fillRect(2, 2, grid - 4, grid - 4);

/**
 * Creates a typelist for objects that can occupy a cell in the game.
 * @constant
 */
const types = {
  wall: '▉',
  softWall: 1,
  bomb: 2,
  powerUp: 3
};

// keep track of all entities
let entities = [];

// keep track of what is in every cell of the game using a 2d array. the
// template is used to note where walls are and where soft walls cannot spawn.
// '▉' represents a wall
// 'x' represents a cell that cannot have a soft wall (player start zone)
let cells = [];

/**
 * Defines a template of the cells for the game that can be filled out when the level is generated.
 * @constant
 */
const template = [
  ['▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉'],
  ['▉','x','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','x','▉'],
  ['▉','x','▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉','x','▉'],
  ['▉','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','▉'],
  ['▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉'],
  ['▉',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'▉'],
  ['▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉'],
  ['▉',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'▉'],
  ['▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉'],
  ['▉','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','▉'],
  ['▉','x','▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉','x','▉'],
  ['▉','x','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','x','▉'],
  ['▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉']
];





// populate the level with walls and soft walls

/**
 * Defines a function which generates a random level to be played.
 * @function
 */
function generateLevel() {
    cells = [];
  
    for (let row = 0; row < numRows; row++) {
      cells[row] = [];
  
      for (let col = 0; col < numCols; col++) {
  
        // 90% chance cells will contain a soft wall
        if (!template[row][col] && Math.random() < 0.90) {
          cells[row][col] = types.softWall;
        }
        else if (template[row][col] === types.wall) {
          cells[row][col] = types.wall;
        }
      }
    }
  }