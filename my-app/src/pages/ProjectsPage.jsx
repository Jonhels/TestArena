import React, { useState } from "react";
import "./styles/ProjectsPage.css";

const projects = [
    {
        id: 1,
        title: "Discord music bot",
        description:
            "Borkday is a simple dockerized discord.js bot that can be used to play youtube songs in your discord server. It is based on the discord.js library and uses the ytdl-core library to play youtube songs.",
        image: "https://appmaster.io/cdn-cgi/image/width=768,quality=83,format=auto/api/_files/KQtkEi6WmzvGz7ACPAghma/download/",
        icon: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDb6rYcBtJvTvH3UoAS4JFNDaxGhmKNaMwgElLURlRFeVkLCjkfnXmWtINWZIrPGYq0-&format=source",
        github: "https://github.com/Jonhels/borkday",
        live: "https://discord.com/oauth2/authorize?client_id=1250200963260616725&permissions=580552880080960&integration_type=0&scope=bot",
    },
    {
        id: 2,
        title: "Portfolio Website",
        description:
            "A modern and responsive portfolio website built with React and a Node.js backend. Features authentication, dynamic content, and a sleek design to showcase projects and skills.",
        image: "https://www.uptimeconsulting.no/wp-content/uploads/2021/12/60e5534ab13a1.png",
        github: "https://github.com/Jonhels/HelgeHub",
        icon: "https://codeopinion.com/wp-content/uploads/2017/04/Link-symbol-150x150.png",
        live: "https://skjaerstein.com/",
    },
    {
        id: 3,
        title: "API.skjaerstein.com",
        description:
            "A custom-built API providing structured and secure access to various data endpoints. Developed using Node.js and Express, ensuring scalability and performance for personal and professional projects.",
        image: "https://miro.medium.com/v2/resize:fit:766/1*uPL1uCtLBRSk6akPL2hNzg.jpeg",
        github: "https://github.com/Jonhels/helgehubapi",
        icon: "https://codeopinion.com/wp-content/uploads/2017/04/Link-symbol-150x150.png",
        live: "https://api.skjaerstein.com/",
    },
];

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(projects[0]);

    return (
        <div className="project-container">
            <h1 className="project-heading">Projects</h1>
            <div className="project-images-wrapper">
                {projects.map((project) => (
                    <img
                        key={project.id}
                        className="project-image"
                        src={project.image}
                        alt={project.title}
                        onClick={() => setSelectedProject(project)}
                        style={{
                            cursor: "pointer",
                            border: selectedProject.id === project.id ? "2px solid gray" : "none",
                        }}
                    />
                ))}
            </div>
            <div className="project-description">
                <div className="project-description-text">
                    <h2 className="project-title">{selectedProject.title}</h2>
                    <p>{selectedProject.description}</p>
                </div>
                <div className="project-description-links">
                    <ul>
                        <li>
                            <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="project-icon"
                                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                    alt="GitHub"
                                />
                                Project on Github
                            </a>
                        </li>
                        <li>
                            <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="project-icon"
                                    src={selectedProject.icon}
                                    alt="Live Project"
                                />
                                Open Project
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
