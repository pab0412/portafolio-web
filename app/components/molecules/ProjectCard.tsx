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
import ProjectsSection from "~/components/organisms/ProjectSection";

interface ProjectCardProps {
    title: string;
    description: string;
    link?: string;
    tecnologies: string[];
    style?: React.CSSProperties;
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

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link, tecnologies, style }) => {
    return (
        <CustomCard
            style={{
                maxWidth: "400px",
                minHeight: "280px", //
                margin: "20px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ...style, //
            }}
        >
            <div>
                <h3 style={{ marginBottom: "10px", fontWeight:"bold", fontSize:"1.5rem", paddingBottom:"10px", color:"#1885F0"}}>{title}</h3>
                <p style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 4, //
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    wordBreak: "break-word",
                    marginBottom: "20px",
                }}>
                    {description}
                </p>
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop:"2px", marginBottom: "50px", justifyContent: "center", alignItems: "center" }}>
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
                    style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                    }}
                >
                    Ver proyecto
                </a>
            )}
        </CustomCard>
    );
};

export default ProjectCard;