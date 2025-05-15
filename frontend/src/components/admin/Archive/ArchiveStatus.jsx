import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import "../Inquiry/InquiryStatus/InquiryStatus.css";

const ArchiveStatus = ({ inquiryId, inquiryData, onUpdate }) => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(
    inquiryData?.assignedTo?._id || ""
  );
  const [status, setStatus] = useState(inquiryData?.status || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (admins.length && inquiryData?.assignedTo?._id) {
      setSelectedAdmin(inquiryData.assignedTo._id);
    }
  }, [inquiryData, admins]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await api.get("/users/profiles"); // Adjust endpoint if needed
        setAdmins(res.data.users || []);
      } catch (err) {
        console.error("Failed to fetch admin users", err);
      }
    };

    fetchAdmins();
  }, []);
  const handleAssignChange = async (e) => {
    const newAdminId = e.target.value;
    setSelectedAdmin(newAdminId);

    try {
      await api.put(`/inquiries/assign/${inquiryId}`, { adminId: newAdminId });
      onUpdate?.({ assignedTo: newAdminId });
    } catch (err) {
      console.error("Failed to assign admin", err);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await api.put(`/inquiries/status/${inquiryId}`, { newStatus });

      if (newStatus === "ferdig" && !inquiryData.archived) {
        await api.put(`/inquiries/archive/${inquiryId}`);
        onUpdate?.({ status: newStatus, archived: true }); // update both
        navigate(`/arkiv/${inquiryId}`);
      } else if (
        ["ulest", "i arbeid"].includes(newStatus) &&
        inquiryData.archived
      ) {
        await api.put(`/inquiries/restore/${inquiryId}`);
        onUpdate?.({ status: newStatus, archived: false });
        navigate(`/henvendelser/${inquiryId}`);
      } else {
        onUpdate?.({ status: newStatus });
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="inquiry-status-bar">
      <div className="inquiry-status-group">
        <label>Sett ansvarlig</label>
        <select value={selectedAdmin} onChange={handleAssignChange}>
          <option value="">Ingen</option>
          {admins.map((admin) => (
            <option key={admin._id} value={admin._id}>
              {admin.name}
            </option>
          ))}
        </select>
      </div>

      <div className="inquiry-status-group">
        <label>Sett status</label>
        <select value={status} onChange={handleStatusChange}>
          <option value="ulest">Ny</option>
          <option value="i arbeid">Pågående</option>
          <option value="ferdig">Avsluttet</option>
        </select>
      </div>
    </div>
  );
};

export default ArchiveStatus;
