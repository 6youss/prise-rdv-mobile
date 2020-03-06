import {getDateFromString, dateRange, addDays} from '../zdate';

it('getDateFromString date only', () => {
  expect(getDateFromString('01-02-2020')).toEqual(new Date(2020, 1, 1));
});

it('getDateFromString date with time', () => {
  expect(getDateFromString('01-02-2020T10:10')).toEqual(
    new Date(2020, 1, 1, 10, 10),
  );
});

// it('dateRange', () => {
//   console.log(dateRange(new Date(), 2));
//   expect(dateRange(new Date(), 2)).toBe(false);
// });

// it('addDays', () => {
//   console.log(addDays(new Date(), 3));
//   expect(addDays(new Date(), 3)).toBe(false);
// });
