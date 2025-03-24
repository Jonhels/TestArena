import React from "react";
import "./Footer.css";
import email from "../../icons/at-sign.svg";
import github from "../../icons/github.svg";
import linkedin from "../../icons/linkedin.svg";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerLinks">
                <p tabIndex={0}>© 2025 Jon Helge Skjærstein. All rights reserved.</p>
            </div>
            <div className="socialIcons">
                <div className="iconWithLabel">
                    <a href="https://github.com/Jonhels" target="_blank" rel="noopener noreferrer">
                        <img src={github} alt="GitHub" />
                    </a>
                    <span>GitHub</span>
                </div>
                <div className="iconWithLabel">
                    <a href="https://www.linkedin.com/in/jon-helge-skj%C3%A6rstein-a84107231/" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} alt="LinkedIn" />
                    </a>
                    <span>LinkedIn</span>
                </div>
                <div className="iconWithLabel">
                    <a href="mailto:jon.helge@skjaerstein.com">
                        <img src={email} alt="Email" />
                    </a>
                    <span>Email</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
