class Paddle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  move(delta) {
    this.x = Mouse.x;

    if (this.x - this.width / 2 <= 0) {
      this.x = this.width / 2;
    }

    if (this.x + this.width / 2 >= World.canvas.width) {
      this.x = World.canvas.width - this.width / 2;
    }
  }

  draw() {
    drawRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height,
      this.color
    );
  }
}
