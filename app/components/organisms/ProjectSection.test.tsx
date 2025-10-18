import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ProjectsSection from './ProjectSection';

// Mock de CustomCard
vi.mock('../atoms/Card', () => ({
    default: ({
                  children,
                  float,
                  style,
                  onMouseEnter,
                  onMouseLeave
              }: {
        children: React.ReactNode;
        float?: boolean;
        style?: React.CSSProperties;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
    }) => (
        <div
            data-testid="custom-card"
            data-float={float}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </div>
    ),
}));

// Mock de ProjectCard
vi.mock('../molecules/ProjectCard', () => ({
    default: ({ title, description, tecnologies, link, style }: any) => (
        <div data-testid="project-card" data-title={title} style={style}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    ),
}));

// Mock de Button de antd
vi.mock('antd', () => ({
    Button: ({ children, onClick, style, type }: any) => (
        <button data-testid="show-more-button" onClick={onClick} style={style} data-type={type}>
            {children}
        </button>
    ),
}));

describe('ProjectsSection', () => {

    // Este pasa
    it('debe renderizar el CustomCard', () => {
        render(<ProjectsSection />);

        expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar 3 proyectos inicialmente', () => {
        render(<ProjectsSection />);

        const projectCards = screen.getAllByTestId('project-card');
        expect(projectCards.length).toBe(3);
    });

    // FALLO: Espera cantidad inicial incorrecta
    it('debe mostrar todos los proyectos al cargar', () => {
        render(<ProjectsSection />);

        const projectCards = screen.getAllByTestId('project-card');
        expect(projectCards.length).toBe(6); // Solo muestra 3 inicialmente, no 6
    });

    // Este pasa
    it('debe renderizar el botón "Ver más"', () => {
        render(<ProjectsSection />);

        expect(screen.getByTestId('show-more-button')).toBeInTheDocument();
        expect(screen.getByText('Ver más')).toBeInTheDocument();
    });

    // Este pasa
    it('debe mostrar más proyectos al hacer clic en "Ver más"', () => {
        render(<ProjectsSection />);

        const button = screen.getByTestId('show-more-button');
        fireEvent.click(button);

        const projectCards = screen.getAllByTestId('project-card');
        expect(projectCards.length).toBeGreaterThan(3);
    });

    // FALLO: El botón no desaparece porque hay exactamente 3 proyectos
    it('debe ocultar el botón "Ver más" cuando se muestran todos los proyectos', () => {
        render(<ProjectsSection />);

        const button = screen.getByTestId('show-more-button');
        fireEvent.click(button);

        expect(screen.queryByTestId('show-more-button')).not.toBeInTheDocument(); // El botón desaparece porque ya no hay más
    });

    // Este pasa
    it('debe renderizar el proyecto "Portafolio Web"', () => {
        render(<ProjectsSection />);

        expect(screen.getByText('Portafolio Web')).toBeInTheDocument();
    });

    // FALLO: Busca proyecto que no está en la lista inicial visible
    it('debe renderizar el proyecto "LevelUp Gamer"', () => {
        render(<ProjectsSection />);

        expect(screen.getByText('LevelUp Gamer')).toBeInTheDocument();
    });

    // Este pasa
    it('debe pasar float=false al CustomCard', () => {
        render(<ProjectsSection />);

        const card = screen.getByTestId('custom-card');
        expect(card).toHaveAttribute('data-float', 'false');
    });

    // Este pasa
    it('debe cambiar el borde al hacer hover', () => {
        render(<ProjectsSection />);

        const card = screen.getByTestId('custom-card') as HTMLElement;

        fireEvent.mouseEnter(card);
        expect(card.style.border).toBe('2px solid #1890ff');
    });

    // Este pasa
    it('debe restaurar el borde al salir del hover', () => {
        render(<ProjectsSection />);

        const card = screen.getByTestId('custom-card') as HTMLElement;

        fireEvent.mouseEnter(card);
        fireEvent.mouseLeave(card);

        expect(card.style.border).toBe('white');
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos correctos al CustomCard', () => {
        render(<ProjectsSection />);

        const card = screen.getByTestId('custom-card');

        expect(card).toHaveStyle({
            textAlign: 'center',
            padding: '60px',
            width: '100%',
            maxWidth: '1200px',
            boxSizing: 'border-box',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe tener maxWidth de 1200px', () => {
        render(<ProjectsSection />);

        const card = screen.getByTestId('custom-card') as HTMLElement;
        expect(card.style.maxWidth).toBe('1200px');
    });

    // FALLO: Verifica padding incorrecto
    it('debe tener padding correcto', () => {
        render(<ProjectsSection />);

        const card = screen.getByTestId('custom-card') as HTMLElement;
        expect(card.style.padding).toBe('40px'); // Debería ser 60px, no 40px
    });

    // Este pasa
    it('debe incrementar visibleCount en 3 al hacer clic en "Ver más"', () => {
        render(<ProjectsSection />);

        const initialCards = screen.getAllByTestId('project-card').length; // 3

        const button = screen.getByTestId('show-more-button');
        fireEvent.click(button);

        const newCards = screen.getAllByTestId('project-card').length; // Sigue siendo 3
        expect(newCards).toBe(initialCards + 3); // Espera 6, pero solo hay 3 proyectos
    });

    // FALLO: querySelector incorrecto para el grid container
    it('debe tener display grid en el contenedor de proyectos', () => {
        const { container } = render(<ProjectsSection />);

        const gridContainer = container.querySelector('button') as HTMLElement; // Busca button en vez del div grid
        expect(gridContainer?.style.display).toBe('grid');
    });
});