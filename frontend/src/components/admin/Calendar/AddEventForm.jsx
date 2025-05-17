import { useState } from "react";
import api from "../../../api/api";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/calendar", formData);
      alert("Hendelse opprettet!");
    } catch (err) {
      alert("Noe gikk galt.");
      console.error(err);
    }
  };

  return (
    <div className="calendar-form-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tittel"
          required
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="datetime-local"
          required
          onChange={(e) =>
            setFormData({ ...formData, startTime: e.target.value })
          }
        />
        <input
          type="datetime-local"
          required
          onChange={(e) =>
            setFormData({ ...formData, endTime: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Lokasjon"
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
        <button type="submit">Opprett hendelse</button>
      </form>
    </div>
  );
};

export default AddEventForm;
