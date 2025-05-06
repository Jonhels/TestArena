import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import InquiryList from "../../../components/InquiryComponents/InquiryList";
import InquiryHeader from "../../../components/InquiryComponents/InquiryHeader";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await api.get("/inquiries");
        setInquiries(res.data.inquiries || []);
      } catch {
        setError("Kunne ikke hente henvendelser.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="dashboard-container">
      <InquiryHeader inquiries={inquiries} />
      <InquiryList
        inquiries={inquiries}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Inquiries;
