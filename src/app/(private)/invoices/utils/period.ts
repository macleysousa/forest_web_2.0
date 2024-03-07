export function createPeriod(start: Date, end: Date) {
  const startDate = start.toISOString().split('T')[0] as string;
  const endDate = end.toISOString().split('T')[0] as string;
  const startFormatted = startDate.split('-').reverse().join('-');
  const endFormatted = endDate.split('-').reverse().join('-');
  return `${startFormatted} a ${endFormatted}`;
}

export function reverseCreatePeriod(period: string) {
  /* eslint-disable prettier/prettier */
  const tzOffset = new Date().getTimezoneOffset();
  const tzOperator = tzOffset < 0 ? '+' : '-';
  const tzHours = Math.ceil(tzOffset / 60).toString().padStart(2, '0');
  const tzMinutes = (tzOffset % 60).toString().padStart(2, '0');
  const tz = `${tzOperator}${tzHours}:${tzMinutes}`;
  /* eslint-enable prettier/prettier */

  return period
    .split(' a ')
    .map((dateString) => dateString.split('-').reverse().join('-'))
    .map((dateString) => `${dateString}T00:00:00.000${tz}`)
    .map((dateISO) => new Date(dateISO)) as [Date, Date];
}
