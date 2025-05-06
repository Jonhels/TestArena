import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InquiryList.css";
import more from "../../assets/images/more-vertical.svg";

function InquiryList({ inquiries = [], loading, error }) {
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResponsible, setSelectedResponsible] = useState("Alle");
  const [selectedCompany, setSelectedCompany] = useState("Alle");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    filterInquiries();
  }, [inquiries, searchQuery, selectedResponsible, selectedCompany]);

  const handleClick = (id) => {
    navigate(`/henvendelser/${id}`);
  };

  const formatStatusLabel = (status) => {
    switch (status) {
      case "ulest":
        return "Ny";
      case "i arbeid":
        return "Pågående";
      case "ferdig":
        return "Avsluttet";
      default:
        return status;
    }
  };

  const statusDotColor = (status) => {
    switch (status) {
      case "ulest":
        return "green";
      case "i arbeid":
        return "orange";
      case "ferdig":
        return "red";
      default:
        return "gray";
    }
  };

  const filterInquiries = () => {
    let result = [...inquiries];

    if (selectedResponsible !== "Alle") {
      result = result.filter((inq) => (inq.assignedTo || "Ingen") === selectedResponsible);
    }

    if (selectedCompany !== "Alle") {
      result = result.filter((inq) => inq.companyName === selectedCompany);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (inq) =>
          inq.productTitle?.toLowerCase().includes(q) ||
          inq.companyName?.toLowerCase().includes(q) ||
          inq.contactName?.toLowerCase().includes(q)
      );
    }

    setFilteredInquiries(result);
    setCurrentPage(1);
  };

  const uniqueResponsibles = [
    "Alle",
    ...new Set(inquiries.map((i) => i.assignedTo || "Ingen").filter(Boolean)),
  ];

  const uniqueCompanies = [
    "Alle",
    ...new Set(inquiries.map((i) => i.companyName).filter(Boolean)),
  ];

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts[parts.length - 1]?.[0] || "";
    return (first + last).toUpperCase();
  };

  const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE);
  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="inquiry-wrapper">
      <div className="filter-bar">
        <div className="filter-group">
          <label>Ansvarlig</label>
          <select value={selectedResponsible} onChange={(e) => setSelectedResponsible(e.target.value)}>
            {uniqueResponsibles.map((res, idx) => (
              <option key={idx} value={res}>{res}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Virksomhet</label>
          <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            {uniqueCompanies.map((comp, idx) => (
              <option key={idx} value={comp}>{comp}</option>
            ))}
          </select>
        </div>
        <div className="filter-group search">
          <label>Søk</label>
          <input
            type="text"
            placeholder="Søk"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p>Laster inn...</p>
      ) : error ? (
        <p className="inquiry-error">{error}</p>
      ) : (
        <>
          <div className="inquiry-list">
            <div className="inquiry-header">
              <div>Tittel:</div>
              <div>Virksomhet:</div>
              <div>Kontaktperson:</div>
              <div>Mottatt:</div>
              <div>Case nr:</div>
              <div>Ansvarlig:</div>
              <div>Status:</div>
              <div></div>
            </div>

            {paginatedInquiries.map((inq) => (
              <div
                className={`inquiry-row ${inq.status === "ulest" ? "new-inquiry" : ""}`}
                key={inq._id}
                onClick={() => handleClick(inq._id)}
              >
                <div title={inq.productTitle}>{inq.productTitle}</div>
                <div title={inq.companyName}>{inq.companyName}</div>
                <div title={inq.contactName}>{inq.contactName}</div>
                <div>{inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "–"}</div>
                <div>{inq.caseNumber || "–"}</div>
                <div>
                  {inq.assignedTo && (
                    <div className="inquiry-avatar">
                      {inq.contactName ? getInitials(inq.contactName) : "?"}
                    </div>
                  )}
                </div>
                <div className="inquiry-status">
                  {inq.status !== "ulest" && (
                    <span
                      className="inquiry-status-dot"
                      style={{ backgroundColor: statusDotColor(inq.status) }}
                    />
                  )}
                  {formatStatusLabel(inq.status)}
                </div>
                <div className="inquiry-options">
                  <img src={more} alt="Mer" />
                </div>
              </div>
            ))}
          </div>

          <span className="result-info">
            Viser {(currentPage - 1) * ITEMS_PER_PAGE + 1} –{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredInquiries.length)} henvendelser
          </span>

          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <span className="pagination-info">
                Viser {(currentPage - 1) * ITEMS_PER_PAGE + 1} –{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredInquiries.length)} av {filteredInquiries.length}
              </span>
              <div className="pagination-controls">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) =>
                  num === 1 || num === totalPages || Math.abs(num - currentPage) <= 1 ? (
                    <button key={num} onClick={() => handlePageChange(num)} className={num === currentPage ? "active" : ""}>
                      {num}
                    </button>
                  ) : num === currentPage - 2 || num === currentPage + 2 ? (
                    <span key={num} className="dots">…</span>
                  ) : null
                )}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  &gt;
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default InquiryList;
