import React from "react";
import SocialIcon from "../atoms/SocialsIcon";
import {FaGithub, FaLinkedin, FaTwitter, FaWhatsapp} from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                width: "100%",
                backgroundColor: "#001529",
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



            <div style={{ marginTop: "20px" }}>
                <SocialIcon
                    icon={FaGithub}
                    link="https://github.com/pab0412"
                    color="#fff"
                    hoverColor="#6cc644"
                    size={28}
                />
                <SocialIcon
                    icon={FaLinkedin}
                    link="https://linkedin.com/in/pab0412"
                    color="#fff"
                    hoverColor="#0077b5"
                    size={28}
                />
                <SocialIcon
                    icon={FaWhatsapp}
                    link="#"
                    color="#fff"
                    hoverColor="#6cc644"
                    size={28}
                />
            </div>

        </footer>
    );
};

export default Footer;
