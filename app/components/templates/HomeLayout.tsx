import React from "react";
import Header from "../molecules/Header";
import FloatingTitle from "../molecules/FloatingTitle";
import AboutMe from "../organisms/AboutSection";
import ProjectsSection from "../organisms/ProjectSection";
import ContactSection from "../organisms/ContactSection";
import ServicesSection from "~/components/organisms/ServiceSection";
import Footer from "../organisms/Footer";


const HomeLayout: React.FC = () => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", width: "100%" }}>
            <Header />

            <div id="about" style={{ width: "100%", paddingTop: "70px" }}>
                <FloatingTitle title="Sobre mí" />
                <AboutMe />
            </div>

            <div id="services" style={{width:'100%'}}>
                <FloatingTitle title="Servicios" />
                <ServicesSection />
            </div>

            <div id="projects" style={{ width: "100%" }}>
                <FloatingTitle title="Proyectos" subtitle={"Proyectos creados por mi o donde contribuí"} />
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
