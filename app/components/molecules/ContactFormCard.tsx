import React, { useState } from "react";
import CustomCard from "../atoms/Card";
import { Input, Button } from "antd";
import TypingText from "~/components/atoms/TypingText";

const { TextArea } = Input;

interface ContactFormCardProps {
    onSubmit?: (data: { name: string; email: string; message: string }) => void;
}

const ContactFormCard: React.FC<ContactFormCardProps> = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const [errors, setErrors] = useState({ name: "", email: "", msg: "" });

    const validate = () => {
        const newErrors = { name: "", email: "", msg: "" };
        if (name.trim().length < 2) newErrors.name = "El nombre debe tener al menos 2 caracteres";
        if (!email.includes("@")) newErrors.email = "Introduce un email válido";
        if (msg.trim().length < 5) newErrors.msg = "El mensaje debe tener al menos 5 caracteres";
        setErrors(newErrors);
        return !newErrors.name && !newErrors.email && !newErrors.msg;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        if (onSubmit) onSubmit({ name, email, message: msg });

        setName("");
        setEmail("");
        setMsg("");
        setErrors({ name: "", email: "", msg: "" });
    };

    const renderError = (error: string) => (
        <p style={{ color: "red", marginBottom: "15px", minHeight: "20px" }}>{error}</p>
    );

    return (
        <CustomCard
            style={{
                width: "100%",
                maxWidth: "1000px",
                margin: "20px auto",
                padding: "40px",
            }}
        >
            <TypingText style={{ fontSize: "40px", marginBottom: "60px", textAlign: "center" }} text={"Contacto"} />

            <Input
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: "5px", height: "55px", fontSize: "18px" }}
            />
            {renderError(errors.name)}

            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: "5px", height: "55px", fontSize: "18px" }}
            />
            {renderError(errors.email)}

            <TextArea
                placeholder="Mensaje"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={6}
                style={{ marginBottom: "5px", fontSize: "18px" }}
            />
            {renderError(errors.msg)}

            <Button
                type="primary"
                block
                onClick={handleSubmit}
                style={{ height: "55px", fontSize: "18px", marginTop: "10px" }}
            >
                Enviar
            </Button>
        </CustomCard>
    );
};

export default ContactFormCard;
