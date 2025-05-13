import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api/api";
import "./Dashboard.css";

const StatsBoxes = () => {
  const [stats, setStats] = useState({
    newInquiries: 0,
    ongoing: 0,
    completed: 0,
    total: 0,
  });

  useEffect(() => {
    api
      .get("/inquiries")
      .then((res) => {
        const inquiries = res.data.inquiries;
        const now = new Date();
        const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));

        const newInquiries = inquiries.filter(
          (inq) => new Date(inq.createdAt) >= lastYear
        ).length;
        const ongoing = inquiries.filter(
          (inq) => inq.status === "i arbeid"
        ).length;
        const completed = inquiries.filter(
          (inq) => inq.status === "ferdig"
        ).length;

        setStats({
          newInquiries,
          ongoing,
          completed,
          total: inquiries.length,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="stats-boxes">
      <StatBox title="Nye henvendelser (siste år)" value={stats.newInquiries} />
      <StatBox title="Pågående" value={stats.ongoing} />
      <StatBox title="Avsluttet" value={stats.completed} />
      <StatBox title="Total" value={stats.total} />
    </div>
  );
};

const StatBox = ({ title, value }) => (
  <div className="stat-box">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
  </div>
);

StatBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default StatsBoxes;
