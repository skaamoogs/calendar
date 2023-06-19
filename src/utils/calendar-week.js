export class CalendarWeek {
  constructor(date) {
    this.setWeekByDate(date);
  }

  weekSymbols = ["M", "T", "W", "T", "F", "S", "S"];

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  getWeek() {
    return this.week;
  }

  setWeekByDate(date) {
    const parsedDate = this.parseDate(date);
    return this.setWeek({
      ...parsedDate,
      monday: parsedDate.day - parsedDate.weekDay + 1,
    });
  }

  setWeek(date) {
    let { year, month, monday } = date;
    if (monday < 0) {
      let prevYear = year;
      let prevMonth = month - 1;
      if (prevMonth < 0) {
        prevYear--;
        prevMonth = 11;
      }
      if (monday <= -4) {
        month = prevMonth;
        year = prevYear;
      }
      monday += this.getDaysInMonth(prevYear, prevMonth);
    }
    let sunday = monday + 7;
    let currentMonthDays = this.getDaysInMonth(year, month);

    if (sunday > currentMonthDays) {
      let nextYear = year;
      let nextMonth = month + 1;
      if (nextMonth > 11) {
        nextYear++;
        nextMonth = 0;
      }
      if (sunday >= currentMonthDays + 4) {
        month = nextMonth;
        year = nextYear;
      }
      sunday -= currentMonthDays;
    }

    const weekDays = this.weekSymbols.map((day, index) => {
      let number = monday + index;
      if (number > currentMonthDays) {
        return number - currentMonthDays;
      }
      return number;
    });

    this.week = { year, month, weekDays, monday };
    return this.week;
  }

  getDaysInMonth(year, month) {
    return 33 - new Date(year, month, 33).getDate();
  }

  parseDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const weekDay = date.getDay();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return { year, month, day, weekDay, hour, minutes };
  }
}
