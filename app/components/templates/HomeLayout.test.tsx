import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import HomeLayout from './HomeLayout';

// Mock de Header
vi.mock('../molecules/Header', () => ({
    default: () => <header data-testid="header">Header</header>,
}));

// Mock de FloatingTitle
vi.mock('../molecules/Title', () => ({
    default: ({ title }: { title: string }) => <div data-testid="floating-title">{title}</div>,
}));

// Mock de AboutMe
vi.mock('../organisms/AboutSection', () => ({
    default: () => <div data-testid="about-section">About Section</div>,
}));

// Mock de ProjectsSection
vi.mock('../organisms/Proyects', () => ({
    default: () => <div data-testid="projects-section">Projects Section</div>,
}));

// Mock de ContactSection
vi.mock('../organisms/ContactSection', () => ({
    default: () => <div data-testid="contact-section">Contact Section</div>,
}));

// Mock de Footer
vi.mock('../organisms/Footer', () => ({
    default: () => <footer data-testid="footer">Footer</footer>,
}));

describe('HomeLayout', () => {

    // Este pasa
    it('debe renderizar el Header', () => {
        render(<HomeLayout />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar el Footer', () => {
        render(<HomeLayout />);

        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar 3 FloatingTitle', () => {
        render(<HomeLayout />);

        const floatingTitles = screen.getAllByTestId('floating-title');
        expect(floatingTitles.length).toBe(3);
    });

    // FALLO: Espera cantidad incorrecta de FloatingTitle
    it('debe renderizar 4 secciones con FloatingTitle', () => {
        render(<HomeLayout />);

        const floatingTitles = screen.getAllByTestId('floating-title');
        expect(floatingTitles.length).toBe(4); // Debería ser 3, no 4
    });

    // Este pasa
    it('debe renderizar FloatingTitle con "Sobre mí"', () => {
        render(<HomeLayout />);

        expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar FloatingTitle con "Proyectos"', () => {
        render(<HomeLayout />);

        expect(screen.getByText('Proyectos')).toBeInTheDocument();
    });

    // FALLO: Busca título que no existe
    it('debe renderizar FloatingTitle con "Contacto"', () => {
        render(<HomeLayout />);

        expect(screen.getByText('Contacto')).toBeInTheDocument(); // Debería ser "Contáctame", no "Contacto"
    });

    // Este pasa
    it('debe renderizar AboutSection', () => {
        render(<HomeLayout />);

        expect(screen.getByTestId('about-section')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar ProjectsSection', () => {
        render(<HomeLayout />);

        expect(screen.getByTestId('projects-section')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar ContactSection', () => {
        render(<HomeLayout />);

        expect(screen.getByTestId('contact-section')).toBeInTheDocument();
    });

    // Este pasa
    it('debe tener el id "about" en la sección correspondiente', () => {
        const { container } = render(<HomeLayout />);

        const aboutSection = container.querySelector('#about');
        expect(aboutSection).toBeInTheDocument();
    });

    // Este pasa
    it('debe tener el id "projects" en la sección correspondiente', () => {
        const { container } = render(<HomeLayout />);

        const projectsSection = container.querySelector('#projects');
        expect(projectsSection).toBeInTheDocument();
    });

    // FALLO: Busca id incorrecto
    it('debe tener el id "contacto" en la sección de contacto', () => {
        const { container } = render(<HomeLayout />);

        const contactSection = container.querySelector('#contacto'); // Debería ser #contact, no #contacto
        expect(contactSection).toBeInTheDocument();
    });

    // Este pasa
    it('debe tener paddingTop de 70px en el contenedor principal', () => {
        const { container } = render(<HomeLayout />);

        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv.style.paddingTop).toBe('70px');
    });

    // FALLO: Verifica paddingTop incorrecto
    it('debe tener paddingTop correcto', () => {
        const { container } = render(<HomeLayout />);

        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv.style.paddingTop).toBe('80px'); // Debería ser 70px, no 80px
    });

    // Este pasa
    it('debe tener width 100% en el contenedor principal', () => {
        const { container } = render(<HomeLayout />);

        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv.style.width).toBe('100%');
    });

    // Este pasa
    it('debe tener width 100% en todas las secciones', () => {
        const { container } = render(<HomeLayout />);

        const sections = container.querySelectorAll('[id]');
        sections.forEach(section => {
            expect((section as HTMLElement).style.width).toBe('100%');
        });
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos correctos al contenedor principal', () => {
        const { container } = render(<HomeLayout />);

        const mainDiv = container.firstChild;

        expect(mainDiv).toHaveStyle({
            width: '100%',
            paddingTop: '70px',
        }); // toHaveStyle puede fallar
    });

    // Este pasa
    it('debe renderizar las secciones en el orden correcto', () => {
        const { container } = render(<HomeLayout />);

        const allSections = Array.from(container.querySelectorAll('[data-testid]'));
        const testIds = allSections.map(el => el.getAttribute('data-testid'));

        expect(testIds[0]).toBe('header');
        expect(testIds[testIds.length - 1]).toBe('footer');
    });

    // FALLO: querySelector incorrecto
    it('debe tener la sección about como primera sección', () => {
        const { container } = render(<HomeLayout />);

        const firstSection = container.querySelector('footer'); // Busca footer en vez de #about
        expect(firstSection?.id).toBe('about');
    });
});