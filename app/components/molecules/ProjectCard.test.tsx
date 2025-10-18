import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectCard from "../molecules/ProjectCard";

describe("ProjectCard Component", () => {
    const baseProps = {
        title: "Portafolio Web",
        description: "Un sitio personal creado con React y TypeScript.",
        tecnologies: ["React", "TypeScript", "CSS"],
        link: "https://github.com/pab0412/portafolio-web",
    };

    it("renderiza el título correctamente", () => {
        render(<ProjectCard {...baseProps} />);
        expect(screen.getByText("Portafolio Web")).toBeInTheDocument();
    });

    it("muestra la descripción del proyecto", () => {
        render(<ProjectCard {...baseProps} />);
        expect(
            screen.getByText(/Un sitio personal creado con React y TypeScript/i)
        ).toBeInTheDocument();
    });

    it("renderiza los íconos de tecnologías", () => {
        render(<ProjectCard {...baseProps} />);

        // Verifica que se rendericen los íconos o sus tooltips
        expect(screen.getByTitle("React")).toBeInTheDocument();
        expect(screen.getByTitle("TypeScript")).toBeInTheDocument();
        expect(screen.getByTitle("CSS")).toBeInTheDocument();
    });

    it("muestra el enlace 'Ver proyecto' si existe link", () => {
        render(<ProjectCard {...baseProps} />);
        const linkElement = screen.getByText(/ver proyecto/i);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", baseProps.link);
    });

    it("no muestra el enlace si no se pasa prop link", () => {
        render(<ProjectCard {...baseProps} link={undefined} />);
        expect(screen.queryByText(/ver proyecto/i)).not.toBeInTheDocument();
    });
});
