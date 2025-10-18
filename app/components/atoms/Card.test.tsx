import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CustomCard from "./Card";

describe("CustomCard", () => {
    it("debe renderizar el contenido pasado como children", () => {
        render(<CustomCard>Hola Mundo</CustomCard>);
        expect(screen.getByText("Hola Mundo")).toBeInTheDocument();
    });

    it("debe aplicar estilos por defecto", () => {
        render(<CustomCard>Test</CustomCard>);
        const card = screen.getByText("Test").parentElement as HTMLElement;

        expect(card).toHaveStyle({
            width: "80%",
            maxWidth: "800px",
            textAlign: "center",
            padding: "30px",
        });
        expect(card.style.animation).toContain("float");
    });

    it("debe permitir sobrescribir estilos y float", () => {
        render(
            <CustomCard width="500px" maxWidth="600px" float={false} style={{ backgroundColor: "red" }}>
                Test
            </CustomCard>
        );
        const card = screen.getByText("Test").parentElement as HTMLElement;

        expect(card).toHaveStyle({
            width: "500px",
            maxWidth: "600px",
            backgroundColor: "red",
            animation: "none",
        });
    });

    it("debe ejecutar onMouseEnter y onMouseLeave", () => {
        const handleEnter = vi.fn();
        const handleLeave = vi.fn();

        render(
            <CustomCard onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                Test
            </CustomCard>
        );

        const card = screen.getByText("Test").parentElement as HTMLElement;

        fireEvent.mouseEnter(card);
        expect(handleEnter).toHaveBeenCalled();

        fireEvent.mouseLeave(card);
        expect(handleLeave).toHaveBeenCalled();
    });
});
