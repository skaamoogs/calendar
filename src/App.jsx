import { useState } from "react";
import {
  Button,
  Calendar,
  DateArea,
  Day,
  Footer,
  Grid,
  Header,
  Hour,
  LeftBar,
  Month,
  MonthDay,
  MonthNavigationButton,
  Title,
  WeekDay,
  Wrapper,
} from "./App.styles";
import { ArrowLeftIcon } from "./icons/arrow-left";
import { ArrowRightIcon } from "./icons/arrow-right";
import { PlusIcon } from "./icons/plus-icon";
import {
  CalendarCell,
  CellStates,
} from "./components/calendar-cell/calendar-cell";
import { getTimeData, getWeekData } from "./utils/helpers";
import { monthNames, weekSymbols } from "./const";

const defaultGrid = Array(24 * 7).fill({ status: CellStates.Empty });

const hours = Array(24)
  .fill("00:00")
  .map((_, index) => {
    const zero = index < 10 ? "0" : "";
    return `${zero}${index}:00`;
  });

const determineCellNumber = (date) => {
  const weekDay = date.getDay();
  const hour = date.getHours();
  return (weekDay - 1) * hour;
};

const isCurrentDay = (day) => {
  const currentDate = new Date();
  return (
    day.year === currentDate.getFullYear() &&
    day.month === currentDate.getMonth() &&
    day.number === currentDate.getDate()
  );
};

const getCurrentDate = () => {
  return getWeekData(getTimeData(new Date()));
};

export function App() {
  const [week, setWeek] = useState(getCurrentDate());
  const [grid, setGrid] = useState(defaultGrid);

  const addEvent = () => {
    const time = prompt(
      "Enter event time:\nYYYY-MM-DD HH:mm",
      `${week.year}-${week.month}-${week.day} 09:00`
    );

    const parsedTime = Date.parse(time);
    if (isNaN(parsedTime)) {
      alert("Event time is incorrect!");
    } else {
      const eventTime = new Date(parsedTime);
      const cellNumber = determineCellNumber(eventTime);
      const newGrid = grid.map((cell, index) => {
        if (index === cellNumber) {
          return { status: CellStates.Event };
        }
        return cell;
      });
      const newWeek = getWeekData(getTimeData(eventTime));
      setGrid(newGrid);
      setWeek(newWeek);
    }
  };

  const selectCell = () => {};

  const navigateLeft = () => {
    const newWeek = getWeekData({ ...week, weekDay: 1, day: week.day - 7 });
    setWeek(newWeek);
  };

  const navigateRight = () => {
    const newWeek = getWeekData({ ...week, weekDay: 1, day: week.day + 7 });
    setWeek(newWeek);
  };

  const days = weekSymbols.map((_, index) => ({
    year: week.year,
    month: week.month,
    number: week.monday + index,
    weekDay: weekSymbols[index],
  }));

  return (
    <Wrapper>
      <Header>
        <Title>Interview Calendar</Title>
        <Button onClick={addEvent}>
          <PlusIcon width="20px" height="20px" />
        </Button>
      </Header>
      <DateArea>
        {days.map((day) => (
          <Day key={day.number}>
            <WeekDay>{day.weekDay}</WeekDay>
            <MonthDay $selected={isCurrentDay(day)}>{day.number}</MonthDay>
          </Day>
        ))}
        <MonthNavigationButton onClick={navigateLeft}>
          <ArrowLeftIcon width="16px" height="16px" />
        </MonthNavigationButton>
        <Month>
          {monthNames[week.month]} {week.year}
        </Month>
        <MonthNavigationButton onClick={navigateRight}>
          <ArrowRightIcon width="16px" height="16px" />
        </MonthNavigationButton>
      </DateArea>
      <Calendar>
        <LeftBar>
          {hours.map((hour) => (
            <Hour key={hour}>{hour}</Hour>
          ))}
        </LeftBar>
        <Grid>
          {grid.map((cell, index) => (
            <CalendarCell
              key={index}
              id={index}
              onClick={selectCell}
              status={cell.status}
            ></CalendarCell>
          ))}
        </Grid>
      </Calendar>
      <Footer>
        <Button>Today</Button>
        <Button>Delete</Button>
      </Footer>
    </Wrapper>
  );
}
