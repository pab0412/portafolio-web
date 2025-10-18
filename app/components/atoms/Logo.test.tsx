import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Logo from "./Logo";

describe("Logo", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("debe renderizar el ícono del logo", () => {
        render(<Logo />);
        const icon = screen.getByRole("img", { name: /logo/i });
        expect(icon).toBeInTheDocument();
    });

    it("debe renderizar texto conforme avanza el tiempo", () => {
        const title = "PABO.dev";
        render(<Logo title={title} speed={100} pause={500} />);

        // Inicialmente no muestra texto
        expect(screen.getByText("")).toBeInTheDocument();

        // Avanzar un tick de 100ms
        vi.advanceTimersByTime(100);
        expect(screen.getByText("P")).toBeInTheDocument();

        vi.advanceTimersByTime(200);
        expect(screen.getByText("PAB")).toBeInTheDocument();

        // Completar el texto
        vi.advanceTimersByTime(title.length * 100);
        expect(screen.getByText(title)).toBeInTheDocument();

        // Después de la pausa, el texto debería reiniciarse
        vi.advanceTimersByTime(500);
        expect(screen.getByText("")).toBeInTheDocument();
    });
});
