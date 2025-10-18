import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import FloatingTitle from './Title';

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

describe('FloatingTitle', () => {

    // Este pasa
    it('debe renderizar el título', () => {
        render(<FloatingTitle title="Mi Título" />);

        expect(screen.getByText('Mi Título')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar el subtítulo cuando se proporciona', () => {
        render(<FloatingTitle title="Título" subtitle="Subtítulo de prueba" />);

        expect(screen.getByText('Subtítulo de prueba')).toBeInTheDocument();
    });

    // FALLO: Busca subtítulo que no existe
    it('debe renderizar el subtítulo por defecto', () => {
        render(<FloatingTitle title="Título" />);

        expect(screen.getByText('Subtítulo por defecto')).toBeInTheDocument(); // No hay subtítulo por defecto
    });

    // Este pasa
    it('no debe renderizar subtítulo si no se proporciona', () => {
        render(<FloatingTitle title="Título" />);

        const paragraphs = screen.queryAllByRole('paragraph');
        expect(paragraphs.length).toBe(0);
    });

    // Este pasa
    it('debe pasar float=false al CustomCard', () => {
        const { container } = render(<FloatingTitle title="Título" />);

        const card = screen.getByTestId('custom-card');
        expect(card).toHaveAttribute('data-float', 'false');
    });

    // FALLO: Verifica border inicial incorrecto
    it('debe tener border transparente inicialmente', () => {
        const { container } = render(<FloatingTitle title="Título" />);

        const card = screen.getByTestId('custom-card') as HTMLElement;
        expect(card.style.border).toBe('2px solid #1890ff'); // Debería ser transparent, no azul
    });

    // Este pasa
    it('debe cambiar el borde a azul al hacer hover', () => {
        const { container } = render(<FloatingTitle title="Título" />);

        const card = screen.getByTestId('custom-card') as HTMLElement;

        fireEvent.mouseEnter(card);
        expect(card.style.border).toBe('2px solid #1890ff');
    });

    // Este pasa
    it('debe restaurar el borde transparente al salir del hover', () => {
        const { container } = render(<FloatingTitle title="Título" />);

        const card = screen.getByTestId('custom-card') as HTMLElement;

        fireEvent.mouseEnter(card);
        fireEvent.mouseLeave(card);

        expect(card.style.border).toBe('2px solid transparent');
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos correctos al título', () => {
        render(<FloatingTitle title="Título" />);

        const title = screen.getByText('Título');

        expect(title).toHaveStyle({
            fontSize: '24px',
            color: '#1890ff',
            margin: '0',
            fontWeight: 'bold',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe tener color azul en el título', () => {
        render(<FloatingTitle title="Título" />);

        const title = screen.getByText('Título') as HTMLElement;
        expect(title.style.color).toBe('rgb(24, 144, 255)');
    });

    // FALLO: Verifica fontSize incorrecto del subtítulo
    it('debe aplicar fontSize correcto al subtítulo', () => {
        render(<FloatingTitle title="Título" subtitle="Subtítulo" />);

        const subtitle = screen.getByText('Subtítulo') as HTMLElement;
        expect(subtitle.style.fontSize).toBe('16px'); // Debería ser 14px, no 16px
    });

    // Este pasa
    it('debe tener maxWidth de 400px', () => {
        const { container } = render(<FloatingTitle title="Título" />);

        const card = screen.getByTestId('custom-card') as HTMLElement;
        expect(card.style.maxWidth).toBe('400px');
    });

    // Este pasa
    it('debe tener margin de 50px auto', () => {
        const { container } = render(<FloatingTitle title="Título" />);

        const card = screen.getByTestId('custom-card') as HTMLElement;
        expect(card.style.margin).toBe('50px auto');
    });

    // FALLO: No simula mouseLeave antes de verificar
    it('debe mantener el estado hover después de mouseEnter', () => {
        const { container } = render(<FloatingTitle title="Título" />);

        const card = screen.getByTestId('custom-card') as HTMLElement;

        fireEvent.mouseEnter(card);
        fireEvent.mouseLeave(card); // Simula mouseLeave pero esperamos que siga con hover

        expect(card.style.border).toBe('2px solid #1890ff'); // Debería ser transparent
    });

    // Este pasa
    it('debe renderizar un h2 para el título', () => {
        render(<FloatingTitle title="Título" />);

        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Título');
    });

    // FALLO: querySelector incorrecto para buscar el subtítulo
    it('debe tener marginTop correcto en el subtítulo', () => {
        render(<FloatingTitle title="Título" subtitle="Subtítulo" />);

        const subtitle = screen.getByRole('heading') as HTMLElement; // Busca heading en vez de p
        expect(subtitle?.style.marginTop).toBe('5px');
    });
});