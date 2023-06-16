import { Cell } from "./calendar-cell.styles";

export const CellStates = {
  Empty: "empty",
  Event: "event",
  Selected: "selected",
};

export const CalendarCell = (props) => {
  const { status } = props;

  return <Cell $bgColor={status}></Cell>;
};
