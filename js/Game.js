class Game {
  static canvas = document.querySelector("#game-canvas");
  static context = this.canvas.getContext("2d");

  static lastFrameTimeMs = 0;
  static FPS = 60;
  static timeStep = 1000 / this.FPS;
  static lag = 0;
}
