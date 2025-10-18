import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FloatingTitle from "../molecules/FloatingTitle";

// Mock de CustomCard (para simplificar)
vi.mock("../atoms/Card", () => ({
    default: ({ children, ...props }: any) => (
        <div data-testid="custom-card" {...props}>
            {children}
        </div>
    ),
}));

describe("FloatingTitle component", () => {
    it("renderiza el título correctamente", () => {
        render(<FloatingTitle title="Servicios" />);
        expect(screen.getByText("Servicios")).toBeInTheDocument();
    });

    it("renderiza el subtítulo cuando se pasa como prop", () => {
        render(<FloatingTitle title="Proyectos" subtitle="Gestión y desarrollo" />);
        expect(screen.getByText("Gestión y desarrollo")).toBeInTheDocument();
    });

    it("no muestra subtítulo si no se pasa", () => {
        render(<FloatingTitle title="Sin subtítulo" />);
        expect(screen.queryByText(/Gestión y desarrollo/i)).toBeNull();
    });

    it("cambia el borde al hacer hover", () => {
        render(<FloatingTitle title="Hover Test" />);
        const card = screen.getByTestId("custom-card");

        expect(card).toHaveStyle("border: 2px solid transparent");
        fireEvent.mouseEnter(card);
        expect(card).toHaveStyle("border: 2px solid #1890ff");
        fireEvent.mouseLeave(card);
        expect(card).toHaveStyle("border: 2px solid transparent");
    });
});
