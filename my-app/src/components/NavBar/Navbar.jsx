import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import navbarTranslations from "./navbarTranslations";
import "./Navbar.css";
import logo from "../../assets/images/logo.svg";

function Navbar() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [glow, setGlow] = useState(false);
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
      setTimeout(() => {
        setCurrentLang(language);
      }, 300);
    }
  }, [language, currentLang]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false); // Scroller ned
      } else {
        setShowNavbar(true); // Scroller opp
      }

      setLastScrollY(currentScrollY);

      if (currentScrollY > 0) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && menuOpen) {
        handleCloseMenu();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const handleToggleMenu = () => {
    if (menuOpen) {
      handleCloseMenu();
    } else {
      setMenuOpen(true);
    }
  };

  const handleCloseMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 400);
  };

  const handleLinkClick = () => {
    if (menuOpen) {
      handleCloseMenu();
    }
  };

  const handleLanguageClick = () => {
    toggleLanguage();
    setGlow(true);
    setTimeout(() => {
      setGlow(false);
    }, 400);
  };

  const links = [
    { key: "home", path: "/" },
    { key: "services", path: "/tjenester" },
    { key: "about", path: "/om-oss" },
    { key: "contact", path: "/kontakt" },
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

        {menuOpen && (
          <div
            className={`navbar__overlay ${menuOpen ? "active" : ""}`}
            onClick={handleCloseMenu}
          ></div>
        )}

        <nav
          className={`navbar__links ${menuOpen ? "open" : ""} ${
            closing ? "closing" : ""
          }`}
        >
          {links.map(({ key, path }) => (
            <NavLink
              key={key}
              to={path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${isActive ? "active-link" : ""} ${
                  key === "form" ? "cta-btn" : ""
                }`
              }
            >
              <span className="fade-text">{t(key)}</span>
            </NavLink>
          ))}

          <div
            className="navbar__lang"
            onClick={handleLanguageClick}
            style={{ cursor: "pointer" }}
          >
            <span
              className={`lang-option ${language === "EN" ? "active" : ""} ${
                glow ? "glow" : ""
              }`}
            >
              EN
            </span>{" "}
            |{" "}
            <span
              className={`lang-option ${language === "NO" ? "active" : ""} ${
                glow ? "glow" : ""
              }`}
            >
              NO
            </span>
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
