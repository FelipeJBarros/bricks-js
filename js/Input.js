class Mouse {
  static x = 400;
  static y = 400;

  static getMousePosition(event) {
    let rect = Game.canvas.getBoundingClientRect();
    let root = document.documentElement;

    Mouse.x = event.clientX - rect.left - root.scrollLeft;
    Mouse.y = event.clientY - rect.top - root.scrollTop;
  }
}
