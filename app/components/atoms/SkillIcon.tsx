import React from "react";

interface SkillIconProps {
    name: string;
    icon: React.ReactNode; // puedes pasar un SVG, imagen o emoji
}

const SkillIcon: React.FC<SkillIconProps> = ({ name, icon }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                cursor: "default",
            }}
        >
            <div style={{ fontSize: "40px" }}>{icon}</div>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>{name}</span>
        </div>
    );
};

export default SkillIcon;
