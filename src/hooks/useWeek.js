import { useState } from "react";
import { calendarWeek } from "../utils/calendar-week";

export const WEEK_ACTIONS = {
  SET_WEEK_BY_DATE: "SET_WEEK_BY_DATE",
  SET_PREV_WEEK: "SET_PREV_WEEK",
  SET_NEXT_WEEK: "SET_NEXT_WEEK",
};

export const useWeek = () => {
  const [week, setWeek] = useState(calendarWeek.getWeek());

  const changeWeek = (action, payload) => {
    switch (action) {
      case WEEK_ACTIONS.SET_WEEK_BY_DATE:
        calendarWeek.setWeekByDate(payload);
        break;
      case WEEK_ACTIONS.SET_PREV_WEEK:
        calendarWeek.setPreviousWeek();
        break;
      case WEEK_ACTIONS.SET_NEXT_WEEK:
        calendarWeek.setNextWeek();
        break;
      default:
        break;
    }
    setWeek(calendarWeek.getWeek());
  };

  return [week, changeWeek];
};
