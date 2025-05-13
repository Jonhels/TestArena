import { useEffect, useState } from "react";
import api from "../../../api/api";
import "./Dashboard.css";

const WelcomeBox = () => {
  const [userName, setUserName] = useState("bruker");

  useEffect(() => {
    api
      .get("/users/profile")
      .then((res) => setUserName(res.data.user.name))
      .catch((err) => console.error(err));
  }, []);

  return <h1 className="dashboard-heading">Velkommen, {userName}!</h1>;
};

export default WelcomeBox;
