import { useState, useContext } from "react";
import api from "../../../../api/api";
import {AuthContext} from "../../../../context/AuthContext";

function AddContactForm({ onClose, onAdd }) {
    const { user } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        officeLocation: "",
        businessName: "",
        responsibility: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        const payload = {
            ...form,
            userId: user?._id,
        };
        console.log("Payload being sent:", payload); // 👈

        try {
            const response = await api.post("/contacts", payload);
            onAdd(response.data.contact);
            onClose();
        } catch (err) {
            console.error("Feil ved lagring:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Kunne ikke lagre kontakt.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="add-contact-form">
            <h2>Legg til ny kontakt</h2>

            <div className="form-row">
                <input
                    name="name"
                    placeholder="Navn"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="E-post"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className="form-row">
                <input
                    name="businessName"
                    placeholder="Virksomhet"
                    value={form.businessName}
                    onChange={handleChange}
                />
                <input
                    name="phone"
                    placeholder="Mobil"
                    value={form.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="form-row">
                <input
                    name="responsibility"
                    placeholder="Rolle"
                    value={form.responsibility}
                    onChange={handleChange}
                />
                <input
                    disabled
                    value={new Date().toLocaleDateString("nb-NO")}
                />
            </div>

            <textarea
                name="officeLocation"
                placeholder="Beskriv kontakten. Dette blir brukt til AI-forslag i mottatte henvendelser."
                value={form.officeLocation}
                onChange={handleChange}
            />

            {error && <p className="inquiry-error">{error}</p>}

            <div className="form-actions">
                <button className="cancel-btn" onClick={onClose}>Avbryt</button>
                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Lagrer..." : "Lagre"}
                </button>
            </div>
        </div>
    );
}

export default AddContactForm;
