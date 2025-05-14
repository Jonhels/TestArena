import { useEffect, useState } from "react";
import api from "../../../api/api";
import InquiryList from "../../../components/admin/Inquiry/InquiryList/InquiryList";
import InquiryHeader from "../../../components/admin/Inquiry/InquiryHeader/InquiryHeader";
import "../../admin/Dashboard/Dashboard.css";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

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
        setInquiries={setInquiries}
        setLoading={setLoading}
        setError={setError}
      />
    </div>
  );
};

export default Inquiries;
