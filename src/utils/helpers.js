const getDaysInMonth = (year, month) => {
  return 33 - new Date(year, month, 33).getDate();
};

export const getTimeData = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const weekDay = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return { year, month, day, weekDay, hour, minutes };
};

export const getWeekData = (date) => {
  let { year, month, day, weekDay } = date;
  let monday = day - weekDay + 1;
  if (monday < 0) {
    let prevYear = year;
    let prevMonth = month - 1;
    if (month < 0) {
      prevYear = year - 1;
      prevMonth = 11;
    }
    if (monday <= -4) {
      month = prevMonth;
      year = prevYear;
    }
    monday += getDaysInMonth(prevYear, prevMonth);
  }

  return { year, month, day, monday };
};
