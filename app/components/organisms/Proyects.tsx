import React from "react";
import ProjectCard from "../molecules/ProjectCard";

const projects = [
    {
        title: "Portafolio Web",
        description: "Mi portafolio personal desarrollado en React y TypeScript.",
        link: "https://github.com/pab0412/portafolio-web",
        tecnologies: ["React", "TypeScript", "HTML", "CSS"],
    },
    {
        title: "E-commerce",
        description: "Proyecto de tienda online con carrito y pagos simulados.",
        link: "#",
        tecnologies: ["React", "Node", "CSS", "HTML"],
    },
    {
        title: "Blog",
        description: "Blog de artículos tecnológicos con Markdown y React.",
        link: "#",
        tecnologies: ["React", "HTML", "CSS"],
    },
];

const ProjectsSection = () => {
    return (
        <section
            id="projects"
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                justifyItems: "space-between",
                padding: "40px 20px",
                gap: "20px", // separación entre cards
            }}
        >
            {projects.map((proj, index) => (
                <ProjectCard key={index} {...proj} />
            ))}
        </section>
    );
};

export default ProjectsSection;
