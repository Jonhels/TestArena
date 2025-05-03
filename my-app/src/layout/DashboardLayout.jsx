import PropTypes from "prop-types";
import DashboardNav from "../components/DashboardNav/DashboardNav"
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="Dashboardlayout">
      <DashboardNav />
      <main className="Dashboardlayout__main">{children}</main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
