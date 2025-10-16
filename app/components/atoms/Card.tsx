import React from "react";
import { Card } from "antd";

interface CustomCardProps {
    children: React.ReactNode;
    width?: string | number;
    maxWidth?: string | number;
    style?: React.CSSProperties;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>; // ✅ nuevo
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>; // ✅ nuevo
}

const CustomCard: React.FC<CustomCardProps> = ({
                                                   children,
                                                   width = "80%",
                                                   maxWidth = "800px",
                                                   style = {},
                                                   onMouseEnter,
                                                   onMouseLeave,
                                               }) => {
    return (
        <Card
            style={{
                width,
                maxWidth,
                margin: "40px auto",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                textAlign: "center",
                padding: "30px",
                animation: "float 6s ease-in-out infinite",
                ...style,
            }}
            onMouseEnter={onMouseEnter} // ✅ pasa los eventos
            onMouseLeave={onMouseLeave} // ✅ pasa los eventos
        >
            {children}
        </Card>
    );
};

export default CustomCard;
