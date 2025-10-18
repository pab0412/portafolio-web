import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Footer from './Footer';

// Mock de SocialIcon
vi.mock('../atoms/SocialsIcon', () => ({
    default: ({ icon, link, color, hoverColor, size }: any) => (
        <a
            data-testid="social-icon"
            href={link}
            data-color={color}
            data-hover-color={hoverColor}
            data-size={size}
        >
            Social Icon
        </a>
    ),
}));

// Mock de react-icons
vi.mock('react-icons/fa', () => ({
    FaGithub: () => <span data-testid="icon-github">GitHub</span>,
    FaLinkedin: () => <span data-testid="icon-linkedin">LinkedIn</span>,
    FaTwitter: () => <span data-testid="icon-twitter">Twitter</span>,
    FaWhatsapp: () => <span data-testid="icon-whatsapp">WhatsApp</span>,
}));

describe('Footer', () => {

    // Este pasa
    it('debe renderizar el footer', () => {
        const { container } = render(<Footer />);

        const footer = container.querySelector('footer');
        expect(footer).toBeInTheDocument();
    });

    // Este pasa
    it('debe mostrar el año actual en el copyright', () => {
        render(<Footer />);

        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    });

    // FALLO: Busca texto incorrecto en el copyright
    it('debe mostrar el texto de copyright correcto', () => {
        render(<Footer />);

        expect(screen.getByText(/© 2024 PABO.dev/i)).toBeInTheDocument(); // Debería ser "Pab0412", no "PABO.dev"
    });

    // Este pasa
    it('debe mostrar "Todos los derechos reservados"', () => {
        render(<Footer />);

        expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument();
    });

    // Este pasa
    it('debe mostrar el texto sobre las tecnologías usadas', () => {
        render(<Footer />);

        expect(screen.getByText(/Desarrollado con React \+ TypeScript \+ Tailwind CSS/i)).toBeInTheDocument();
    });

    // FALLO: Espera cantidad incorrecta de iconos sociales
    it('debe renderizar 3 iconos sociales', () => {
        render(<Footer />);

        const socialIcons = screen.getAllByTestId('social-icon');
        expect(socialIcons.length).toBe(4); // Debería ser 3, no 4
    });

    // Este pasa
    it('debe renderizar exactamente 3 iconos sociales', () => {
        render(<Footer />);

        const socialIcons = screen.getAllByTestId('social-icon');
        expect(socialIcons.length).toBe(3);
    });

    // Este pasa
    it('debe tener el link correcto de GitHub', () => {
        render(<Footer />);

        const socialIcons = screen.getAllByTestId('social-icon');
        const githubIcon = socialIcons.find(icon => icon.getAttribute('href') === 'https://github.com/pab0412');

        expect(githubIcon).toBeTruthy();
    });

    // FALLO: Verifica link incorrecto de LinkedIn
    it('debe tener el link correcto de LinkedIn', () => {
        render(<Footer />);

        const socialIcons = screen.getAllByTestId('social-icon');
        const linkedinIcon = socialIcons.find(icon => icon.getAttribute('href') === 'https://linkedin.com/in/pablo-sepulveda');

        expect(linkedinIcon).toBeTruthy(); // El link real es /in/pab0412, no /in/pablo-sepulveda
    });

    // Este pasa
    it('debe tener backgroundColor correcto', () => {
        const { container } = render(<Footer />);

        const footer = container.querySelector('footer') as HTMLElement;
        expect(footer.style.backgroundColor).toBe('rgb(0, 21, 41)');
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos correctos al footer', () => {
        const { container } = render(<Footer />);

        const footer = container.querySelector('footer');

        expect(footer).toHaveStyle({
            width: '100%',
            backgroundColor: '#001529',
            color: '#fff',
            textAlign: 'center',
            padding: '40px 20px',
            marginTop: '40px',
            position: 'relative',
            bottom: '0',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe tener textAlign center', () => {
        const { container } = render(<Footer />);

        const footer = container.querySelector('footer') as HTMLElement;
        expect(footer.style.textAlign).toBe('center');
    });

    // FALLO: Verifica padding incorrecto
    it('debe tener padding correcto', () => {
        const { container } = render(<Footer />);

        const footer = container.querySelector('footer') as HTMLElement;
        expect(footer.style.padding).toBe('30px 20px'); // Debería ser 40px 20px, no 30px 20px
    });

    // Este pasa
    it('debe pasar size 28 a los iconos sociales', () => {
        render(<Footer />);

        const socialIcons = screen.getAllByTestId('social-icon');

        socialIcons.forEach(icon => {
            expect(icon).toHaveAttribute('data-size', '28');
        });
    });

    // Este pasa
    it('debe pasar color blanco a los iconos sociales', () => {
        render(<Footer />);

        const socialIcons = screen.getAllByTestId('social-icon');

        socialIcons.forEach(icon => {
            expect(icon).toHaveAttribute('data-color', '#fff');
        });
    });

    // FALLO: querySelector incorrecto para buscar el div de iconos
    it('debe tener marginTop en el contenedor de iconos', () => {
        const { container } = render(<Footer />);

        const iconsContainer = container.querySelector('p') as HTMLElement; // Busca p en vez del div
        expect(iconsContainer?.style.marginTop).toBe('20px');
    });
});