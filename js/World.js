class World {
  static canvas = document.querySelector("#game-canvas");
  static context = this.canvas.getContext("2d");
  static lastFrameTimeMs = 0;
  static FPS = 60;
  static timeStep = 1000 / this.FPS;
  static lag = 0;

  // static gameStatus = "initial";
  static gameStatus = "win";

  static ball = new Ball(
    World.canvas.width / 2,
    World.canvas.height / 2,
    0.2,
    0.2,
    10,
    "yellow"
  );

  static paddle = new Paddle(
    World.canvas.width / 2,
    World.canvas.height - 40,
    120,
    20,
    "#449988"
  );

  static bricks = new Bricks(8, 3, 100, 50, 2);

  static entities = [World.ball, World.paddle, World.bricks];

  constructor() {
    World.init();
    Timer.start();
  }

  static verifyGameConditions() {
    let winCondition = this.bricks.grid.every((brick) => !brick);
    let loseCondition = Timer.timeInMs <= 0;

    if (winCondition || loseCondition) {
      World.gameStatus = "stopped";
      Timer.pause();

      if (winCondition && !loseCondition) World.gameStatus = "win";
      if (loseCondition && !winCondition) World.gameStatus = "lose";
    }
  }

  static drawTimer() {
    if (World.gameStatus == "running") {
      drawText(
        Timer.getFormatTimer(),
        5,
        World.canvas.height - 10,
        "yellow",
        "20px monospace"
      );

      drawRect(
        0,
        World.canvas.height - 5,
        (World.canvas.width * Timer.timeInMs) / 120000,
        5,
        "yellow"
      );
    }
  }

  static drawFinalMessage() {
    if (World.gameStatus == "win" || World.gameStatus == "lose") {
      switch (World.gameStatus) {
        case "win":
          drawText(
            "PARABÉNS, VOCÊ DESTRUIU TODOS OS BRICKS",
            World.canvas.width / 2 - 310,
            World.canvas.height / 2,
            "#fcfdfd",
            "30px monospace"
          );
          break;
        case "lose":
          drawText(
            "ACABOU O TEMPO!",
            World.canvas.width / 2 - 200,
            World.canvas.height / 2,
            "#fcfdfd",
            "50px monospace"
          );
          break;
      }
      drawText(
        "Pressione F5 para recomeçar!",
        World.canvas.width / 2 - 220,
        World.canvas.height / 2 + 50,
        "#fcfdfd",
        "30px monospace"
      );
    }
  }

  static draw() {
    drawRect(0, 0, World.canvas.width, World.canvas.height, "#222");
    World.drawTimer();
    World.drawFinalMessage();
    World.entities.forEach((entity) => entity.draw());
  }

  static move(delta) {
    if (World.gameStatus == "running") {
      World.entities.forEach((entity) => entity.move(delta));
      World.ball.verifyColisionWithPaddle(World.paddle);
      World.ball.verifyColisionWithBricks(World.bricks, delta);
    }

    World.verifyGameConditions();
  }

  static loop(timeStamp) {
    if (timeStamp < World.lastFrameTimeMs + World.timeStep) {
      requestAnimationFrame(World.loop);
      return;
    }

    World.lag += timeStamp - World.lastFrameTimeMs;
    World.lastFrameTimeMs = timeStamp;

    while (World.lag >= World.timeStep) {
      World.move(World.timeStep);
      World.lag -= World.timeStep;
    }

    World.draw();

    requestAnimationFrame(World.loop);
  }
  static init() {
    World.gameStatus = "running";
    World.canvas.addEventListener("mousemove", Mouse.getMousePosition);
    requestAnimationFrame(World.loop);
  }
}
