import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../api/api";
import "./ContactDetails.css";
import pencil from "../../../../assets/icons/pencil.svg";

function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await api.get(`/contacts/${id}`);
        setContact(res.data.contact);
        setForm(res.data.contact);
      } catch (err) {
        setError("Kunne ikke hente kontaktinformasjon.");
      } finally {
        setLoading(false);
      }
    }

    fetchContact();
  }, [id]);

  const formattedDate = new Date(contact?.timestamp).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
  };

  const validateForm = () => {
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

    if (!form.businessName) newErrors.businessName = "Vennligst skriv inn virksomhet";
    else if (form.businessName.length > 100) newErrors.businessName = "Maks 100 tegn";

    if (!form.responsibility) newErrors.responsibility = "Vennligst skriv inn rolle";
    else if (form.responsibility.length > 100) newErrors.responsibility = "Maks 100 tegn";

    if (!form.officeLocation) newErrors.officeLocation = "Skriv inn beskrivelse";
    else if (form.officeLocation.length > 100) newErrors.officeLocation = "Maks 100 tegn";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      const res = await api.put(`/contacts/${id}`, form);
      setContact(res.data.contact);
      setEditMode(false);
      setErrors({});
      setError("");
    } catch (err) {
      const msg = err.response?.data?.message || "";
      if (msg.includes("duplicate") || msg.includes("E11000")) {
        setErrors({ email: "Denne e-posten er allerede registrert" });
      } else {
        setError("Noe gikk galt ved oppdatering.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Laster kontakt...</p>;
  if (error) return <p className="form-error">{error}</p>;
  if (!contact) return <p>Fant ikke kontakt.</p>;

  return (
    <div className="contact-details-card">
      <div className="card-header">
        {editMode ? (
          <div className="form-pair fullwidth">
            <label>Navn:</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="edit-input large"
              placeholder="Navn"
              maxLength={50}
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>
        ) : (
          <h2 className="truncate">{contact.name}</h2>
        )}
        {!editMode && (
          <button className="edit-btn" title="Rediger kontakt" onClick={() => setEditMode(true)}>
            <img src={pencil} alt="Rediger" />
          </button>
        )}
      </div>

      <div className="BlueBorderlineTop"></div>

      {editMode ? (
        <>
          <div className="form-section">
            <div className="form-pair">
              <label>Virksomhet:</label>
              <input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                className="edit-input"
                placeholder="Virksomhet"
                maxLength={100}
              />
              {errors.businessName && <p className="form-error">{errors.businessName}</p>}
            </div>

            <div className="form-pair">
              <label>E-post:</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="edit-input"
                placeholder="E-post"
                maxLength={100}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-pair">
              <label>Mobil:</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="edit-input"
                placeholder="Mobilnummer"
                maxLength={15}
              />
              {errors.phone && <p className="form-error">{errors.phone}</p>}
            </div>
          </div>

          <div className="form-section">
            <div className="form-pair">
              <label>Rolle:</label>
              <input
                name="responsibility"
                value={form.responsibility}
                onChange={handleChange}
                className="edit-input"
                placeholder="Rolle"
                maxLength={100}
              />
              {errors.responsibility && <p className="form-error">{errors.responsibility}</p>}
            </div>

            <div className="form-pair fullwidth">
              <label>Beskrivelse:</label>
              <textarea
                name="officeLocation"
                value={form.officeLocation}
                onChange={handleChange}
                className="edit-textarea"
                placeholder="Beskrivelse av kontakten"
                maxLength={100}
              />
              {errors.officeLocation && <p className="form-error">{errors.officeLocation}</p>}
            </div>
          </div>

          <div className="form-pair">
            <label>Kontakt lagt til:</label>
            <input disabled value={formattedDate} className="edit-input" />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="edit-actions">
            <button
              className="cancel-btn"
              onClick={() => {
                setForm(contact);
                setErrors({});
                setEditMode(false);
              }}
            >
              Avbryt
            </button>
            <button className="submit-btn" onClick={handleSave} disabled={saving}>
              {saving ? "Lagrer..." : "Lagre"}
            </button>
          </div>
        </>
      ) : (
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
            <strong>Mobil:</strong>
            <p>{contact.phone}</p>
          </div>
          <div>
            <strong>Rolle:</strong>
            <p>{contact.responsibility}</p>
          </div>
          <div>
            <strong>Beskrivelse:</strong>
            <p>{contact.officeLocation || "-"}</p>
          </div>
          <div>
            <strong>Lag til:</strong>
            <p>{formattedDate}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactDetails;
