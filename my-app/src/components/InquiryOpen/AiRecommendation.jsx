import React, { useState, useEffect } from "react";
import "./InquiryOpenStyles.css";
import api from "../../api/api";

const AiRecommendation = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);

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

    if (!data) return <div>Laster henvendelse...</div>;

    return (
        <div className="top-info-panel">
            <div className="top-info-panel-header">
                <h2 className="title">AI: Forslag til passende kontakter og ressurser</h2>
            </div>
            <div className="BlueBorderline"></div>
            <div className="top-info-panel-content">
                {loading ? (
                    <p>Henter anbefalinger...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : recommendations.length > 0 ? (
                    recommendations.map((rec, idx) => (
                        <div key={idx} className="recommendation-card">
                            <p><strong>Navn:</strong> {rec.name}</p>
                            <p><strong>Firma:</strong> {rec.businessName}</p>
                            <p><strong>Ansvar:</strong> {rec.responsibility}</p>
                            <p><strong>E-post:</strong> {rec.email}</p>
                            <p><strong>Telefon:</strong> {rec.phone}</p>
                            <p><strong>Kontor:</strong> {rec.officeLocation}</p>
                        </div>
                    ))
                ) : (
                    <p>Ingen anbefalinger funnet.</p>
                )}
            </div>
        </div>
    );
};

export default AiRecommendation;
