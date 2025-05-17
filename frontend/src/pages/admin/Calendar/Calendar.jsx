import AddEventForm from "../../../components/admin/Calendar/AddEventForm";
import CalendarView from "../../../components/admin/Calendar/CalendarView";
import "./Calendar.css";

const Calendar = () => {
  return (
    <div className="calendar-dashboard-container ">
      <h1 className="calendar-dashboard-heading ">Kalender</h1>
      <CalendarView />
      <AddEventForm />
    </div>
  );
};

export default Calendar;
