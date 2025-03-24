import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import AuthContext from "../context/AuthContext";
import api from "../api/api";
import Header from "../components/header/Header";

const Contact = () => {

    return (
        <div className="home" style={{ width: "100%", height: "100%" }}>
          <p>Contact Page</p>
        </div>
    );
};

export default Contact;
