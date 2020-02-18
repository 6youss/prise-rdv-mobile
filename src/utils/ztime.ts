export class ZTime {
  static fromString(time: string): ZTime {
    let [h, m] = time.split(':').map(val => parseInt(val));
    return new ZTime(h, m);
  }

  static fromHours(h: number, m: number = 0): ZTime {
    return new ZTime(h, m);
  }

  get hours(): number {
    return this._hours;
  }
  get minutes(): number {
    return this._minutes;
  }
  private constructor(private _hours: number, private _minutes: number) {}

  addDuration(duration: number): ZTime {
    let newHH = this._hours + Math.floor((this._minutes + duration) / 60);
    const newMM = (this._minutes + duration) % 60;
    return new ZTime(newHH, newMM);
  }

  isLess(zdate: ZTime) {
    return this.toMinutes() < zdate.toMinutes();
  }
  toMinutes(): number {
    return this._hours * 60 + this._minutes;
  }
  toString(): string {
    return (
      ('0' + this._hours).slice(-2) + ':' + ('0' + this._minutes).slice(-2)
    );
  }
  equals(anotherHour: ZTime): boolean {
    return (
      this._hours === anotherHour._hours &&
      this._minutes === anotherHour._minutes
    );
  }

  static filterAvailableHours(
    startingHour: ZTime,
    endingHour: ZTime,
    sessionDuration: number,
    reservedHours: Array<ZTime>,
  ): Array<ZTime> {
    let availableHours: Array<ZTime> = [];
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
