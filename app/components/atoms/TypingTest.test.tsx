import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TypingText from './TypingText';

describe('TypingText', () => {
    beforeEach(() => {
        vi.useFakeTimers(); // Activar timers falsos
    });

    afterEach(() => {
        vi.useRealTimers(); // Restaurar timers reales
    });

    it('debe renderizar el componente vacío inicialmente', () => {
        render(<TypingText text="Hola mundo" />);
        expect(screen.getByText('')).toBeInTheDocument();
    });

    it('debe mostrar el texto progresivamente', () => {
        render(<TypingText text="Hola" speed={50} />);

        // Inicialmente está vacío
        expect(screen.getByText('')).toBeInTheDocument();

        // Avanzamos 50ms -> debe mostrar la primera letra
        vi.advanceTimersByTime(50);
        expect(screen.getByText('H')).toBeInTheDocument();

        // Avanzamos 50ms más -> segunda letra
        vi.advanceTimersByTime(50);
        expect(screen.getByText('Ho')).toBeInTheDocument();

        // Avanzamos 100ms -> completamos todo
        vi.advanceTimersByTime(100);
        expect(screen.getByText('Hola')).toBeInTheDocument();
    });

    it('debe limpiar el intervalo al desmontar', () => {
        const { unmount } = render(<TypingText text="Test" speed={50} />);
        const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

        unmount();
        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});
