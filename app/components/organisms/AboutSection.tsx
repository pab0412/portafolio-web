// src/components/organisms/AboutSection.tsx
import React from "react";
import CustomCard from "../atoms/Card";
import ProfileIcon from "../atoms/ProfileIcon";
import SkillsList from "../molecules/SkillsList";

const AboutSection: React.FC = () => {
    return (
        <CustomCard>
            {/* 📸 Foto de perfil centrada */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <ProfileIcon imageUrl="/assets/profile.jpg" size={120} />
            </div>

            <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>Sobre mí</h2>

            <p style={{ fontSize: "16px", color: "#555", marginBottom: "30px" }}>
                ¡Hola! Soy <strong>Pablo Sepúlveda</strong>, desarrollador web apasionado
                por crear interfaces limpias y funcionales. Me encanta trabajar con
                tecnologías modernas como React, Node.js y Java para construir soluciones
                eficientes y atractivas.
            </p>

            <SkillsList />
        </CustomCard>
    );
};

export default AboutSection;
