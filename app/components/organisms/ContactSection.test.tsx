import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import ContactSection from './ContactSection';

// Mock de ContactFormCard
vi.mock('../molecules/ContactFormCard', () => ({
    default: ({ onSubmit }: { onSubmit: (data: any) => void }) => (
        <div data-testid="contact-form-card">
            <button
                data-testid="submit-button"
                onClick={() => onSubmit({ name: 'Test', email: 'test@test.com', message: 'Test message' })}
            >
                Submit
            </button>
        </div>
    ),
}));

describe('ContactSection', () => {
    let consoleLogSpy: any;

    beforeEach(() => {
        consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
    });

    // Este pasa
    it('debe renderizar el ContactFormCard', () => {
        render(<ContactSection />);

        expect(screen.getByTestId('contact-form-card')).toBeInTheDocument();
    });

    // Este pasa
    it('debe tener el id "contact" en la sección', () => {
        const { container } = render(<ContactSection />);

        const section = container.querySelector('#contact');
        expect(section).toBeInTheDocument();
    });

    // FALLO: Busca id incorrecto
    it('debe tener el id correcto', () => {
        const { container } = render(<ContactSection />);

        const section = container.querySelector('#contacto'); // Debería ser #contact, no #contacto
        expect(section).toBeInTheDocument();
    });

    // Este pasa
    it('debe pasar la función onSubmit al ContactFormCard', () => {
        render(<ContactSection />);

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(consoleLogSpy).toHaveBeenCalledWith(
            'Mensaje enviado:',
            { name: 'Test', email: 'test@test.com', message: 'Test message' }
        );
    });

    // Este pasa
    it('debe renderizar una sección', () => {
        const { container } = render(<ContactSection />);

        const section = container.querySelector('section');
        expect(section).toBeInTheDocument();
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos correctos a la sección', () => {
        const { container } = render(<ContactSection />);

        const section = container.querySelector('section');

        expect(section).toHaveStyle({
            display: 'flex',
            justifyContent: 'center',
            padding: '60px 20px',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe tener display flex en la sección', () => {
        const { container } = render(<ContactSection />);

        const section = container.querySelector('section') as HTMLElement;
        expect(section.style.display).toBe('flex');
    });

    // Este pasa
    it('debe tener justifyContent center', () => {
        const { container } = render(<ContactSection />);

        const section = container.querySelector('section') as HTMLElement;
        expect(section.style.justifyContent).toBe('center');
    });

    // FALLO: Verifica padding incorrecto
    it('debe tener padding correcto', () => {
        const { container } = render(<ContactSection />);

        const section = container.querySelector('section') as HTMLElement;
        expect(section.style.padding).toBe('40px 20px'); // Debería ser 60px 20px, no 40px 20px
    });

    // Este pasa
    it('debe llamar a console.log con el mensaje correcto', () => {
        render(<ContactSection />);

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy.mock.calls[0][0]).toBe('Mensaje enviado:');
    });

    // FALLO: Verifica datos incorrectos en el console.log
    it('debe llamar a handleSubmit con los datos correctos', () => {
        render(<ContactSection />);

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(consoleLogSpy).toHaveBeenCalledWith(
            'Mensaje enviado:',
            { name: 'Juan', email: 'juan@test.com', message: 'Hola' } // Datos incorrectos
        );
    });

    // Este pasa
    it('debe renderizar solo un ContactFormCard', () => {
        render(<ContactSection />);

        const cards = screen.getAllByTestId('contact-form-card');
        expect(cards.length).toBe(1);
    });

    // FALLO: querySelector incorrecto
    it('debe renderizar dentro de una section con clase contact', () => {
        const { container } = render(<ContactSection />);

        const section = container.querySelector('.contact'); // No tiene clase, solo id
        expect(section).toBeInTheDocument();
    });

    // Este pasa
    it('debe ejecutar handleSubmit cuando ContactFormCard llama a onSubmit', () => {
        const { container } = render(<ContactSection />);

        const submitButton = screen.getByTestId('submit-button');

        consoleLogSpy.mockClear();
        fireEvent.click(submitButton);

        expect(consoleLogSpy).toHaveBeenCalled();
    });
});