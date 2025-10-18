import React, { useState } from "react";
import CustomCard from "../atoms/Card";
import { Button } from "antd";
import ServiceCard from "../molecules/ServiceCard";

const ServicesSection: React.FC = () => {
    const allServices = [
        {
            id: 1,
            title: "Gestión de Proyectos",
            desc: "Planificación, coordinación y supervisión de proyectos de software desde la idea hasta la entrega final.",
            icon: "project",
        },
        {
            id: 2,
            title: "Desarrollo Web",
            desc: "Creación de sitios y aplicaciones web modernas con React, TypeScript y Node.js.",
            icon: "react",
        },
        {
            id: 3,
            title: "Diseño de APIs y Backend",
            desc: "Arquitectura y desarrollo de servicios escalables con bases de datos relacionales y no relacionales.",
            icon: "database",
        },
        {
            id: 4,
            title: "Despliegue en la Nube",
            desc: "Configuración, despliegue y mantenimiento de aplicaciones en AWS, Vercel o Render.",
            icon: "cloud",
        },
    ];

    const [visibleCount, setVisibleCount] = useState(3);
    const handleShowMore = () => setVisibleCount(prev => prev + 3);

    const [isHovered, setIsHovered] = useState(false);

    return (
        <CustomCard
            float={false}
            style={{
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
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    width: "100%",
                    justifyItems: "center",
                    color: "black",
                }}
            >
                {allServices.slice(0, visibleCount).map(service => (
                    <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.desc}
                        icon={service.icon}
                    />
                ))}
            </div>

            {visibleCount < allServices.length && (
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

export default ServicesSection;
