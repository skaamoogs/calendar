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
import { CalendarCell } from "./components/calendar-cell";

const getDaysInMonth = function (year, month) {
  return 33 - new Date(year, month, 33).getDate();
};

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const weekDay = date.getDay();

let monday = day - weekDay + 1;
if (monday < 0) {
  let prevYear = year;
  let prevMonth = month - 1;
  if (month < 0) {
    prevYear = year - 1;
    prevMonth = 11;
  }
  monday += getDaysInMonth(prevYear, prevMonth);
}

const week = ["M", "T", "W", "T", "F", "S", "S"];
const months = [
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

const defaultGrid = Array(24 * 7).fill({});

const hours = Array(24)
  .fill("00:00")
  .map((_, index) => {
    const zero = index < 10 ? "0" : "";
    return `${zero}${index}:00`;
  });

export function App() {
  const [grid, setGrid] = useState(defaultGrid);
  const [selectedDay, setSelectedDay] = useState(day);

  const addEvent = () => {
    const time = prompt(
      "Enter event time:\nYYYY-MM-DD HH:mm",
      `${year}-${month}-${day} 09:00`
    );
  };

  const days = week.map((_, index) => ({
    number: monday + index,
    weekDay: week[index],
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
            <MonthDay>{day.number}</MonthDay>
          </Day>
        ))}
        <MonthNavigationButton>
          <ArrowLeftIcon width="16px" height="16px" />
        </MonthNavigationButton>
        <Month>
          {months[month]} {year}
        </Month>
        <MonthNavigationButton>
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
          {grid.map((_, hourIndex) => (
            <CalendarCell key={hourIndex}></CalendarCell>
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
