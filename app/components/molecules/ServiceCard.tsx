import React from "react";
import CustomCard from "../atoms/Card";
import { FaCode, FaProjectDiagram, FaDatabase, FaReact, FaCloud } from "react-icons/fa";

interface ServiceCardProps {
    title: string;
    description: string;
    icon?: string;
    style?: React.CSSProperties;
}

const iconMap: Record<string, React.ReactElement> = {
    code: <FaCode size={28} color="#1890ff" />,
    project: <FaProjectDiagram size={28} color="#1890ff" />,
    database: <FaDatabase size={28} color="#1890ff" />,
    react: <FaReact size={28} color="#1890ff" />,
    cloud: <FaCloud size={28} color="#1890ff" />,
};

const ServiceCard: React.FC<ServiceCardProps> = ({
                                                     title,
                                                     description,
                                                     icon = "code",
                                                     style,
                                                 }) => {
    return (
        <CustomCard
            float={true}
            style={{
                maxWidth: "350px",
                minHeight: "240px",
                margin: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                textAlign: "left",
                padding: "20px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                ...style,
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "12px",
                }}
            >
                {iconMap[icon.toLowerCase()] || iconMap.code}
            </div>

            <h3
                style={{
                    fontWeight: "bold",
                    color: "#1890ff",
                    marginBottom: "10px",
                    fontSize: "1.3rem",
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    color: "#333",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                }}
            >
                {description}
            </p>
        </CustomCard>
    );
};

export default ServiceCard;
