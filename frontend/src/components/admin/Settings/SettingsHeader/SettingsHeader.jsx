import React from "react";
import "./SettingsHeader.css";

const SettingsHeader = () => {
    
    return (
        <div className="settings-header-wrapper">
            <div className="settings-summary">
                <h2 className="settings-title">Innstillinger</h2>
                <p className="settings-subtext">
                    Her finner du en oversikt over innstillinger.
                </p>
            </div>
        </div>
    );
}

export default SettingsHeader;