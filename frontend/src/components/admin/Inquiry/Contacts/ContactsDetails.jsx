// src/components/admin/Contacts/ContactDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../api/api";
import "./ContactDetails.css";
import pencil from "../../../../assets/icons/pencil.svg";

function ContactDetails() {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchContact() {
            try {
                const res = await api.get(`/contacts/${id}`);
                setContact(res.data.contact); // Ensure backend sends { contact: { ... } }
            } catch (err) {
                setError("Kunne ikke hente kontaktinformasjon.");
            } finally {
                setLoading(false);
            }
        }

        fetchContact();
    }, [id]);

    if (loading) return <p>Laster kontakt...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!contact) return <p>Fant ikke kontakt.</p>;

    const formattedDate = new Date(contact.timestamp).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="contact-details-card">
            <div className="card-header">
                <h2>{contact.name}</h2>
                <button className="edit-btn" title="Rediger kontakt">
                     <img src={pencil} alt="Rediger" />
                </button>
            </div>
            <hr />
            <div className="contact-info-grid">
                <div>
                    <strong>Virksomhet:</strong>
                    <p>{contact.businessName}</p>
                </div>
                <div>
                    <strong>E-post:</strong>
                    <p>{contact.email}</p>
                </div>
                <div>
                    <strong>Lag til:</strong>
                    <p>{formattedDate}</p>
                </div>
                <div>
                    <strong>Mobil:</strong>
                    <p>{contact.phone}</p>
                </div>
                <div>
                    <strong>Beskrivelse:</strong>
                    <p>{contact.officeLocation || "-"}</p>
                </div>
                <div>
                    <strong>Rolle:</strong>
                    <p>{contact.responsibility}</p>
                </div>
            </div>
        </div>
    );
}

export default ContactDetails;
