export const currentDate = resetTime(new Date());

export function firstDayOfTheMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
}

export function resetTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
