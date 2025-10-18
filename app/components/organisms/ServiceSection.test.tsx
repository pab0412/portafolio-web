import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServicesSection from "../organisms/ServiceSection";

// Mock de CustomCard (para evitar estilos o dependencias innecesarias)
vi.mock("../atoms/Card", () => ({
    default: ({ children, ...props }: any) => (
        <div data-testid="custom-card" {...props}>
            {children}
        </div>
    ),
}));

// Mock de antd Button
vi.mock("antd", () => ({
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    ),
}));

// Mock de ServiceCard
vi.mock("../molecules/ServiceCard", () => ({
    default: ({ title, description }: any) => (
        <div data-testid="service-card">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    ),
}));

describe("ServicesSection component", () => {
    it("renderiza el título principal correctamente", () => {
        render(<ServicesSection />);
        expect(screen.getByText("Servicios")).toBeInTheDocument();
    });

    it("muestra inicialmente 3 servicios", () => {
        render(<ServicesSection />);
        const serviceCards = screen.getAllByTestId("service-card");
        expect(serviceCards).toHaveLength(3);
    });

    it("muestra más servicios al presionar 'Ver más'", () => {
        render(<ServicesSection />);
        const button = screen.getByRole("button", { name: /ver más/i });
        fireEvent.click(button);
        const serviceCards = screen.getAllByTestId("service-card");
        expect(serviceCards.length).toBeGreaterThan(3);
    });

    it("oculta el botón cuando se muestran todos los servicios", () => {
        render(<ServicesSection />);
        const button = screen.getByRole("button", { name: /ver más/i });
        // Hacer click dos veces (4 servicios, de 3 en 3)
        fireEvent.click(button);
        fireEvent.click(button);
        expect(screen.queryByRole("button", { name: /ver más/i })).toBeNull();
    });

    it("cambia el borde al hacer hover sobre el contenedor principal", () => {
        render(<ServicesSection />);
        const card = screen.getByTestId("custom-card");

        expect(card).toHaveStyle("border: white");
        fireEvent.mouseEnter(card);
        expect(card).toHaveStyle("border: 2px solid #1890ff");
        fireEvent.mouseLeave(card);
        expect(card).toHaveStyle("border: white");
    });
});
