import styled from "styled-components";
import {
  bgColor,
  border,
  cellHeight,
  greyColor,
  minWidth,
  primaryColor,
} from "./styles/variables";

export const Wrapper = styled.div`
  width: 100%;
  @media screen and (min-width: 740px) {
    width: 740px;
  }
  margin: 0 auto;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  min-width: calc(${minWidth} + 56px);
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 400;
`;

export const Button = styled.button`
  height: fit-content;
  border: none;
  padding: 0;
  background-color: transparent;
  color: ${primaryColor};
  font-size: 1.25em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
`;

export const DateArea = styled.div`
  padding: 0 0 6px 56px;
  min-width: ${minWidth};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: ${bgColor};
  border-block: ${border};
  justify-content: center;
`;

export const Days = styled.div``;

export const Day = styled.div`
  text-align: center;
`;

export const WeekDay = styled.p`
  font-size: 0.75em;
  font-weight: 600;
  margin: 0;
  padding: 6px;
`;

export const MonthDay = styled.p`
  font-size: 1.25em;
  font-weight: 500;
  margin: 0;
  padding: 6px;
`;

export const Month = styled.p`
  grid-column-start: span 5;
  margin: 0;
  text-align: center;
`;

export const MonthNavigationButton = styled.button`
  border: none;
  padding: 0;
  line-height: 0;
  background-color: transparent;
  cursor: pointer;
  color: ${primaryColor};
  text-align: center;
`;

export const Calendar = styled.div`
  display: flex;
  overflow-y: auto;
  scrollbar-width: thin;
  padding-right: 0px;
`;

export const LeftBar = styled.div`
  padding: 0 6px 0 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Hour = styled.p`
  color: ${greyColor};
  font-size: 1em;
  height: ${cellHeight};
  margin: 0;
`;

export const Grid = styled.div`
  display: grid;
  flex-grow: 2;
  grid-template-columns: repeat(7, 1fr);
  min-width: ${minWidth};
  margin-top: 12px;
`;

export const Footer = styled.div`
  padding: 16px 36px;
  display: flex;
  justify-content: space-between;
  border-top: ${border};
  background-color: ${bgColor};
`;
