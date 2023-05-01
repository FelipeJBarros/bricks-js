function drawRect(x, y, width, height, color) {
  Game.context.fillStyle = color;
  Game.context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  Game.context.fillStyle = color;
  Game.context.beginPath();
  Game.context.arc(x, y, radius, 0, Math.PI * 2, true);
  Game.context.fill();
}

function drawText(text, x, y, color) {
  Game.context.fillStyle = color;
  Game.context.fillText(text, x, y);
}

function getRandomBetween(min, max, precision = 1) {
  return (Math.random() * (max - min) + min).toFixed(precision);
}
