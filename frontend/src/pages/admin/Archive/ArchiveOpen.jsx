import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import back from "../../../assets/icons/arrow-left.svg";
import "../Inquiries/InquiresOpen.css";
import api from "../../../api/api";
import TopInfoPanel from "../../../components/admin/Inquiry/InquiryOpen/TopInfoPanel";
import AiRecommendation from "../../../components/admin/Inquiry/InquiryOpen/AiRecommendation";
import InquiryDetails from "../../../components/admin/Inquiry/InquiryOpen/InquiryDetails";
import ArchiveStatus from "../../../components/admin/Archive/ArchiveStatus";
import "../../admin/Dashboard/Dashboard.css";

const ArchiveOpen = () => {
  const { id } = useParams();
  const [inquiryData, setInquiryData] = React.useState(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await api.get(`/inquiries/${id}`);
        setInquiryData(response.data.inquiry);
        console.log(response.data.inquiry);
      } catch (error) {
        console.error("Kunne ikke hente henvendelse:", error);
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
        <img src={back}></img>
        <Link to="/arkiv">
          <p>Tilbake til arkiv</p>
        </Link>
      </div>
      {inquiryData && (
        <ArchiveStatus
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

export default ArchiveOpen;
