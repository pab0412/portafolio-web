import React from "react";

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                width: "100%",
                backgroundColor: "#001529", // color tipo Ant Design
                color: "#fff",
                textAlign: "center",
                padding: "40px 20px",
                marginTop: "40px",
                position: "relative",
                bottom: 0,
            }}
        >
            <p style={{ margin: 0, fontSize: "16px" }}>
                © {new Date().getFullYear()} Pab0412 — Todos los derechos reservados
            </p>
            <p style={{ marginTop: "8px", fontSize: "14px", opacity: 0.8 }}>
                Desarrollado con React + TypeScript + Tailwind CSS
            </p>
        </footer>
    );
};

export default Footer;
