import React from "react";
import { Card } from "antd";

interface CustomCardProps {
    children: React.ReactNode;
    width?: string | number;
    maxWidth?: string | number;
    style?: React.CSSProperties;
    float?: boolean;       // activar/desactivar animación flotante
    marginTop?: number;    // margen superior personalizado
}

const CustomCard: React.FC<CustomCardProps> = ({
                                                   children,
                                                   width = "80%",
                                                   maxWidth = "800px",
                                                   style = {},
                                                   float = true,          // por defecto flota
                                                   marginTop = 40,        // margen superior por defecto
                                               }) => {
    return (
        <Card
            style={{
                width,
                maxWidth,
                margin: `${marginTop}px auto`,
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                textAlign: "center",
                padding: "30px",
                animation: float ? "float 6s ease-in-out infinite" : undefined,
                ...style,
            }}
        >
            {children}
        </Card>
    );
};

export default CustomCard;
