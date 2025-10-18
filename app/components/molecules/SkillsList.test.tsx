import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillsList from "../molecules/SkillsList";

describe("SkillsList component", () => {
    it("renderiza todas las habilidades", () => {
        render(<SkillsList />);

        // Verifica que se rendericen todos los iconos (8 habilidades)
        const icons = screen.getAllByRole("img", { hidden: true });
        expect(icons.length).toBeGreaterThanOrEqual(8);
    });

    it("muestra el tooltip al hacer hover sobre una habilidad", () => {
        render(<SkillsList />);

        // Encuentra el primer skill por su ícono
        const firstSkill = screen.getAllByText("", { selector: "div" })[0];
        fireEvent.mouseEnter(firstSkill);

        // Busca el tooltip con el nombre de una habilidad
        expect(screen.getByText(/Python|JavaScript|React|Node\.js/i)).toBeInTheDocument();
    });

    it("oculta el tooltip al salir del hover", () => {
        render(<SkillsList />);

        const skillDivs = screen.getAllByRole("img", { hidden: true });
        const firstSkill = skillDivs[0];

        // Hover in
        fireEvent.mouseEnter(firstSkill);
        const tooltip = screen.queryByText(/Python|JavaScript|React|Node\.js/i);
        expect(tooltip).toBeInTheDocument();

        // Hover out
        fireEvent.mouseLeave(firstSkill);
        expect(screen.queryByText(/Python|JavaScript|React|Node\.js/i)).not.toBeInTheDocument();
    });
});
