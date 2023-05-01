class Ball {
  constructor(x, y, spdX, spdY, radius, color, bounce = 0.01) {
    this.x = x;
    this.y = y;
    this.spdX = spdX;
    this.spdY = spdY;
    this.radius = radius;
    this.color = color;
    this.bounce = bounce;
    this.base_spd = spdX;
  }

  verifyColisionWithPaddle(paddle) {
    let paddleLeftBorder = paddle.x - paddle.width / 2;
    let paddleRightBorder = paddleLeftBorder + paddle.width;
    let paddleTopBorder = paddle.y;
    let paddleBottomBorder = paddle.y + paddle.height;

    if (
      this.y + this.radius > paddleTopBorder &&
      this.y - this.radius < paddleBottomBorder &&
      this.x + this.radius > paddleLeftBorder &&
      this.x - this.radius < paddleRightBorder
    ) {
      let paddleCenter = paddle.x;
      let distFromPaddleCenter = this.x - paddleCenter;

      let escapeSpeed =
        Math.sign(distFromPaddleCenter * this.bounce) *
        Math.max(Math.abs(distFromPaddleCenter * this.bounce), 0.3);

      this.spdX = escapeSpeed;
      this.spdY *= -1;
    }
  }

  verifyColisionWithBricks(bricks, delta) {
    let brickRow = Math.floor(this.x / bricks.width);
    let brickCol = Math.floor(this.y / bricks.height);

    let brickUnderBallIndex = bricks.mapRowCollToBrickIndex(brickRow, brickCol);

    if (
      brickRow >= 0 &&
      brickRow < bricks.rows &&
      brickCol >= 0 &&
      brickCol < bricks.columns
    ) {
      if (bricks.grid[brickUnderBallIndex]) {
        bricks.grid[brickUnderBallIndex] = false;

        let prevBallX = this.x - this.spdX * delta;
        let prevBallY = this.y - this.spdY * delta;

        let prevBallRow = Math.floor(prevBallX / bricks.width);
        let prevBallCol = Math.floor(prevBallY / bricks.height);

        if (prevBallRow != brickRow) this.spdX *= -1;
        if (prevBallCol != brickCol) this.spdY *= -1;
      }
    }
  }

  move(delta) {
    this.x += this.spdX * delta;
    this.y += this.spdY * delta;
    if (this.x - this.radius < 0 || this.x + this.radius > World.canvas.width) {
      this.spdX *= -1;
    }
    if (this.y - this.radius < 0) {
      this.spdY *= -1;
    }
    if (this.y + this.radius > World.canvas.height) {
      this.x = World.canvas.width / 2;
      this.y = World.canvas.height / 2;
      this.spdX = this.base_spd;
      if (getRandomBetween(0, 1) > 0.5) this.spdX *= -1;
    }
  }

  draw() {
    drawCircle(this.x, this.y, this.radius, this.color);
  }
}
