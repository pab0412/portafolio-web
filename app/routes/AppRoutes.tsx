import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "../routes/home";
import AboutSection from "../components/organisms/AboutSection";
import ProjectsSection from "../components/organisms/Proyects";
import ContactSection from "../components/organisms/ContactSection";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/projects" element={<ProjectsSection />} />
                <Route path="/contact" element={<ContactSection />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
