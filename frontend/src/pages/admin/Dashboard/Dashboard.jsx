import WelcomeBox from "../../../components/admin/Dashboard/WelcomeBox";
import DateTimeBox from "../../../components/admin/Dashboard/DateTimeBox";
import StatsBoxes from "../../../components/admin/Dashboard/StatsBoxes";
import CalendarBox from "../../../components/admin/Dashboard/CalendarBox";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <WelcomeBox />
      <div className="top-boxes-container">
        <DateTimeBox />
        <CalendarBox />
      </div>
      <StatsBoxes />
    </div>
  );
};

export default Dashboard;
