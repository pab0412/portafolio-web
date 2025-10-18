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

    it('debe renderizar el footer', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer');
        expect(footer).toBeInTheDocument();
    });

    it('debe mostrar el año actual en el copyright', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(`© ${currentYear} Pab0412`, 'i'))).toBeInTheDocument();
    });

    it('debe mostrar "Todos los derechos reservados"', () => {
        render(<Footer />);
        expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument();
    });

    it('debe mostrar el texto sobre las tecnologías usadas', () => {
        render(<Footer />);
        expect(screen.getByText(/Desarrollado con React \+ TypeScript \+ Tailwind CSS/i)).toBeInTheDocument();
    });

    it('debe renderizar exactamente 3 iconos sociales', () => {
        render(<Footer />);
        const socialIcons = screen.getAllByTestId('social-icon');
        expect(socialIcons.length).toBe(3);
    });

    it('debe tener los links correctos de redes sociales', () => {
        render(<Footer />);
        const socialIcons = screen.getAllByTestId('social-icon');

        const githubIcon = socialIcons.find(icon => icon.getAttribute('href') === 'https://github.com/pab0412');
        const linkedinIcon = socialIcons.find(icon => icon.getAttribute('href') === 'https://linkedin.com/in/pab0412');
        const twitterIcon = socialIcons.find(icon => icon.getAttribute('href') === 'https://twitter.com/pab0412');

        expect(githubIcon).toBeTruthy();
        expect(linkedinIcon).toBeTruthy();
        expect(twitterIcon).toBeTruthy();
    });

    it('debe pasar size 28 y color blanco a los iconos sociales', () => {
        render(<Footer />);
        const socialIcons = screen.getAllByTestId('social-icon');
        socialIcons.forEach(icon => {
            expect(icon).toHaveAttribute('data-size', '28');
            expect(icon).toHaveAttribute('data-color', '#fff');
        });
    });

    it('debe aplicar estilos correctos al footer', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer') as HTMLElement;
        const styles = getComputedStyle(footer);

        expect(styles.width).toBe('100%');
        expect(styles.backgroundColor).toBe('rgb(0, 21, 41)'); // #001529
        expect(styles.color).toBe('rgb(255, 255, 255)'); // #fff
        expect(styles.textAlign).toBe('center');
        expect(styles.padding).toBe('40px 20px');
        expect(styles.marginTop).toBe('40px');
        expect(styles.position).toBe('relative');
        expect(styles.bottom).toBe('0px');
    });

    it('debe tener marginTop correcto en el contenedor de iconos', () => {
        const { container } = render(<Footer />);
        const iconsContainer = container.querySelector('.footer-icons-container') as HTMLElement;
        expect(iconsContainer).toBeTruthy();
        const styles = getComputedStyle(iconsContainer);
        expect(styles.marginTop).toBe('20px');
    });
});
