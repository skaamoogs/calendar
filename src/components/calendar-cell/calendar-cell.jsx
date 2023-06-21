import { useEffect, useState } from "react";
import { Cell, CellWrapper } from "./calendar-cell.styles";

export const CellStates = {
  Empty: "empty",
  Event: "event",
  Selected: "selected",
};

export const CalendarCell = (props) => {
  const { status, selectHandler, id, selected } = props;

  const selectCell = () => {
    if (status === CellStates.Event) {
      selectHandler && selectHandler(true, id);
    } else {
      selectHandler && selectHandler(false);
    }
  };

  return (
    <CellWrapper>
      <Cell
        $status={selected ? CellStates.Selected : status}
        onClick={selectCell}
        tabIndex="0"
      ></Cell>
    </CellWrapper>
  );
};
