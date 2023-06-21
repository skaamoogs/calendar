import { useMemo, useRef, useState } from "react";
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
import { CalendarCell } from "./components/calendar-cell/calendar-cell";
import { getCalendarGrid, hours, isCurrentDay } from "./utils/helpers";
import { monthNames } from "./const";
import { WEEK_ACTIONS, useWeek } from "./hooks/useWeek";

export function App() {
  const [week, changeWeek] = useWeek();
  const [events, setEvents] = useState([]);
  const [selectedCell, setSelectedCell] = useState("");
  const calendarRef = useRef(null);

  const grid = useMemo(() => getCalendarGrid(week, events), [week, events]);

  const addEvent = () => {
    const time = prompt(
      "Enter event time:\nYYYY-MM-DD HH:mm",
      `${week[0].getFullYear()}-${
        week[0].getMonth() + 1
      }-${week[0].getDate()} 09:00`
    );
    if (time === null) {
      return;
    }
    const parsedTime = Date.parse(time);
    if (isNaN(parsedTime)) {
      alert("Event time is incorrect!");
    } else {
      const event = new Date(parsedTime);
      changeWeek(WEEK_ACTIONS.SET_WEEK_BY_DATE, event);
      calendarRef.current.scrollTop =
        (calendarRef.current.scrollHeight / 24) * event.getHours();
      setEvents((prevState) => [...prevState, event.toString()]);
    }
  };

  const deleteEvent = () => {
    setEvents((prevState) =>
      prevState.filter((event) => event !== selectedCell)
    );
    setSelectedCell("");
  };

  const selectCell = (id) => {
    setSelectedCell(id);
  };

  const navigateLeft = () => {
    changeWeek(WEEK_ACTIONS.SET_PREV_WEEK);
  };

  const navigateRight = () => {
    changeWeek(WEEK_ACTIONS.SET_NEXT_WEEK);
  };

  const moveToCurrentDate = () => {
    changeWeek(WEEK_ACTIONS.SET_WEEK_BY_DATE, new Date());
  };

  return (
    <Wrapper>
      <Header>
        <Title>Interview Calendar</Title>
        <Button onClick={addEvent}>
          <PlusIcon width="20px" height="20px" />
        </Button>
      </Header>
      <DateArea>
        {week.map((date) => (
          <Day key={date.toDateString()}>
            <WeekDay>{date.toString()[0]}</WeekDay>
            <MonthDay $selected={isCurrentDay(date)}>{date.getDate()}</MonthDay>
          </Day>
        ))}
        <MonthNavigationButton onClick={navigateLeft}>
          <ArrowLeftIcon width="16px" height="16px" />
        </MonthNavigationButton>
        <Month>
          {monthNames[week[3].getMonth()]} {week[3].getFullYear()}
        </Month>
        <MonthNavigationButton onClick={navigateRight}>
          <ArrowRightIcon width="16px" height="16px" />
        </MonthNavigationButton>
      </DateArea>
      <Calendar ref={calendarRef}>
        <LeftBar>
          {hours.map((hour) => (
            <Hour key={hour}>{hour}</Hour>
          ))}
        </LeftBar>
        <Grid>
          {grid.map(({ _, cells }) =>
            cells.map((cell) => (
              <CalendarCell
                key={cell.id}
                id={cell.id}
                selectHandler={selectCell}
                status={cell.status}
              ></CalendarCell>
            ))
          )}
        </Grid>
      </Calendar>
      <Footer>
        <Button onClick={moveToCurrentDate}>Today</Button>
        {selectedCell && <Button onClick={deleteEvent}>Delete</Button>}
      </Footer>
    </Wrapper>
  );
}
