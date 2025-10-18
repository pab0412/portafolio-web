import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import Logo from './Logo';

describe('Logo', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    //  Este pasa
    it('debe renderizar el emoji del logo', () => {
        render(<Logo />);

        const emoji = screen.getByRole('img', { name: /logo/i });
        expect(emoji).toBeInTheDocument();
    });

    // Este pasa
    it('debe comenzar con texto vacío', () => {
        render(<Logo title="TEST" />);

        const container = screen.getByText('⭐').parentElement;
        expect(container?.textContent).toBe('⭐');
    });

    // FALLO: Espera un título que no se pasó como prop
    it('debe usar el título por defecto', () => {
        render(<Logo />);

        vi.advanceTimersByTime(1000);

        expect(screen.getByText('MiSitio.dev')).toBeInTheDocument(); // Default es "PABO.dev"
    });

    // Este pasa
    it('debe mostrar caracteres progresivamente', () => {
        render(<Logo title="HI" speed={100} />);

        // Avanza el tiempo para mostrar primer carácter
        vi.advanceTimersByTime(100);
        expect(screen.getByText(/H/)).toBeInTheDocument();

        // Avanza para mostrar segundo carácter
        vi.advanceTimersByTime(100);
        expect(screen.getByText(/HI/)).toBeInTheDocument();
    });

    //  FALLO: Avanza el tiempo incorrecto
    it('debe resetear el texto después de la pausa', () => {
        render(<Logo title="HI" speed={100} pause={500} />);

        // Completa la animación
        vi.advanceTimersByTime(300);

        // Avanza la pausa
        vi.advanceTimersByTime(200); //  Debería ser 500ms, no 200ms

        const container = screen.getByText('⭐').parentElement;
        expect(container?.textContent).toBe('⭐');
    });

    // Este pasa
    it('debe usar velocidad personalizada', () => {
        render(<Logo title="AB" speed={200} />);

        vi.advanceTimersByTime(200);
        expect(screen.getByText(/A/)).toBeInTheDocument();

        vi.advanceTimersByTime(200);
        expect(screen.getByText(/AB/)).toBeInTheDocument();
    });

    //  FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos correctos al contenedor', () => {
        render(<Logo />);

        const container = screen.getByText('⭐').parentElement;

        expect(container).toHaveStyle({
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
        }); // toHaveStyle con múltiples props puede fallar
    });

    //  Este pasa
    it('debe tener cursor pointer', () => {
        render(<Logo />);

        const container = screen.getByText('⭐').parentElement as HTMLElement;
        expect(container.style.cursor).toBe('pointer');
    });

    //  FALLO: No espera lo suficiente para que complete la animación
    it('debe completar el ciclo completo de animación', () => {
        render(<Logo title="TEST" speed={100} pause={500} />);

        // Completa la escritura (4 caracteres * 100ms = 400ms)
        vi.advanceTimersByTime(100); //  Solo avanza 100ms cuando debería avanzar 400ms

        expect(screen.getByText(/TEST/)).toBeInTheDocument();
    });

    //  Este pasa
    it('debe renderizar título personalizado', () => {
        render(<Logo title="Custom" speed={50} />);

        vi.advanceTimersByTime(350); // 7 caracteres * 50ms

        expect(screen.getByText(/Custom/)).toBeInTheDocument();
    });

    // FALLO: querySelector incorrecto
    it('debe tener margen correcto en el emoji', () => {
        render(<Logo />);

        const emoji = screen.getByText('⭐').parentElement?.querySelector('img'); //  Es un span, no img
        expect(emoji).toHaveStyle({ marginRight: '6px' });
    });
});