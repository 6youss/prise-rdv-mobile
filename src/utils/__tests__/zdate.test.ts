import {ZHour} from '../zdate';

it('addDuration', () => {
  const h1 = ZHour.fromString('12:30').addDuration(90);

  expect(h1.equals(ZHour.fromString('14:00'))).toBe(true);
});

it('isLess', () => {
  const h1 = ZHour.fromString('10:10');
  const h2 = ZHour.fromString('11:10');
  expect(h1.isLess(h2)).toBe(true);
});

it('toString', () => {
  expect(ZHour.fromString('10:10').toString()).toBe('10:10');
});

// it('filterAvailableHours', () => {
//   const availableHours = ZHour.filterAvailableHours(
//     ZHour.fromHours(8),
//     ZHour.fromHours(17),
//     30,
//     [ZHour.fromHours(8), ZHour.fromHours(9), ZHour.fromHours(10)],
//   );
//   expect(availableHours).toBe(true);
// });
