import React from "react";
import "./InquiryHeader.css";

const InquiryHeader = ({ inquiries = [] }) => {
  const newCount = inquiries.filter((inq) => inq.status === "ulest").length;

  return (
    <div className="inquiry-header-wrapper">
      <div className="inquiry-summary">
        <h2 className="inquiry-title">Henvendelser</h2>
        <p className="inquiry-subtext">
          Her finner du en oversikt over henvendelser. Velg en henvendelse for å se detaljer.
        </p>
      </div>
      <div className="inquiry-badge">
        <span className="label-badge">Nye:</span>
        <span className="inquiry-badge-count">{newCount}</span>
      </div>
    </div>

  );
};

export default InquiryHeader;
