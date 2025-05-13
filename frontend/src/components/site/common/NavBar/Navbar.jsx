import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../../../context/LanguageContext";
import navbarTranslations from "./navbarTranslations";
import "./Navbar.css";
import logo from "../../../../assets/logos/logo.svg";

function Navbar() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(language);
  const [loaded, setLoaded] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const t = (key) => navbarTranslations[currentLang][key] || key;

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    if (language !== currentLang) {
      setCurrentLang(language);
    }
  }, [language, currentLang]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const links = [
    { key: "home", path: "/" },
    { key: "services", path: "/tjenester" },
    { key: "about", path: "/om-oss" },
    { key: "form", path: "/henvendelsesskjema" },
  ];

  return (
    <header
      className={`navbar ${loaded ? "navbar--loaded" : ""} ${
        showNavbar ? "navbar--visible" : "navbar--hidden"
      }`}
    >
      <div className="navbar__container">
        <NavLink to="/" className="navbar__logo" onClick={handleLinkClick}>
          <img src={logo} alt="Testarena Innlandet logo" />
        </NavLink>

        <nav className={`navbar__links ${menuOpen ? "open" : ""}`}>
          {links.map(({ key, path }) => (
            <NavLink
              key={key}
              to={path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${key === "form" ? "cta-btn" : ""} ${
                  isActive ? "active-link" : ""
                }`
              }
            >
              {t(key)}
            </NavLink>
          ))}
          <div className="navbar__lang" onClick={toggleLanguage}>
            <span className={language === "EN" ? "active" : ""}>EN</span> |{" "}
            <span className={language === "NO" ? "active" : ""}>NO</span>
          </div>
        </nav>

        <button
          className={`navbar__toggle ${menuOpen ? "open" : ""}`}
          onClick={handleToggleMenu}
          aria-label="Toggle menu"
        >
          <span className="burger"></span>
          <span className="burger"></span>
          <span className="burger"></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
