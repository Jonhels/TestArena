import "./Dashboard.css";

const CalendarBox = () => {
  return (
    <div className="calendar-box">
      <h3>Kalender</h3>
      <div className="calendar-section">
        <strong>Denne uken:</strong>
        <ul>
          <li>Fredag 18. april, klokken 14:30: Teamsmøte med VitalScan</li>
        </ul>
      </div>
      <div className="calendar-section">
        <strong>Fremtidige:</strong>
        <ul>
          <li>Torsdag 31. april, klokken 10:00: Teamsmøte med VitalScan</li>
        </ul>
      </div>
    </div>
  );
};

export default CalendarBox;
