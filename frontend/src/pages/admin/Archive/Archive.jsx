import { useEffect, useState } from "react";
import api from "../../../api/api";
import ArchiveList from "../../../components/admin/Archive/ArchiveList";
import ArchiveHeader from "../../../components/admin/Archive/ArchiveHeader";

const Archive = () => {
  const [archivedInquiries, setArchivedInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArchived = async () => {
      try {
        const res = await api.get("/inquiries?includeArchived=true");
        const archivedOnly = res.data.inquiries?.filter(
          (inq) => inq.archived === true
        );
        setArchivedInquiries(archivedOnly);
      } catch {
        setError("Kunne ikke hente arkiverte henvendelser.");
      } finally {
        setLoading(false);
      }
    };

    fetchArchived();
  }, []);

  return (
    <div className="dashboard-container">
      <ArchiveHeader inquiries={archivedInquiries} />
      <ArchiveList
        inquiries={archivedInquiries}
        loading={loading}
        error={error}
        setInquiries={setArchivedInquiries}
        setLoading={setLoading}
        setError={setError}
      />
    </div>
  );
};

export default Archive;
