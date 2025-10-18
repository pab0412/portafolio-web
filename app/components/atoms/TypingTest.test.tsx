import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import TypingText from './TypingText';

describe('TypingText', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    // Este pasa
    it('debe comenzar con texto vacío', () => {
        const { container } = render(<TypingText text="Hello" />);
        const span = container.querySelector('span');

        expect(span?.innerHTML).toBe('');
    });

    // Este pasa
    it('debe mostrar el texto progresivamente', () => {
        const { container } = render(<TypingText text="Hi" speed={100} />);
        const span = container.querySelector('span');

        vi.advanceTimersByTime(100);
        expect(span?.innerHTML).toBe('H');

        vi.advanceTimersByTime(100);
        expect(span?.innerHTML).toBe('Hi');
    });

    // FALLO: Espera velocidad incorrecta
    it('debe usar la velocidad por defecto', () => {
        const { container } = render(<TypingText text="AB" />);
        const span = container.querySelector('span');

        vi.advanceTimersByTime(100); // Debería ser 50ms, no 100ms
        expect(span?.innerHTML).toBe('A');
    });

    // Este pasa
    it('debe mostrar el texto completo después del tiempo total', () => {
        const { container } = render(<TypingText text="Test" speed={50} />);
        const span = container.querySelector('span');

        vi.advanceTimersByTime(200); // 4 caracteres * 50ms = 200ms
        expect(span?.innerHTML).toBe('Test');
    });

    // Este pasa
    it('debe aplicar estilos personalizados', () => {
        const customStyle = { color: 'red', fontSize: '20px' };
        const { container } = render(<TypingText text="Styled" style={customStyle} />);
        const span = container.querySelector('span') as HTMLElement;

        expect(span.style.color).toBe('red');
        expect(span.style.fontSize).toBe('20px');
    });

    // FALLO: No avanza suficiente tiempo
    it('debe completar la animación del texto largo', () => {
        const { container } = render(<TypingText text="Hello World" speed={50} />);
        const span = container.querySelector('span');

        vi.advanceTimersByTime(200); // 11 caracteres * 50ms = 550ms, pero solo avanza 200ms
        expect(span?.innerHTML).toBe('Hello World');
    });

    // Este pasa
    it('debe renderizar HTML correctamente con dangerouslySetInnerHTML', () => {
        const { container } = render(<TypingText text="<strong>Bold</strong>" speed={50} />);
        const span = container.querySelector('span');

        vi.advanceTimersByTime(1000); // Suficiente para completar
        expect(span?.innerHTML).toContain('<strong>Bold</strong>');
    });

    // FALLO: Busca con getByText cuando usa dangerouslySetInnerHTML
    it('debe renderizar el texto visible', () => {
        render(<TypingText text="Visible" speed={50} />);

        vi.advanceTimersByTime(300);

        expect(screen.getByText('Visible')).toBeInTheDocument(); // Puede fallar con dangerouslySetInnerHTML
    });

    // Este pasa
    it('debe cambiar el texto cuando cambia la prop text', () => {
        const { container, rerender } = render(<TypingText text="First" speed={50} />);
        const span = container.querySelector('span');

        vi.advanceTimersByTime(250);
        expect(span?.innerHTML).toBe('First');

        rerender(<TypingText text="Second" speed={50} />);
        vi.advanceTimersByTime(300);
        expect(span?.innerHTML).toBe('Second');
    });

    // FALLO: toHaveStyle con objeto puede ser inconsistente
    it('debe aplicar múltiples estilos correctamente', () => {
        const customStyle = { color: 'blue', fontWeight: 'bold', fontSize: '16px' };
        const { container } = render(<TypingText text="Test" style={customStyle} />);
        const span = container.querySelector('span');

        expect(span).toHaveStyle({
            color: 'blue',
            fontWeight: 'bold',
            fontSize: '16px',
        }); // toHaveStyle con múltiples props puede ser inconsistente
    });

    // Este pasa
    it('debe funcionar sin prop style', () => {
        expect(() => {
            render(<TypingText text="No style" />);
            vi.advanceTimersByTime(500);
        }).not.toThrow();
    });

    // FALLO: Espera texto incorrecto
    it('debe renderizar el texto "TypeScript"', () => {
        const { container } = render(<TypingText text="JavaScript" speed={50} />);
        const span = container.querySelector('span');

        vi.advanceTimersByTime(500);
        expect(span?.innerHTML).toBe('TypeScript'); // Renderiza "JavaScript", no "TypeScript"
    });
});