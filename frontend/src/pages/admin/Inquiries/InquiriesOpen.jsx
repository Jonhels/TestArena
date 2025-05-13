import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import back from "../../../assets/icons/arrow-left.svg";
import api from "../../../api/api";
import TopInfoPanel from "../../../components/admin/Inquiry/InquiryOpen/TopInfoPanel";
import AiRecommendation from "../../../components/admin/Inquiry/InquiryOpen/AiRecommendation";
import InquiryDetails from "../../../components/admin/Inquiry/InquiryOpen/InquiryDetails";
import InquiryStatus from "../../../components/admin/Inquiry/InquiryStatus/InquiryStatus";

const InquiriesOpen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiryData, setInquiryData] = useState(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await api.get(`/inquiries/${id}`);
        setInquiryData(response.data.inquiry);
      } catch (error) {
        console.error("Failed to fetch inquiry:", error);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleLocalUpdate = (updatedFields) => {
    setInquiryData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  return (
    <div className="dashboard-container">
      <div className="back-button-container">
        <img src={back} alt="Tilbake" />
        <Link to="/henvendelser">
          <p>Tilbake til henvendelser</p>
        </Link>
      </div>

      {inquiryData && (
        <InquiryStatus
          inquiryId={inquiryData._id}
          inquiryData={inquiryData}
          onUpdate={handleLocalUpdate}
        />
      )}

      <TopInfoPanel data={inquiryData} />
      <AiRecommendation data={inquiryData} />
      <InquiryDetails data={inquiryData} />
    </div>
  );
};

export default InquiriesOpen;
