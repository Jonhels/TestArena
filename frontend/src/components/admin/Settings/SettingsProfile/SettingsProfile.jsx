import React, { useState } from "react";
import "./SettingsProfile.css";
import pencil from "../../../../assets/icons/pencil.svg";
import profile from "../../../../assets/icons/profile.svg";
import arrowup from "../../../../assets/icons/arrow-up.svg";
import arrowdown from "../../../../assets/icons/arrow-down.svg";

const SettingsProfile = ({ name, email, profileImage }) => {
    const [isOpen, setIsOpen] = useState(true);

    const getInitials = (fullName) =>
        fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

    return (
        <section className="settings-profile">
            <div className="profile-header">
                <div className="profile-title">
                    <img src={profile} alt="Profil ikon" />
                    <span>Profil</span>
                </div>
                <img
                    src={isOpen ? arrowup : arrowdown}
                    alt="Toggle"
                    className="toggle-arrow"
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>

            {isOpen && (
                <div className="profile-body">
                    <div className="profile-avatar">
                        {profileImage ? (
                            <img src={profileImage} alt="Profilbilde" />
                        ) : (
                            <span>{getInitials(name)}</span>
                        )}
                    </div>

                    <div className="profile-info-aligner">
                        <div className="profile-info-left">
                            <div className="name">{name}</div>
                            <div className="email">e-post: {email}</div>
                            <div className="phone">Tel: 90 90 90 99</div>
                        </div>

                        <div className="profile-info-right">
                            <div className="role-org">
                                <div className="role">Rolle: Admin</div>
                                <div className="org">Tilhører organisasjon: HelseInn</div>
                            </div>
                        </div>
                        <img src={pencil} alt="Rediger" className="edit-icon" />
                    </div>
                </div>
            )}
        </section>
    );
};

export default SettingsProfile;
