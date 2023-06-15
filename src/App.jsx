import { Wrapper } from "./App.styles";

const getDaysInMonth = function (year, month) {
  return 33 - new Date(year, month, 33).getDate();
};

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const weekDay = date.getDay();

let monday = day - weekDay;
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

export function App() {
  const addEvent = () => {
    return;
  };

  const days = Array(7).map((_, index) => ({
    number: monday + index,
    weekDay: week[index],
  }));

  const grid = Array(24).fill(Array(7).fill());
  const hours = Array(24).map((_, index) => {
    const zero = index < 10 ? "0" : "";
    return `${zero}${index}:00`;
  });

  return (
    <Wrapper>
      <header>
        <span>Interview Calendar</span>
        <button onClick={addEvent}>+</button>
      </header>
      <div>
        <div>
          {days.map((day) => (
            <div>
              <p>{day.weekDay}</p>
              <p>{day.number}</p>
            </div>
          ))}
        </div>
        <div>
          <button>&#60;</button>
          <span>{month}</span>
          <button>&#62;</button>
        </div>
      </div>
      <div>
        {hours.map((hour) => (
          <span key={hour}>{hour}</span>
        ))}
      </div>
      <table>
        <thead></thead>
        <tbody>
          {grid.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              {hour.map((day, dayIndex) => (
                <td key={dayIndex}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <button>Today</button>
        <button>Delete</button>
      </footer>
    </Wrapper>
  );
}
