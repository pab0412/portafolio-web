// src/components/molecules/Header.tsx
import React, { useState } from "react";
import Logo from "../atoms/Logo";
import NavBarLinks from "../atoms/NavBarLinks";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                borderBottom: "1px solid #ddd",
                position: "fixed",
                width: "100%",
                top: 0,
                left: 0,
                backgroundColor: "black",
                zIndex: 100,
            }}
        >
            <Logo title="Bienvenido" />

            <div style={{ display: "flex", alignItems: "center", color: "black" }}>
                <NavBarLinks />
            </div>

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: "none", // luego se muestra con media query en móvil
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                {menuOpen ? "Cerrar" : "Menú"}
            </button>
        </header>
    );
};

export default Header;
