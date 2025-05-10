import React from "react";
import "./InquiryOpenStyles.css";

const AiRecommendation = ({ data }) => {
    if (!data) return <div>Laster henvendelse...</div>;

    return (
        <div className="top-info-panel">
        ai recommendation
        </div>
    );
};

export default AiRecommendation;
