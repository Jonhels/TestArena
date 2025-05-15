import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import nbNO from "date-fns/locale/nb";
import api from "../../../api/api";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "nb-NO": nbNO };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Mandag
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .get("/calendar")
      .then((response) => {
        const formattedEvents = response.data.events.map((event) => ({
          title: event.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          allDay: false,
        }));

        setEvents(formattedEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={{
          next: "Neste",
          previous: "Forrige",
          today: "I dag",
          month: "Måned",
          week: "Uke",
          day: "Dag",
          agenda: "Agenda",
        }}
      />
    </div>
  );
};

export default CalendarView;
