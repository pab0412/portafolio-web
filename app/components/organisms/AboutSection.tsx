import React from "react";
import CustomCard from "../atoms/Card";
import ProfileIcon from "../atoms/ProfileIcon";
import SkillsList from "../molecules/SkillsList";

const AboutSection: React.FC = () => {
    return (
        <CustomCard>
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
                ¡Hola! Soy <strong>Pablo Sepúlveda</strong>, estudiante de DuocUC principiante en desarrollo web y programador
                principiante.
            </p>

            <SkillsList />
        </CustomCard>
    );
};

export default AboutSection;
