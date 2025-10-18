import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ContactFormCard from "../molecules/ContactFormCard";

describe("ContactFormCard", () => {
    it("renderiza todos los campos y el botón", () => {
        render(<ContactFormCard />);

        expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Mensaje/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Enviar/i })).toBeInTheDocument();
    });

    it("muestra errores si los campos son inválidos", () => {
        render(<ContactFormCard />);
        const button = screen.getByRole("button", { name: /Enviar/i });

        fireEvent.click(button);

        expect(screen.getByText(/El nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
        expect(screen.getByText(/Introduce un email válido/i)).toBeInTheDocument();
        expect(screen.getByText(/El mensaje debe tener al menos 5 caracteres/i)).toBeInTheDocument();
    });

    it("llama a onSubmit con datos válidos y limpia los campos", () => {
        const onSubmit = vi.fn();
        render(<ContactFormCard onSubmit={onSubmit} />);

        fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: "Juan" } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: "juan@mail.com" } });
        fireEvent.change(screen.getByPlaceholderText(/Mensaje/i), { target: { value: "Hola mundo" } });

        fireEvent.click(screen.getByRole("button", { name: /Enviar/i }));

        expect(onSubmit).toHaveBeenCalledWith({
            name: "Juan",
            email: "juan@mail.com",
            message: "Hola mundo"
        });

        // Campos vacíos después de enviar
        expect(screen.getByPlaceholderText(/Nombre/i)).toHaveValue("");
        expect(screen.getByPlaceholderText(/Email/i)).toHaveValue("");
        expect(screen.getByPlaceholderText(/Mensaje/i)).toHaveValue("");
    });
});
