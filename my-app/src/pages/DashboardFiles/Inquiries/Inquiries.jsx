import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const response = await api.get("/inquiries");
                setInquiries(response.data); 
            } catch (err) {
                console.error("Error fetching inquiries:", err);
                setError("Failed to fetch inquiries.");
            } finally {
                setLoading(false);
            }
        };

        fetchInquiries();
    }, []); // Don't forget the dependency array!

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">Inquiries</h1>
            {loading ? (
                <p>Loading inquiries...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : inquiries.length === 0 ? (
                <p>No inquiries found.</p>
            ) : (
                <ul>
                    {inquiries.map((inquiry, index) => (
                        <li key={index}>
                            <strong>{inquiry.subject}</strong>: {inquiry.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Inquiries;
