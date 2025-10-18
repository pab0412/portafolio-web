import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "../routes/home";
import AboutSection from "../components/organisms/AboutSection";
import ServicesSection from "~/components/organisms/ServiceSection";
import ProjectsSection from "../components/organisms/ProjectSection";
import ContactSection from "../components/organisms/ContactSection";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/services" element={<ServicesSection />} />
                <Route path="/projects" element={<ProjectsSection />} />
                <Route path="/contact" element={<ContactSection />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
