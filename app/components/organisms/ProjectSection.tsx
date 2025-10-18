import React, { useState } from "react";
import CustomCard from "../atoms/Card";
import { Button } from "antd";
import ProjectCard from "../molecules/ProjectCard";

const ProjectsSection: React.FC = () => {
    const allProjects = [
        { id: 1, name: "Portafolio Web", desc: "¿Interesado en ver mi experiencia?. Creado por mi (pab0412)", tecnologies: ["react", "typescript", 'css'], link:"https://github.com/pab0412/portafolio-web"},
        { id: 2, name: "LevelUp Gamer", desc: "Tienda Digital de perifericos gamer. Creado por Sebastian Pino", tecnologies: ["html", "css", "javascript"], link: "https://github.com/SebastianPinoB/Level-up-gamer"},
        { id: 3, name: "Cartalogo", desc: "Una tienda de cartas sueltas. Creado Por Sebastian Pino", tecnologies: ["spring"], link:"https://github.com/SebastianPinoB/ProyectoCartas"},
    ];

    const [visibleCount, setVisibleCount] = useState(3);

    const handleShowMore = () => setVisibleCount(prev => prev + 3);

    const [isHovered, setIsHovered] = useState(false);

    return (
        <CustomCard float={false} style={{
            textAlign: "center",
            padding: "60px",
            width: "100%",
            maxWidth: "1200px",
            boxSizing: "border-box",
            border: isHovered ? "2px solid #1890ff" : "white",

        }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
        >

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "30px",
                    width: "100%",
                    justifyItems: "center",
                    alignItems: "stretch",
                    color: "black",
                }}
            >
                {allProjects.slice(0, visibleCount).map(p => (
                    <ProjectCard
                        key={p.id}
                        title={p.name}
                        description={p.desc}
                        tecnologies={p.tecnologies}
                        link={p.link}
                        style={{ width: "100%", height:"100%", minHeight: "260px" }}
                    />
                ))}
            </div>

            {visibleCount < allProjects.length && (
                <Button
                    type="primary"
                    onClick={handleShowMore}
                    style={{ marginTop: "30px" }}
                >
                    Ver más
                </Button>
            )}
        </CustomCard>
    );
};

export default ProjectsSection;
