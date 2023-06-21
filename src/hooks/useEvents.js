import { useState } from "react";
import { storageService } from "../service/storage";

export const useEvents = () => {
  const [events, setEvents] = useState(storageService.get("events") ?? []);

  const changeEvents = (newEvents) => {
    storageService.set("events", newEvents);
    setEvents(storageService.get("events") ?? []);
  };

  return [events, changeEvents];
};
