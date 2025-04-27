// src/context/LanguageProvider.js
import { useState, useEffect } from "react";
import { LanguageContext } from "./LanguageContext";
import PropTypes from "prop-types";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("NO");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "NO" ? "EN" : "NO";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
