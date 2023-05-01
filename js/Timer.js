class Timer {
  static minutes = 0;
  static seconds = 0;
  static timeInMs = 2 * 60000;
  static timer = 1000;
  static cron = null;

  static getMinutes() {
    return Math.trunc(Timer.timeInMs / 60000);
  }

  static getSeconds() {
    return Math.trunc((Timer.timeInMs % 60000) / 1000);
  }

  static start() {
    Timer.minutes = Timer.getMinutes();
    Timer.seconds = Timer.getSeconds();
    Timer.cron = setInterval(() => {
      Timer.update();
    }, Timer.timer);
  }

  static pause() {
    clearInterval(Timer.cron);
  }

  static reset() {
    clearInterval(Timer.cron);
    Timer.minutes = 2;
    Timer.seconds = 0;
  }

  static getFormatTimer() {
    let formatMin = String(Timer.minutes).padStart(2, "0");
    let formatSec = String(Timer.seconds).padStart(2, "0");
    return `${formatMin}:${formatSec}`;
  }

  static update() {
    if (Timer.timeInMs > 0) {
      Timer.timeInMs -= 1000;
      Timer.minutes = Timer.getMinutes();
      Timer.seconds = Timer.getSeconds();
    }
  }
}
