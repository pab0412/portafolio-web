import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NavBarLinks from "./NavBarLinks";

describe("NavBarLinks", () => {
    it("debe renderizar todos los items del menú", () => {
        render(<NavBarLinks />);
        expect(screen.getByText("Sobre mi")).toBeInTheDocument();
        expect(screen.getByText("Servicios")).toBeInTheDocument();
        expect(screen.getByText("Proyectos")).toBeInTheDocument();
        expect(screen.getByText("Contacto")).toBeInTheDocument();
    });

    it("debe llamar a onLinkClick al hacer click en un item", () => {
        const onLinkClick = vi.fn();
        render(<NavBarLinks onLinkClick={onLinkClick} />);

        const item = screen.getByText("Proyectos");
        fireEvent.click(item);

        expect(onLinkClick).toHaveBeenCalledTimes(1);
        expect(onLinkClick).toHaveBeenCalledWith("3");
    });

    it("debe aplicar los estilos correctos", () => {
        const { container } = render(<NavBarLinks />);
        const menu = container.querySelector(".ant-menu") as HTMLElement;

        expect(menu).toHaveStyle({
            backgroundColor: "transparent",
            fontWeight: "bold",
            borderBottom: "none",
        });
    });
});
