import { useEffect, useState } from "react";
import { Cell } from "./calendar-cell.styles";

export const CellStates = {
  Empty: "empty",
  Event: "event",
  Selected: "selected",
};

export const CalendarCell = (props) => {
  const [selected, setSelected] = useState(false);
  const { status, selectHandler, id } = props;

  const selectCell = () => {
    if (status === CellStates.Event) {
      setSelected(true);
      selectHandler && selectHandler(id);
    }
  };

  const cellBlur = () => {
    setSelected(false);
  };

  return (
    <Cell
      $status={selected ? CellStates.Selected : status}
      onClick={selectCell}
      onBlur={cellBlur}
      tabIndex="0"
    ></Cell>
  );
};
