import React from "react";
import Header from "../molecules/Header";
import FloatingTitle from "../molecules/Title";
import AboutMe from "../organisms/AboutSection";
import ProjectsSection from "../organisms/Proyects";
import ContactSection from "../organisms/ContactSection";
import Footer from "../organisms/Footer";

const HomeLayout: React.FC = () => {
    return (
        <div style={{ width: "100%", paddingTop: "70px" }}>
            <Header />

            <div id="about" style={{ width: "100%" }}>
                <FloatingTitle title="Sobre mí" />
                <AboutMe />
            </div>

            <div id="projects" style={{ width: "100%" }}>
                <FloatingTitle title="Proyectos" />
                <ProjectsSection />
            </div>

            <div id="contact" style={{ width: "100%" }}>
                <FloatingTitle title="Contáctame" />
                <ContactSection />
            </div>

            <Footer />
        </div>
    );
};

export default HomeLayout;
