// src/components/atoms/ProfileIcon.tsx
import React from "react";

interface ProfileIconProps {
    imageUrl: string; // Ruta o URL de la imagen
    size?: number; // Tamaño opcional
    alt?: string; // Texto alternativo
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
                                                     imageUrl,
                                                     size = 100,
                                                     alt = "Foto de perfil",
                                                 }) => {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #1890ff",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.borderColor = "#40a9ff";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "#1890ff";
            }}
        >
            <img
                src={imageUrl}
                alt={alt}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </div>
    );
};

export default ProfileIcon;
