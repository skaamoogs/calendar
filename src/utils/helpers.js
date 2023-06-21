import { CellStates } from "../components/calendar-cell/calendar-cell";

export const hours = Array(24)
  .fill("00:00")
  .map((_, index) => {
    const zero = index < 10 ? "0" : "";
    return `${zero}${index}:00`;
  });

const getStatus = (date, events) => {
  if (events.includes(date.toString())) {
    return CellStates.Event;
  }
  return CellStates.Empty;
};

export const getCalendarGrid = (week, events) =>
  hours.map((hour) => ({
    hour,
    cells: week.map((date) => {
      const newDate = new Date(date);
      newDate.setHours(+hour.slice(0, 2));
      return { id: newDate.toString(), status: getStatus(newDate, events) };
    }),
  }));

export const isCurrentDay = (date) => {
  const currentDate = new Date();
  return (
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate()
  );
};
