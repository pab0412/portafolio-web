import React from "react";
import { Card } from "antd";

interface CustomCardProps {
    children: React.ReactNode;
    width?: string | number;
    maxWidth?: string | number;
    style?: React.CSSProperties;
    float?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const CustomCard: React.FC<CustomCardProps> = ({
                                                   children,
                                                   width = "80%",
                                                   maxWidth = "800px",
                                                   style = {},
                                                   float = true,
                                                   onMouseEnter,
                                                   onMouseLeave,
                                               }) => {
    return (
        <Card
            className="custom-dark "
            style={{
                width,
                maxWidth,
                margin: "40px auto",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                textAlign: "center",
                padding: "30px",
                animation: float ? "float 6s ease-in-out infinite" : "none",
                backgroundColor: "#1f2937",
                ...style,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </Card>
    );
};

export default CustomCard;
