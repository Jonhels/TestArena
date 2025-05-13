import "../Inquiry/InquiryHeader/InquiryHeader.css";

const ArchiveHeader = ({ inquiries = [] }) => {
  const newCount = inquiries.filter((inq) => inq.status === "ulest").length;

  return (
    <div className="inquiry-header-wrapper">
      <div className="inquiry-summary">
        <h2 className="inquiry-title">Arkiv</h2>
        <p className="inquiry-subtext">
          Her finner du en oversikt over alle arkiverte henvendelser.
        </p>
      </div>
    </div>
  );
};

export default ArchiveHeader;
