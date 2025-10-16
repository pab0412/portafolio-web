import React from 'react'
import Header from '../molecules/Header'
import FloatingTitle from '../molecules/Title'
import AboutMe from "../organisms/AboutSection";
import ProjectsSection from "~/components/organisms/Proyects";
import ContactSection from "~/components/organisms/ContactSection";
import Footer from "~/components/organisms/Footer";

const HomeLayout = () => {
    return(
        <div       style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "100px", // separa el header del contenido
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5", // opcional: fondo general
        }}>
            <Header/>
            <AboutMe/>
            <FloatingTitle title={'Proyectos'}/>
            <ProjectsSection />
            <FloatingTitle title={"Contactame"} />
            <ContactSection />
            <Footer />
        </div>
    )
}

export default HomeLayout