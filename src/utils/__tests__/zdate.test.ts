import {ZHour} from '../zdate';

it('addDuration', () => {
  const h1 = ZHour.fromString('11:45').addDuration(30);
  expect(h1.equals(ZHour.fromString('12:15'))).toBe(true);
});

it('isLess', () => {
  const h1 = ZHour.fromString('10:10');
  const h2 = ZHour.fromString('11:10');
  expect(h1.isLess(h2)).toBe(true);
});

it('toString', () => {
  expect(ZHour.fromString('10:10').toString()).toBe('10:10');
});

it('filterAvailableHours', () => {
  const availableHours = ZHour.filterAvailableHours(
    ZHour.fromHours(8),
    ZHour.fromHours(11),
    30,
    [ZHour.fromHours(8), ZHour.fromHours(9), ZHour.fromHours(10)],
  );
  expect(availableHours).toEqual([
    ZHour.fromString('8:30'),
    ZHour.fromString('9:30'),
    ZHour.fromString('10:30'),
  ]);
});
