import React from "react";
import Header from "../components/molecules/Header";
import AboutMe from "../components/organisms/AboutSection";
import ProjectsSection from "../components/organisms/Proyects";
import ContactSection from "../components/organisms/ContactSection";
import Footer from "../components/organisms/Footer";
import FloatingTitle from "../components/molecules/Title";

const Home = () => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", width: "100%" }}>
            <Header />

            <div id="about" style={{ width: "100%", paddingTop: "70px" }}>
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

export default Home;
