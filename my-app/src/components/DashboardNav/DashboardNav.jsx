import "./DashboardNav.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import dashboardlogo from "../../assets/images/footer-logo.svg";
import dashboardicon from "../../assets/images/dashboard.svg";
import inquryicon from "../../assets/images/henvendelser.svg";
import calendaricon from "../../assets/images/kalender.svg";
import contacticon from "../../assets/images/kontakter.svg";
import archiveicon from "../../assets/images/arkiv.svg";
import settingsicon from "../../assets/images/instillinger.svg";
import logouticon from "../../assets/images/logout.svg";

const DashboardNav = () => {
  return (
    <nav className="dashboard-nav">
      <ul className="nav-list">
        <li className="nav-item dashboardLogo__container">
          <img src={dashboardlogo} alt="Dashboard Logo" className="dashboardlogo" />
          <h2 className="dashboardLogo__text">TestArena</h2>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link">
          <img src={dashboardicon} alt="icon" className="icon" />
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/henvendelser" className="nav-link">
            <img src={inquryicon} alt="icon" className="icon" />
            Henvendelser
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/kalender" className="nav-link">
          <img src={calendaricon} alt="icon" className="icon" />
            Kalender
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/kontakter" className="nav-link">
            <img src={contacticon} alt="icon" className="icon" />
            Kontakter
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/arkiv" className="nav-link">
            <img src={archiveicon} alt="icon" className="icon" />
            Arkiv
          </NavLink>
        </li>

      </ul>
      <ul className="nav-list-bottom">
        <li>
          <NavLink to="/instillinger" className="nav-link">
            <img src={settingsicon} alt="icon" className="icon" />
            Instillinger
          </NavLink>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={useLogout} className="nav-link">
            <img src={logouticon} alt="icon" className="icon" />
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNav;