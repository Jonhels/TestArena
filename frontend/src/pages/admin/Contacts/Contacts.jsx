import React, { useEffect, useState } from "react";
import ContactsList from "../../../components/admin/Inquiry/Contacts/ContactsList";
import api from "../../../api/api";
import ContactsHeader from "../../../components/admin/Inquiry/Contacts/ContactsHeader";
import "../../admin/Dashboard/Dashboard.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get("/contacts"); // Assumes /api/contacts is your base
        setContacts(res.data.contacts);
      } catch (err) {
        setError("Kunne ikke hente kontakter.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="dashboard-container">
      <ContactsHeader />
      <ContactsList
        contacts={contacts}
        setContacts={setContacts}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Contacts;
