import "./DashboardNav.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import dashboardlogo from "../../assets/images/footer-logo.svg";


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
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/inquiries" className="nav-link">
            Henvendelser
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/calendar" className="nav-link">
            Kalender
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contacts" className="nav-link">
            Kontakter
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/archive" className="nav-link">
            Arkiv
          </NavLink>
        </li>

      </ul>
      <ul className="nav-list-bottom">
        <li>
          <NavLink to="/settings" className="nav-link">
            Instillinger
          </NavLink>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={useLogout} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNav;