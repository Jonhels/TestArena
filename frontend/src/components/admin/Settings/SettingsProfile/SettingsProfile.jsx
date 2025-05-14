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
            <div className="settings-profile__header">
                <div className="settings-profile__title">
                    <img src={profile} alt="Profil ikon" />
                    <span>Profil</span>
                </div>
                <img
                    src={isOpen ? arrowup : arrowdown}
                    alt="Toggle"
                    className="settings-profile__toggle"
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>

            {isOpen && (
                <div className="settings-profile__wrapper">
                    <div className="settings-profile-icon">
                        <img src={pencil} alt="Rediger" className="settings-profile__edit-icon" />
                    </div>
                    <div className="settings-profile__body">
                        <div className="settings-profile__avatar-wrapper">
                            <div className="settings-profile__avatar">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profilbilde" />
                                ) : (
                                    <span>{getInitials(name)}</span>
                                )}
                            </div>
                        </div>
                        <div className="settings-profile__info-left">
                            <div className="settings-profile__name">{name}</div>
                            <div className="settings-profile__email">e-post: {email}</div>
                            <div className="settings-profile__phone">Tel: 90 90 90 99</div>
                        </div>

                        <div className="settings-profile__right">
                            <div className="settings-profile__role-org">
                                <div className="settings-profile__role">Rolle: Admin</div>
                                <div className="settings-profile__org">Tilhører organisasjon: HelseInn</div>
                            </div>
                        </div>

                    </div>

                </div>
            )}
        </section>
    );
};

export default SettingsProfile;
