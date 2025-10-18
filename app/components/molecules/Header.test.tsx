import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "../molecules/Header";

// Mock de React Router
vi.mock("react-router", () => ({
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: "/" }),
}));

describe("Header Component", () => {
    it("renderiza correctamente los links y logo", () => {
        render(<Header />);

        // Logo
        expect(screen.getByText(/¡Bienvenido!/i)).toBeInTheDocument();

        // Links
        expect(screen.getByText(/about/i)).toBeInTheDocument();
        expect(screen.getByText(/services/i)).toBeInTheDocument();
        expect(screen.getByText(/projects/i)).toBeInTheDocument();
        expect(screen.getByText(/contacto/i)).toBeInTheDocument();
    });

    it("cambia menú cuando se hace click en botón", () => {
        render(<Header />);
        const button = screen.getByRole("button", { hidden: true });
        expect(button).toHaveTextContent(/Menú/i);

        fireEvent.click(button);
        expect(button).toHaveTextContent(/Cerrar/i);
    });
});
