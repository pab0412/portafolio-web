import React, { useState } from "react";
import CustomCard from "../atoms/Card";

interface FloatingTitleProps {
    title: string;
    subtitle?: string;
    fontSize?: number;
    color?: string;
    hoverColor?: string;
}

const FloatingTitle: React.FC<FloatingTitleProps> = ({
                                                         title,
                                                         subtitle,
                                                         fontSize = 24,
                                                         color = "#1890ff",
                                                         hoverColor = "#40a9ff",
                                                     }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <CustomCard
            style={{
                padding: "20px 30px",
                maxWidth: "400px",
                backgroundColor: "#fff",
                animation: "none", // sin flotación
                border: `2px solid ${isHovered ? hoverColor : "transparent"}`,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                boxShadow: isHovered
                    ? "0 4px 10px rgba(0, 0, 0, 0.15)"
                    : "0 2px 5px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2
                style={{
                    fontSize: `${fontSize}px`,
                    color,
                    margin: 0,
                    fontWeight: "bold",
                }}
            >
                {title}
            </h2>

            {subtitle && (
                <p
                    style={{
                        marginTop: "5px",
                        color: "#555",
                        fontSize: `${fontSize * 0.5}px`,
                    }}
                >
                    {subtitle}
                </p>
            )}
        </CustomCard>
    );
};

export default FloatingTitle;
