import React, { useState } from "react";
import { SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiHtml5, SiCss3, SiSpring, SiPython} from "react-icons/si";

interface Skill {
    name: string;
    icon: React.ReactNode;
}

const skills: Skill[] = [
    { name: "Python", icon: <SiPython color="#FFFF" />},
    { name: "Spring Java", icon: <SiSpring color="#FFFF" />},
    { name: "JavaScript", icon: <SiJavascript color="#FFFF" /> },
    { name: "TypeScript", icon: <SiTypescript color="#FFFF" /> },
    { name: "React", icon: <SiReact color="#FFFF" /> },
    { name: "Node.js", icon: <SiNodedotjs color="#FFFF" /> },
    { name: "HTML5", icon: <SiHtml5 color="#FFFF" /> },
    { name: "CSS3", icon: <SiCss3 color="#FFFF" /> },
];

const SkillsList: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                marginTop: "20px",
            }}
        >
            {skills.map((skill, index) => (
                <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                        position: "relative",
                        transition: "transform 0.2s", // transición suave
                        transform: hoveredIndex === index ? "scale(1.2)" : "scale(1)", // zoom al hacer hover
                    }}
                >
                    <div style={{ fontSize: "40px" }}>{skill.icon}</div>

                    {/* Tooltip */}
                    {hoveredIndex === index && (
                        <div
                            style={{
                                position: "absolute",
                                top: "50px",
                                background: "#333",
                                color: "#fff",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {skill.name}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SkillsList;
