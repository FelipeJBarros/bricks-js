function drawRect(x, y, width, height, color) {
  World.context.fillStyle = color;
  World.context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  World.context.fillStyle = color;
  World.context.beginPath();
  World.context.arc(x, y, radius, 0, Math.PI * 2, true);
  World.context.fill();
}

function drawText(text, x, y, color, font = "") {
  World.context.fillStyle = color;
  World.context.font = font;
  World.context.fillText(text, x, y);
}

function getRandomBetween(min, max, precision = 1) {
  return (Math.random() * (max - min) + min).toFixed(precision);
}
