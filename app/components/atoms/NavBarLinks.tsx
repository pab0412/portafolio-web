// src/components/atoms/NavBarLinks.tsx
import React from "react";
import { Menu } from "antd";

interface NavBarLinksProps {
    onLinkClick?: (key: string) => void; // ✅ prop opcional
}

const NavBarLinks: React.FC<NavBarLinksProps> = ({ onLinkClick }) => {
    return (
        <Menu
            mode="horizontal"
            items={[
                { key: "1", label: "Sobre mi" },
                { key: "2", label: "Proyectos" },
                { key: "3", label: "Contacto" },
            ]}
            onClick={(info) => {
                if (onLinkClick) onLinkClick(info.key);
            }}
        />
    );
};

export default NavBarLinks;
