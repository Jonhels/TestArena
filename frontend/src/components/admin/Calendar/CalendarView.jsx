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
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [upcoming, setUpcoming] = useState(null);

  useEffect(() => {
    api
      .get("/calendar")
      .then((response) => {
        const formatted = response.data.events.map((event) => ({
          title: event.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          allDay: false,
        }));

        setEvents(formatted);

        const future = formatted.filter((e) => e.start > new Date());
        if (future.length > 0) {
          const next = future.sort((a, b) => a.start - b.start)[0];
          setUpcoming(next);
        }
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

      {upcoming && (
        <div className="calendar-event-card">
          <strong>
            {upcoming.start.toLocaleDateString("nb-NO", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
            , klokken{" "}
            {upcoming.start.toLocaleTimeString("nb-NO", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </strong>
          <br />
          {upcoming.title}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
