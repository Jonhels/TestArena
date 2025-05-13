import { useEffect, useState } from "react";
import "./Dashboard.css";

const DateTimeBox = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="datetime-box">
      <div className="time">
        {currentTime.toLocaleTimeString("no-NO", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <div className="weekday">
        {currentTime.toLocaleDateString("no-NO", { weekday: "long" })}
      </div>
      <div className="date">
        {currentTime.toLocaleDateString("no-NO", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className="week">Uke {getWeekNumber(currentTime)}</div>
    </div>
  );
};

const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export default DateTimeBox;
