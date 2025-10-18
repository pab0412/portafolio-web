import React from "react";
import CustomCard from "../atoms/Card";
import {
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNodedotjs,
    SiHtml5,
    SiCss3, SiSpring,
} from "react-icons/si";

interface ProjectCardProps {
    title: string;
    description: string;
    link?: string;
    tecnologies: string[];
}


const iconMap: Record<string, React.ReactElement> = {
    javascript: <SiJavascript size={24} />,
    typescript: <SiTypescript size={24} />,
    spring: <SiSpring size={24} />,
    react: <SiReact size={24} />,
    node: <SiNodedotjs size={24} />,
    html: <SiHtml5 size={24} />,
    css: <SiCss3 size={24} />,
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link, tecnologies }) => {
    return (
        <CustomCard
            style={{
                maxWidth: "400px",
                margin: "20px",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h3 style={{ marginBottom: "10px" }}>{title}</h3>
            <p style={{ marginBottom: "10px" }}>{description}</p>

            <div style={{ display: "flex", gap: "8px", marginTop:"2px" ,marginBottom: "10px", justifyContent: "center", alignItems: "center" }}>
                {tecnologies.map((tech, idx) => {
                    const Icon = iconMap[tech.toLowerCase()];
                    return (
                        <span key={idx} title={tech}>
              {Icon || tech}
            </span>
                    );
                })}
            </div>

            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ver proyecto
                </a>
            )}
        </CustomCard>
    );
};

export default ProjectCard;
