import {ZTime} from '../ztime';

it('addDuration', () => {
  const h1 = ZTime.fromString('11:45').addDuration(30);
  expect(h1.equals(ZTime.fromString('12:15'))).toBe(true);
});

it('isLess', () => {
  const h1 = ZTime.fromString('10:10');
  const h2 = ZTime.fromString('11:10');
  expect(h1.isLess(h2)).toBe(true);
});

it('toString', () => {
  expect(ZTime.fromString('10:10').toString()).toBe('10:10');
});

it('filterAvailableHours', () => {
  const availableHours = ZTime.filterAvailableHours(
    ZTime.fromHours(8),
    ZTime.fromHours(11),
    30,
    [ZTime.fromHours(8), ZTime.fromHours(9), ZTime.fromHours(10)],
  );
  expect(availableHours).toEqual([
    ZTime.fromString('8:30'),
    ZTime.fromString('9:30'),
    ZTime.fromString('10:30'),
  ]);
});
