import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import "./Header.css";
import Jacke from "../../icons/Jacke.svg";

// Utility to generate random values
const randomValue = (min, max) => Math.random() * (max - min) + min;

const Particle = ({ headerWidth, headerHeight }) => {
    const size = randomValue(5, 15); // Random size
    const isLogo = Math.random() < 0.05; // 5% chance of being a logo particle

    return  isLogo ?(
        <motion.img
        src={Jacke}
        alt="Logo Particle"
        className="particle"
        style={{
            width: size * 3, // Slightly larger for visibility
            height: size * 3,
            borderRadius: "50%",
        }}
        initial={{
            x: randomValue(0, headerWidth), // Initial x position spans the width
            y: randomValue(0, headerHeight), // Initial y position spans the height
            opacity: 0,
        }}
        animate={{
            x: randomValue(-headerWidth, headerWidth), // Move particles randomly in width
            y: randomValue(-headerHeight, headerHeight), // Move particles randomly in height
            opacity: [0, 1, 0], // Fade in and out
        }}
        transition={{
            duration: randomValue(25, 30), // Random animation duration
            repeat: Infinity, // Infinite loop
            ease: "easeInOut",
        }}
    /> ) : (
        <motion.div
            className="particle"
            style={{
                width: size,
                height: size,
                backgroundColor: `rgba(${randomValue(200, 255)}, ${randomValue(200, 255)}, ${randomValue(200, 255)}, 0.8)`,
                borderRadius: "50%",
            }}
            initial={{
                x: randomValue(0, headerWidth), // Initial x position spans the width
                y: randomValue(0, headerHeight), // Initial y position spans the height
                opacity: 0,
            }}
            animate={{
                x: randomValue(-headerWidth, headerWidth), // Move particles randomly in width
                y: randomValue(-headerHeight, headerHeight), // Move particles randomly in height
                opacity: [0, 1, 0], // Fade in and out
            }}
    
                transition={{
                    duration: 25, // Random animation duration
                    repeat: Infinity, // Infinite loop
                    ease: "linear",
                    
                }}
        />
    );
};

const Header = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [particleKey, setParticleKey] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            setParticleKey((prevKey) => prevKey + 1)
        };

        window.addEventListener("resize", handleResize);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div className="header">
            <div className="headerParticles" key={particleKey}>
                {Array.from({ length: 100 }).map((_, index) => (
                    <Particle key={index} headerWidth={dimensions.width} headerHeight={dimensions.height} />
                ))}
            </div>
            <div className="headerInformation">
                <h1 tabIndex={0} className="headerInformation__title">Jon Helge Skjærstein</h1>
                <p tabIndex={0} className="headerInformation__subtitle">
                    Certified Computer Electronics Specialist | Bachelor's in Web Development | Full-Stack Web Developer
                </p>
            </div>
            <div className="headerContactWrapper">
                <div className="headerContact">
                    <p tabIndex={0} className="headerContact__text">
                        Creating innovative, user-friendly web experiences through clean design and efficient code
                    </p>
                    <a className="headerContact__link" href="mailto:jon.helge@skjaerstein.com">
                        Contact me
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
