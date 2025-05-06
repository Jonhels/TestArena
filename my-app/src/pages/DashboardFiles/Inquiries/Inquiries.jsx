import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import InquiryList from "../../../components/InquiryComponents/InquiryList";

const Inquiries = () => {

  return (
    <div className="dashboard-container">
      <InquiryList></InquiryList>
    </div>
  );
};

export default Inquiries;
