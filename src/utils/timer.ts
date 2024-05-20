export class Timer {
  private startTime: number | null = null;
  private accumulatedTime: number = 0;

  start() {
    if (this.startTime === null) {
      this.startTime = Date.now();
    }
  }

  pause() {
    if (this.startTime !== null) {
      this.accumulatedTime += Date.now() - this.startTime;
      this.startTime = null;
    }
  }

  reset() {
    this.startTime = null;
    this.accumulatedTime = 0;
  }

  getTime(): number {
    if (this.startTime !== null) {
      return this.accumulatedTime + (Date.now() - this.startTime);
    }
    return this.accumulatedTime;
  }
}

export function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Pad seconds with leading zero if necessary
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${minutes}:${formattedSeconds}`;
}