import styled from "styled-components";
import {
  border,
  cellHeight,
  selectedCellColor,
  eventColor,
} from "../../styles/variables";
import { CellStates } from "./calendar-cell";

const chooseColor = (status) => {
  switch (status) {
    case CellStates.Empty:
      return "transparent";
    case CellStates.Event:
      return eventColor;
    case CellStates.Selected:
      return selectedCellColor;
    default:
      break;
  }
};

export const CellWrapper = styled.div`
  border-right: ${border};
  border-bottom: ${border};
  height: ${cellHeight};
  box-sizing: border-box;

  &:nth-last-child(-n + 7) {
    border-bottom: none;
  }

  &:nth-child(-n + 7) {
    border-top: ${border};
  }
`;

export const Cell = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  border: 1px solid white;
  box-sizing: border-box;
  background-color: ${(props) => chooseColor(props.$status)};
`;
