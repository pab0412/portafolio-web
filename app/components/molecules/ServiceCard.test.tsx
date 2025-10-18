import { render, screen } from "@testing-library/react";
import ServiceCard from "../molecules/ServiceCard";
import { describe, it, expect } from "vitest";

describe("ServiceCard component", () => {
    it("renderiza el título y la descripción correctamente", () => {
        render(
            <ServiceCard
                title="Desarrollo Web"
                description="Creación de sitios web modernos y responsivos."
                icon="code"
            />
        );

        expect(screen.getByText("Desarrollo Web")).toBeInTheDocument();
        expect(
            screen.getByText("Creación de sitios web modernos y responsivos.")
        ).toBeInTheDocument();
    });

    it("muestra el ícono correcto según la prop", () => {
        render(
            <ServiceCard
                title="Proyectos"
                description="Gestión de proyectos ágiles y eficientes."
                icon="project"
            />
        );


        const icon = screen.getByRole("img", { hidden: true });
        expect(icon).toBeTruthy();
    });

    it("usa el ícono por defecto si no se pasa ninguno", () => {
        render(
            <ServiceCard
                title="Sin icono"
                description="Debe usar el icono por defecto (code)."
            />
        );


        expect(screen.getByText("Sin icono")).toBeInTheDocument();
    });
});
