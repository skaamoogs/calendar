class CalendarWeek {
  constructor() {
    this.setWeekByDate(new Date());
  }

  getWeek() {
    return this.week;
  }

  setWeekByDate(date) {
    const newDate = new Date(date);
    const day = newDate.getDate();

    let weekDay = newDate.getDay();
    /* it converts week days range from 0...6 (Sun...Mon) to 1..7 (Mon...Sun)
     */
    weekDay = weekDay ? weekDay : 7;

    newDate.setDate(day - weekDay + 1);
    this.setWeek(newDate);
  }

  setWeek(date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0);
    const monday = startDate.getDate();

    this.week = Array(7)
      .fill("")
      .map((_, index) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(monday + index);
        return currentDate;
      });
  }

  setPreviousWeek() {
    const monday = new Date(this.week[0]);
    monday.setDate(monday.getDate() - 7);
    this.setWeek(monday);
  }

  setNextWeek() {
    const monday = new Date(this.week[0]);
    monday.setDate(monday.getDate() + 7);
    this.setWeek(monday);
  }
}

export const calendarWeek = new CalendarWeek();
