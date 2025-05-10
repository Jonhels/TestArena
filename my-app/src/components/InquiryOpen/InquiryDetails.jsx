import React from "react";
import "./InquiryOpenStyles.css";

const inquiryDetails = ({ data }) => {
    if (!data) return <div>Laster henvendelse...</div>;

    return (
        <div className="top-info-panel">
        Inquiry Details
        </div>
    );
};

export default inquiryDetails;
