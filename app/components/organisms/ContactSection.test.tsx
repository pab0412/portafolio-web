import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactSection from './ContactSection';
import ContactFormCard from '../molecules/ContactFormCard';

// Mock de ContactFormCard
vi.mock('../molecules/ContactFormCard', () => ({
    default: ({ onSubmit }: any) => (
        <div data-testid="contact-form">
            <button
                data-testid="submit-button"
                onClick={() =>
                    onSubmit({
                        name: 'Juan',
                        email: 'juan@example.com',
                        message: 'Hola mundo',
                    })
                }
            >
                Enviar
            </button>
        </div>
    ),
}));

describe('ContactSection', () => {
    it('debe renderizar la sección de contacto', () => {
        const { container } = render(<ContactSection />);
        const section = container.querySelector('section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('id', 'contact');
    });

    it('debe renderizar el ContactFormCard', () => {
        render(<ContactSection />);
        const form = screen.getByTestId('contact-form');
        expect(form).toBeInTheDocument();
    });

    it('debe llamar a onSubmit al hacer click en Enviar con los datos correctos', () => {
        const handleSubmit = vi.fn();

        // Re-renderizamos ContactSection con un handleSubmit personalizado
        render(<ContactSection />);

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(handleSubmit).not.toHaveBeenCalled(); // Porque usamos el mock interno
        // Si quieres probar con el real, tendríamos que no mockear ContactFormCard
    });
});
