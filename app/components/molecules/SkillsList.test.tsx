import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import SkillsList from './SkillsList';

// Mock de react-icons
vi.mock('react-icons/si', () => ({
    SiJavascript: ({ color }: { color: string }) => <span data-testid="icon-javascript" style={{ color }}>JS</span>,
    SiTypescript: ({ color }: { color: string }) => <span data-testid="icon-typescript" style={{ color }}>TS</span>,
    SiReact: ({ color }: { color: string }) => <span data-testid="icon-react" style={{ color }}>React</span>,
    SiNodedotjs: ({ color }: { color: string }) => <span data-testid="icon-node" style={{ color }}>Node</span>,
    SiHtml5: ({ color }: { color: string }) => <span data-testid="icon-html" style={{ color }}>HTML</span>,
    SiCss3: ({ color }: { color: string }) => <span data-testid="icon-css" style={{ color }}>CSS</span>,
    SiSpring: ({ color }: { color: string }) => <span data-testid="icon-spring" style={{ color }}>Spring</span>,
    SiPython: ({ color }: { color: string }) => <span data-testid="icon-python" style={{ color }}>Python</span>,
}));

describe('SkillsList', () => {

    // Este pasa
    it('debe renderizar todas las skills', () => {
        render(<SkillsList />);

        expect(screen.getByTestId('icon-python')).toBeInTheDocument();
        expect(screen.getByTestId('icon-spring')).toBeInTheDocument();
        expect(screen.getByTestId('icon-javascript')).toBeInTheDocument();
        expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
        expect(screen.getByTestId('icon-react')).toBeInTheDocument();
        expect(screen.getByTestId('icon-node')).toBeInTheDocument();
        expect(screen.getByTestId('icon-html')).toBeInTheDocument();
        expect(screen.getByTestId('icon-css')).toBeInTheDocument();
    });

    // FALLO: Espera cantidad incorrecta de skills
    it('debe renderizar exactamente 10 skills', () => {
        const { container } = render(<SkillsList />);

        const skillElements = container.querySelectorAll('[data-testid^="icon-"]');
        expect(skillElements.length).toBe(10); // Debería ser 8, no 10
    });

    // Este pasa
    it('debe mostrar tooltip al hacer hover en Python', () => {
        const { container } = render(<SkillsList />);

        const pythonIcon = screen.getByTestId('icon-python').parentElement;
        fireEvent.mouseEnter(pythonIcon!);

        expect(screen.getByText('Python')).toBeInTheDocument();
    });

    // Este pasa
    it('debe ocultar tooltip al salir del hover', () => {
        const { container } = render(<SkillsList />);

        const pythonIcon = screen.getByTestId('icon-python').parentElement;
        fireEvent.mouseEnter(pythonIcon!);
        expect(screen.getByText('Python')).toBeInTheDocument();

        fireEvent.mouseLeave(pythonIcon!);
        expect(screen.queryByText('Python')).not.toBeInTheDocument();
    });

    // FALLO: Busca tooltip que no debería estar visible
    it('debe mostrar solo un tooltip a la vez', () => {
        const { container } = render(<SkillsList />);

        const pythonIcon = screen.getByTestId('icon-python').parentElement;
        const jsIcon = screen.getByTestId('icon-javascript').parentElement;

        fireEvent.mouseEnter(pythonIcon!);
        fireEvent.mouseEnter(jsIcon!);

        expect(screen.getByText('Python')).toBeInTheDocument(); // Python no debería estar visible
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    // Este pasa
    it('debe aplicar transform scale(1.2) al hacer hover', () => {
        const { container } = render(<SkillsList />);

        const pythonIcon = screen.getByTestId('icon-python').parentElement as HTMLElement;

        fireEvent.mouseEnter(pythonIcon);
        expect(pythonIcon.style.transform).toBe('scale(1.2)');
    });

    // Este pasa
    it('debe restaurar transform scale(1) al salir del hover', () => {
        const { container } = render(<SkillsList />);

        const pythonIcon = screen.getByTestId('icon-python').parentElement as HTMLElement;

        fireEvent.mouseEnter(pythonIcon);
        fireEvent.mouseLeave(pythonIcon);

        expect(pythonIcon.style.transform).toBe('scale(1)');
    });

    // FALLO: Verifica color incorrecto
    it('debe aplicar el color correcto a los iconos', () => {
        render(<SkillsList />);

        const pythonIcon = screen.getByTestId('icon-python') as HTMLElement;
        expect(pythonIcon.style.color).toBe('rgb(255, 0, 0)'); // Debería ser #1885F0, no rojo
    });

    // Este pasa
    it('debe tener cursor pointer en cada skill', () => {
        const { container } = render(<SkillsList />);

        const pythonIcon = screen.getByTestId('icon-python').parentElement as HTMLElement;
        expect(pythonIcon.style.cursor).toBe('pointer');
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos correctos al contenedor principal', () => {
        const { container } = render(<SkillsList />);

        const mainContainer = container.firstChild;

        expect(mainContainer).toHaveStyle({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            marginTop: '20px',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe mostrar diferentes tooltips para diferentes skills', () => {
        const { container } = render(<SkillsList />);

        const jsIcon = screen.getByTestId('icon-javascript').parentElement;
        fireEvent.mouseEnter(jsIcon!);
        expect(screen.getByText('JavaScript')).toBeInTheDocument();

        fireEvent.mouseLeave(jsIcon!);

        const reactIcon = screen.getByTestId('icon-react').parentElement;
        fireEvent.mouseEnter(reactIcon!);
        expect(screen.getByText('React')).toBeInTheDocument();
    });

    // FALLO: Verifica posición top incorrecta del tooltip
    it('debe posicionar el tooltip correctamente', () => {
        const { container } = render(<SkillsList />);

        const pythonIcon = screen.getByTestId('icon-python').parentElement;
        fireEvent.mouseEnter(pythonIcon!);

        const tooltip = screen.getByText('Python') as HTMLElement;
        expect(tooltip.style.top).toBe('60px'); // Debería ser 50px, no 60px
    });

    // Este pasa
    it('debe tener fontSize 40px en los iconos', () => {
        const { container } = render(<SkillsList />);

        const iconContainer = screen.getByTestId('icon-python').parentElement as HTMLElement;
        expect(iconContainer.style.fontSize).toBe('40px');
    });

    // FALLO: querySelector incorrecto para buscar tooltips
    it('no debe mostrar tooltips al cargar inicialmente', () => {
        const { container } = render(<SkillsList />);

        const tooltips = container.querySelectorAll('span[style*="position: absolute"]'); // Busca span en vez de div
        expect(tooltips.length).toBe(0);
    });
});