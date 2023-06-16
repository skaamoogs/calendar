import styled from "styled-components";
import { border, cellHeight, selectedCellColor } from "../styles/variables";
import { CellStates } from "./calendar-cell";

const chooseColor = (status) => {
  switch (status) {
    case CellStates.Empty:
      return "transparent";
    default:
      break;
  }
};

export const Cell = styled.div`
  border-right: ${border};
  border-bottom: ${border};
  height: ${cellHeight};
  box-sizing: border-box;
  background-color: ${({ status }) => chooseColor(status)};

  &:nth-last-child(-n + 7) {
    border-bottom: none;
  }

  &:nth-child(-n + 7) {
    border-top: ${border};
  }
`;
