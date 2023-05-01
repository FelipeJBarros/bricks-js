class Bricks {
  constructor(rows, columns, width, height, gap) {
    this.rows = rows;
    this.columns = columns;
    this.width = width;
    this.height = height;
    this.gap = gap;

    this.grid = Array(this.columns * this.rows).fill(true);
  }

  mapRowCollToBrickIndex(row, col) {
    return row + this.rows * col;
  }

  getBrickColor(height) {
    let heigthToColor = Math.floor((255 * (160 + this.height * height)) / 600);
    return `#4499${heigthToColor.toString(16)}`;
  }

  move(delta) {}
  draw() {
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        let arrayIndex = this.mapRowCollToBrickIndex(row, column);
        if (this.grid[arrayIndex]) {
          let brickColor = this.getBrickColor(column);
          drawRect(
            this.width * row,
            this.height * column,
            this.width - this.gap,
            this.height - this.gap,
            brickColor
          );
          // debug
          drawText(
            `${arrayIndex} - ${this.width * row} x ${this.height * column}`,
            this.width * row + this.width / 2 - 32,
            this.height * column + this.height / 2,
            "white"
          );
        }
      }
    }
  }
}
