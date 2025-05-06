import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./InquiryList.css";

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResponsible, setSelectedResponsible] = useState("Alle");
  const [selectedCompany, setSelectedCompany] = useState("Alle");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await api.get("/inquiries");
        setInquiries(res.data.inquiries || []);
      } catch (err) {
        setError("Kunne ikke hente henvendelser.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [inquiries, searchQuery, selectedResponsible, selectedCompany]);

  const handleClick = (id) => {
    navigate(`/inquiries/${id}`);
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
      result = result.filter(
        (inq) => inq.responsible === selectedResponsible
      );
    }

    if (selectedCompany !== "Alle") {
      result = result.filter((inq) => inq.company === selectedCompany);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (inq) =>
          inq.title.toLowerCase().includes(q) ||
          inq.company.toLowerCase().includes(q) ||
          inq.contactPerson.toLowerCase().includes(q)
      );
    }

    setFilteredInquiries(result);
  };

  // Get unique values for filters
  const uniqueResponsibles = [
    "Alle",
    ...new Set(inquiries.map((i) => i.responsible).filter(Boolean)),
  ];

  const uniqueCompanies = [
    "Alle",
    ...new Set(inquiries.map((i) => i.company).filter(Boolean)),
  ];

  return (
    <div className="inquiry-wrapper">
      <h2 className="inquiry-title">Henvendelser</h2>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Ansvarlig</label>
          <select
            value={selectedResponsible}
            onChange={(e) => setSelectedResponsible(e.target.value)}
          >
            {uniqueResponsibles.map((res, idx) => (
              <option key={idx} value={res}>
                {res}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Virksomhet</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {uniqueCompanies.map((comp, idx) => (
              <option key={idx} value={comp}>
                {comp}
              </option>
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
        <div className="inquiry-list">
          <div className="inquiry-header">
            <div>Tittel:</div>
            <div>Virksomhet:</div>
            <div>Kontaktperson:</div>
            <div>Mottatt:</div>
            <div>Case nr:</div>
            <div>Ansvarlig:</div>
            <div>Status:</div>
          </div>

          {filteredInquiries.map((inq) => (
            <div
              key={inq._id}
              className="inquiry-row"
              onClick={() => handleClick(inq._id)}
            >
              <div>{inq.title}</div>
              <div>{inq.company}</div>
              <div>{inq.contactPerson}</div>
              <div>{new Date(inq.receivedDate).toLocaleDateString()}</div>
              <div>{inq.caseNumber}</div>
              <div>
                <div className="inquiry-avatar">
                  {inq.responsible?.[0]}
                </div>
              </div>
              <div className="inquiry-status">
                <span
                  className="inquiry-status-dot"
                  style={{ backgroundColor: statusDotColor(inq.status) }}
                ></span>
                {formatStatusLabel(inq.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InquiryList;
