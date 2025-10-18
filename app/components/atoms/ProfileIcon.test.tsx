import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProfileIcon from "./ProfileIcon";

describe("ProfileIcon", () => {
    const imageUrl = "https://example.com/profile.jpg";
    const altText = "Foto de prueba";

    it("debe renderizar el componente correctamente", () => {
        render(<ProfileIcon imageUrl={imageUrl} alt={altText} size={120} />);

        const img = screen.getByAltText(altText) as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toBe(imageUrl);

        const container = img.parentElement as HTMLElement;
        expect(container).toHaveStyle({
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "3px solid #1890ff",
            cursor: "pointer",
        });
    });

    it("debe escalar y cambiar borde al hacer hover", () => {
        render(<ProfileIcon imageUrl={imageUrl} alt={altText} />);
        const container = screen.getByAltText(altText).parentElement as HTMLElement;

        // Simular hover
        fireEvent.mouseEnter(container);
        expect(container.style.transform).toBe("scale(1.1)");
        expect(container.style.borderColor).toBe("rgb(64, 169, 255)");

        fireEvent.mouseLeave(container);
        expect(container.style.transform).toBe("scale(1)");
        expect(container.style.borderColor).toBe("rgb(24, 144, 255)");
    });
});
