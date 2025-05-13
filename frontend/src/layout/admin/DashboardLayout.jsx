import PropTypes from "prop-types";
import { useState } from "react";
import DashboardNav from "../../components/admin/NavBar/NavBar";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="Dashboardlayout">
      <DashboardNav
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <main className="Dashboardlayout__main">{children}</main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
