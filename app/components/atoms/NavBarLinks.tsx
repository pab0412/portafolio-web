import React from "react";
import { Menu } from "antd";

interface NavBarLinksProps {
    onLinkClick?: (key: string) => void;
}

const NavBarLinks: React.FC<NavBarLinksProps> = ({ onLinkClick }) => {
    return (
        <Menu
            mode="horizontal"
            selectedKeys={[]} // 👈 esto evita que quede seleccionado
            items={[
                { key: "1", label: "Sobre mi" },
                { key: "2", label: "Proyectos" },
                { key: "3", label: "Contacto" },
            ]}
            onClick={(info) => {
                if (onLinkClick) onLinkClick(info.key);
            }}
            style={{
                backgroundColor: "transparent",
                color: "white",
                borderBottom: "none",
                fontWeight: "bold",
            }}
        />
    );
};

export default NavBarLinks;
