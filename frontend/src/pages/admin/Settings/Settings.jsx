import React, { useContext, useEffect, useState } from "react";
import "../../admin/Dashboard/Dashboard.css";

import SettingsHeader from "../../../components/admin/Settings/SettingsHeader/SettingsHeader";
import SettingsProfile from "../../../components/admin/Settings/SettingsProfile/SettingsProfile";
import SettingsPassword from "../../../components/admin/Settings/SettingsPassword/SettingsPassword";
import SettingsLanguage from "../../../components/admin/Settings/SettingsLanguage/SettingsLanguage";
import SettingsNotifications from "../../../components/admin/Settings/SettingsNotifications/SettingsNotifications";
import SettingsUsers from "../../../components/admin/Settings/SettingsUsers/SettingsUsers";

import api from "../../../api/api";
import { AuthContext } from "../../../context/AuthContext";

const Settings = () => {
  const { user, setUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState("norsk");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/profiles");
      setUsers(res.data.admins);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const updateProfile = async (updates) => {
    try {
      const res = await api.put("/users/update", updates);
      setUser(res.data.user);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };


  const toggleNotifications = async (value) => {
    try {
      const res = await api.put("/users/update", {
        emailNotifications: value,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Error updating notifications:", err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <SettingsHeader />

      <SettingsProfile
        name={user.name}
        email={user.email}
        profileImage={user.profileImage}
        updateProfile={updateProfile}
        phone={user.phone}
        role={user.role}
        organization={user.organization}
      />

      <SettingsPassword updatePassword={updateProfile} />

      <SettingsNotifications
        emailNotifications={user.emailNotifications}
        toggleNotifications={toggleNotifications}
      />

      <SettingsUsers users={users} refetchUsers={fetchUsers} />

      <SettingsLanguage
        currentLanguage={language}
        setLanguage={setLanguage}
      />
    </div>
  );
};

export default Settings;
