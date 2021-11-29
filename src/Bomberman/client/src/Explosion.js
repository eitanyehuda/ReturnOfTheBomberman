/** @module Explosion */
/**
 * Represents the explosion object in game.
 */
class Explosion {
  /** 
   * Constructor of Explosion object.
   * @constructor
   * @param {int} row - The row of the explosion.
   * @param {int} col - The column of the explosion.
   * @param {int} size - The size of the bomb being dropped.
   * @param {boolean} center - True if that cell is the center of the explosion, otherwise false.
   */
  constructor(row, col, size, center){
    this.row = row;
    this.col = col;
    this.dir = size;
    this.alive = true;
    this.timer = 300;
    this.center = center;
  }
  /**
   * Visually renders the explosion
   */
  render(){
    const x = this.col * grid;
    const y = this.row * grid;
    const horizontal = this.dir.col;
    const vertical = this.dir.row;

    // create a fire effect by stacking red, orange, and yellow on top of
    // each other using progressively smaller rectangles
    context.fillStyle = '#D72B16';  // red
    context.fillRect(x, y, grid, grid);

    context.fillStyle = '#F39642';  // orange

    // determine how to draw based on if it's vertical or horizontal
    // center draws both ways
    if (this.center || horizontal) {
      context.fillRect(x, y + 6, grid, grid - 12);
    }
    if (this.center || vertical) {
      context.fillRect(x + 6, y, grid - 12, grid);
    }

    context.fillStyle = '#FFE5A8';  // yellow

    if (this.center || horizontal) {
      context.fillRect(x, y + 12, grid, grid - 24);
    }
    if (this.center || vertical) {
      context.fillRect(x + 12, y, grid - 24, grid);
    }
  }
  /**
   * Updates the explosion in each frame
   * @param {timestamp} timeDifference - difference between current and last timestamp.
   */
   update(timeDifference){
    this.timer -= timeDifference;
  
    if (this.timer <=0) {
      this.alive = false;
    }
  }
}