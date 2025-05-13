import "./DashboardNav.css";
import { NavLink, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import dashboardlogo from "../../assets/images/footer-logo.svg";
import dashboardicon from "../../assets/images/dashboard.svg";
import inquryicon from "../../assets/images/henvendelser.svg";
import calendaricon from "../../assets/images/kalender.svg";
import contacticon from "../../assets/images/kontakter.svg";
import archiveicon from "../../assets/images/arkiv.svg";
import settingsicon from "../../assets/images/instillinger.svg";
import logouticon from "../../assets/images/logout.svg";
import hamburger from "../../assets/images/hamburger.svg";

const DashboardNav = ({ isMobileOpen, setIsMobileOpen }) => {
  const logout = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <img
          src={hamburger}
          alt="Meny"
          className="hamburger-icon"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        />
      </div>

      {/* Backdrop */}
      {isMobileOpen && <div className="nav-backdrop" onClick={() => setIsMobileOpen(false)} />}

      {/* Sidebar Navigation */}
      <nav className={`dashboard-nav ${isMobileOpen ? "open" : ""}`}>
      
        <ul className="nav-list">
        {isMobileOpen && (
    <button className="mobile-close-btn" onClick={() => setIsMobileOpen(false)}>
      &times;
    </button>
  )}
          <li className="nav-item dashboardLogo__container">
            <img src={dashboardlogo} alt="Dashboard Logo" className="dashboardlogo" />
            <h2 className="dashboardLogo__text">TestArena</h2>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link" onClick={() => setIsMobileOpen(false)}>
              <img src={dashboardicon} alt="icon" className="icon" />
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/henvendelser" className="nav-link" onClick={() => setIsMobileOpen(false)}>
              <img src={inquryicon} alt="icon" className="icon" />
              Henvendelser
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/kalender" className="nav-link" onClick={() => setIsMobileOpen(false)}>
              <img src={calendaricon} alt="icon" className="icon" />
              Kalender
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/kontakter" className="nav-link" onClick={() => setIsMobileOpen(false)}>
              <img src={contacticon} alt="icon" className="icon" />
              Kontakter
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/arkiv" className="nav-link" onClick={() => setIsMobileOpen(false)}>
              <img src={archiveicon} alt="icon" className="icon" />
              Arkiv
            </NavLink>
          </li>
        </ul>
        <ul className="nav-list-bottom">
          <li>
            <NavLink to="/instillinger" className="nav-link" onClick={() => setIsMobileOpen(false)}>
              <img src={settingsicon} alt="icon" className="icon" />
              Instillinger
            </NavLink>
          </li>
          <li className="nav-item">
            <Link to="/" onClick={handleLogout} className="nav-link">
              <img src={logouticon} alt="icon" className="icon" />
              Logg ut
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DashboardNav;
