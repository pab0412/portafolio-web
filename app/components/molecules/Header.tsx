import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Logo from "../atoms/Logo";
import NavBarLinks from "../atoms/NavBarLinks";


const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = (id: string, path: string) => {
        if (location.pathname !== path) {
            navigate(path, { replace: true });
        } else {
            window.history.replaceState(null, "", path);
        }

        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

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
            <Logo title="¡Bienvenido!" />

            <div style={{ display: "flex", alignItems: "center", color: "black" }}>
                <NavBarLinks
                    onLinkClick={(key: string) => {
                        switch (key) {
                            case "1":
                                handleScroll("about", "/#about");
                                break;
                            case "2":
                                handleScroll("services", "/#services");
                                break;
                            case "3":
                                handleScroll("projects", "/#projects");
                                break;
                            case "4":
                                handleScroll("contact", "/#contact");
                                break;
                        }
                    }}
                />
            </div>



            <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: "none",
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
