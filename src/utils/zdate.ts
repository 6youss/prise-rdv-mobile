export class ZHour {
  static fromString(time: string): ZHour {
    let [h, m] = time.split(':').map(val => parseInt(val));
    return new ZHour(h, m);
  }

  static fromHours(h: number, m: number = 0): ZHour {
    return new ZHour(h, m);
  }

  private constructor(private h: number, private min: number) {}

  addDuration(duration: number): ZHour {
    let newHH = this.h + Math.floor(duration / 60);
    const newMM = (this.min + duration) % 60;

    return new ZHour(newHH, newMM);
  }

  isLess(zdate: ZHour) {
    return this.toMinutes() < zdate.toMinutes();
  }
  toMinutes(): number {
    return this.h * 60 + this.min;
  }
  toString(): string {
    return this.h + ':' + this.min;
  }
  equals(anotherHour: ZHour): boolean {
    return this.h === anotherHour.h && this.min === anotherHour.min;
  }

  static filterAvailableHours(
    startingHour: ZHour,
    endingHour: ZHour,
    sessionDuration: number,
    reservedHours: Array<ZHour>,
  ): Array<ZHour> {
    let availableHours: Array<ZHour> = [];
    let sessionHour = startingHour;

    while (sessionHour.isLess(endingHour)) {
      if (!reservedHours.find(hour => hour.equals(sessionHour))) {
        availableHours.push(sessionHour);
      }
      sessionHour = sessionHour.addDuration(sessionDuration);
    }
    return availableHours;
  }
}
