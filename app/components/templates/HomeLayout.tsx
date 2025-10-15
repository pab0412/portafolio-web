import React from 'react'
import Header from '../molecules/Header'
import AboutMe from "~/components/organisms/AboutSection";

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
        </div>
    )
}

export default HomeLayout