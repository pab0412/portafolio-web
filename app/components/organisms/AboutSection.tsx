import React from "react";
import CustomCard from "../atoms/Card";
import ProfileIcon from "../atoms/ProfileIcon";
import SkillsList from "../molecules/SkillsList";
import TypingText from "../atoms/TypingText";
import profile from "../../src/assets/images/profile.png";

const AboutSection: React.FC = () => {
    const aboutText =
        '¡Hola! Soy <strong>Pablo Sepúlveda</strong>, estudiante de DuocUC principiante en desarrollo web y programador principiante.';

    const text_programs = '<bold>Lenguajes de programación</bold>';

    return (
        <CustomCard
            style={{
                maxWidth: "1200px", // 🔥 ancho máximo mucho mayor
                width: "90%", // ocupa casi toda la pantalla
                margin: "0 auto", // centrado horizontal
                padding: "40px 50px", // espacio interior grande
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "60px", // más separación entre imagen y texto
                    flexWrap: "wrap",
                }}
            >
                {/* Imagen más grande a la izquierda */}
                <ProfileIcon imageUrl={profile} size={200} />

                {/* Texto y habilidades */}
                <div style={{ flex: 1, minWidth: "350px" }}>
                    <h2
                        style={{
                            fontWeight: "bold",
                            fontSize: "30px",
                            marginBottom: "15px",
                        }}
                    >
                        Apodo: pab0412
                    </h2>

                    <p
                        style={{
                            fontSize: "20px",
                            lineHeight: "1.7",
                            color: "#333",
                            marginBottom: "40px",
                            maxWidth: "750px", // 🔥 texto más ancho
                        }}
                    >
                        <TypingText text={aboutText} speed={50} />
                    </p>

                    <TypingText text={text_programs} />
                    <SkillsList />
                </div>
            </div>
        </CustomCard>
    );
};

export default AboutSection;
