import React from "react";
import ContactFormCard from "../molecules/ContactFormCard";

const ContactSection = () => {
    const handleSubmit = (data: { name: string; email: string; message: string }) => {
        console.log("Mensaje enviado:", data);
    };

    return (
        <section id="contact" style={{ display: "flex", justifyContent: "center", padding: "60px 20px" }}>
            <ContactFormCard onSubmit={handleSubmit} />
        </section>
    );
};

export default ContactSection;
