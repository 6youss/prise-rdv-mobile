export function getDateFromString(dateString: string): Date {
  const [day, month, year] = dateString.split('-').map(val => parseInt(val));
  if (day > 31 || month > 12 || year < 2019)
    throw new Error('the date format should be of type DD-MM-YYYY');
  return new Date(year, month - 1, day);
}

export function getDayName(date: Date): string {
  const days = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  return days[date.getDay()];
}
export function getMonthName(date: Date, short: boolean = true): string {
  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juiellet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
  ];

  return short
    ? months[date.getMonth()].substring(0, 4)
    : months[date.getMonth()];
}
