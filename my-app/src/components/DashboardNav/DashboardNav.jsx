import "./DashboardNav.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <nav className="dashboard-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard/inquiries" className="nav-link">
            Henvendelser
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard/calendar" className="nav-link">
            Kalender
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard/contacts" className="nav-link">
            Kontakter
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard/archive" className="nav-link">
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