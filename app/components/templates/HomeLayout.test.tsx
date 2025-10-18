import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomeLayout from './HomeLayout';

// Mocks de los componentes internos
vi.mock('../molecules/Header', () => ({
    default: () => <header data-testid="header">Header</header>,
}));

vi.mock('../molecules/FloatingTitle', () => ({
    default: ({ title, subtitle }: any) => (
        <div data-testid="floating-title">
            {title} {subtitle && ` - ${subtitle}`}
        </div>
    ),
}));

vi.mock('../organisms/AboutSection', () => ({
    default: () => <div data-testid="about-section">AboutSection</div>,
}));

vi.mock('../organisms/ProjectSection', () => ({
    default: () => <div data-testid="projects-section">ProjectsSection</div>,
}));

vi.mock('../organisms/ContactSection', () => ({
    default: () => <div data-testid="contact-section">ContactSection</div>,
}));

vi.mock('~/components/organisms/ServiceSection', () => ({
    default: () => <div data-testid="services-section">ServicesSection</div>,
}));

vi.mock('../organisms/Footer', () => ({
    default: () => <footer data-testid="footer">Footer</footer>,
}));

describe('HomeLayout', () => {
    it('debe renderizar el layout completo', () => {
        const { container } = render(<HomeLayout />);
        expect(container).toBeInTheDocument();
    });

    it('debe renderizar Header y Footer', () => {
        render(<HomeLayout />);
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('debe renderizar todas las secciones principales', () => {
        render(<HomeLayout />);
        expect(screen.getByTestId('about-section')).toBeInTheDocument();
        expect(screen.getByTestId('services-section')).toBeInTheDocument();
        expect(screen.getByTestId('projects-section')).toBeInTheDocument();
        expect(screen.getByTestId('contact-section')).toBeInTheDocument();
    });

    it('debe renderizar los FloatingTitle con los títulos correctos', () => {
        render(<HomeLayout />);
        const titles = screen.getAllByTestId('floating-title').map(t => t.textContent);
        expect(titles).toContain('Sobre mí ');
        expect(titles).toContain('Servicios ');
        expect(titles).toContain('Proyectos - Proyectos creados por mi o donde contribuí');
        expect(titles).toContain('Contáctame ');
    });
});
