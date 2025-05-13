import { useState, useContext } from "react";
import api from "../../../../api/api";
import { AuthContext } from "../../../../context/AuthContext";
import "./ContactsList.css";

function AddContactForm({ onClose, onAdd }) {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
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
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Vennligst skriv inn navn";
    else if (form.name.length > 50) newErrors.name = "Navn kan ikke være lenger enn 50 tegn";

    if (!form.email) newErrors.email = "Vennligst skriv inn e-post";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) newErrors.email = "E-posten er ugyldig";
    }

    if (!form.phone) newErrors.phone = "Vennligst skriv inn mobilnummer";
    else if (form.phone.length < 8) newErrors.phone = "Mobilnummer må være minst 8 sifre";

    if (!form.officeLocation) newErrors.officeLocation = "Skriv inn beskrivelse";
    else if (form.officeLocation.length > 100) newErrors.officeLocation = "Maks 100 tegn";

    if (!form.businessName) newErrors.businessName = "Vennligst skriv inn virksomhet";
    else if (form.businessName.length > 100) newErrors.businessName = "Maks 100 tegn";

    if (!form.responsibility) newErrors.responsibility = "Vennligst skriv inn rolle";
    else if (form.responsibility.length > 100) newErrors.responsibility = "Maks 100 tegn";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const payload = { ...form, userId: user?._id };
      const response = await api.post("/contacts", payload);
      onAdd(response.data.contact);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || "";
      if (msg.includes("duplicate key error") || msg.includes("E11000")) {
        setErrors({ email: "Denne e-posten er allerede registrert" });
      } else {
        setErrors({ submit: "Noe gikk galt. Prøv igjen." });
      }
      console.error("API error:", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="add-contact-form">
        <h2>Legg til ny kontakt</h2>

        <div className="form-section">
          <div className="form-pair">
            <label>Navn:</label>
            <input name="name" value={form.name} onChange={handleChange} maxLength={50} placeholder="Navn" />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-pair">
            <label>E-post:</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="E-post" maxLength={50} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
        </div>

        <div className="form-section">
          <div className="form-pair">
            <label>Virksomhet:</label>
            <input name="businessName" value={form.businessName} onChange={handleChange} maxLength={100} placeholder="Virksomhet" />
            {errors.businessName && <span className="form-error">{errors.businessName}</span>}
          </div>
          <div className="form-pair">
            <label>Mobil:</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Mobilnummer" maxLength={15} type="tel" />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-section">
          <div className="form-pair">
            <label>Rolle:</label>
            <input name="responsibility" value={form.responsibility} onChange={handleChange} maxLength={100} placeholder="Rolle" />
            {errors.responsibility && <span className="form-error">{errors.responsibility}</span>}
          </div>
          <div className="form-pair">
            <label>Kontakt lagt til:</label>
            <input disabled value={new Date().toLocaleDateString("nb-NO")} />
          </div>
        </div>

        <div className="form-section">
          <label>Beskriv kontakten. Brukes til AI-forslag.</label>
          <textarea
            name="officeLocation"
            maxLength={100}
            value={form.officeLocation}
            onChange={handleChange}
            placeholder="Beskrivelse av kontakten"
          />
          {errors.officeLocation && <span className="form-error">{errors.officeLocation}</span>}
        </div>

        {error && <p className="inquiry-error">{error}</p>}

        <div className="form-actions">
          <button className="cancel-btn" onClick={onClose}>Avbryt</button>
          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Lagrer..." : "Lagre"}
          </button>
          {errors.submit && <p className="form-error">{errors.submit}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddContactForm;
