export const getToday = (day, month, year) => {
  const date = new Date();

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    isToday: ( day === date.getDate() && month === date.getMonth() + 1 && year === date.getFullYear() )
  }
};
