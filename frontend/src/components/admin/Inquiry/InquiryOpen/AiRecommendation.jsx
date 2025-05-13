import { useState, useEffect } from "react";
import "./InquiryOpenStyles.css";
import api from "../../../../api/api";
import arrowUp from "../../../../assets/icons/arrow-up.svg";
import arrowDown from "../../../../assets/icons/arrow-down.svg";

const AiRecommendation = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await api.get(`/ai/recommend/${data._id}`);
        setRecommendations(res.data.recommendedContacts);
      } catch (err) {
        setError("Kunne ikke hente anbefalinger.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (data?._id) {
      fetchRecommendations();
    }
  }, [data]);

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts[parts.length - 1]?.[0] || "";
    return (first + last).toUpperCase();
  };

  if (!data) return <div>Laster henvendelse...</div>;

  return (
    <div className="top-info-panel">
      <div
        className="recommendation-toggle-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="section-title">
          AI: Forslag til passende kontakter og ressurser
        </h2>
        <img
          src={isOpen ? arrowUp : arrowDown}
          alt={isOpen ? "Lukk" : "Åpne"}
          className="chevron-icon"
        />
      </div>
      <div className="BlueBorderline"></div>

      {isOpen && (
        <div className="recommendation-grid">
          {loading ? (
            <p>Henter anbefalinger...</p>
          ) : error ? (
            <p>{error}</p>
          ) : recommendations.length > 0 ? (
            recommendations.map((rec, idx) => (
              <div key={idx} className="recommendation-card">
                <div className="inquiry-avatar">
                  {getInitials(rec.name)}
                </div>
                <div className="recommendation-details">
                  <div className="rec-name">{rec.name}</div>
                  <div className="rec-info">
                    <span>{rec.responsibility}</span>
                    <span className="separator"></span>
                    <span>Lokasjon: {rec.officeLocation}</span>
                  </div>
                  <div className="rec-info">
                    <span className="email">Email: {rec.email}</span>
                    <span className="separator">|</span>
                    <span>Telefon: {rec.phone}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Ingen anbefalinger funnet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AiRecommendation;
