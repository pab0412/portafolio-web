import React, { useState } from "react";
import CustomCard from "../atoms/Card";

interface FloatingTitleProps {
    title: string;
    subtitle?: string;
}

const FloatingTitle: React.FC<FloatingTitleProps> = ({ title, subtitle }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <CustomCard
            style={{
                margin: "50px auto",
                maxWidth: "400px",
                border: isHovered ? "2px solid #1890ff" : "2px solid transparent",
                transition: "border 0.3s ease",
                padding: "20px 30px",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 style={{ fontSize: "24px", color: "#1890ff", margin: 0, fontWeight: "bold" }}>
                {title}
            </h2>
            {subtitle && (
                <p style={{ marginTop: "5px", color: "#555", fontSize: "14px" }}>
                    {subtitle}
                </p>
            )}
        </CustomCard>
    );
};

export default FloatingTitle;
