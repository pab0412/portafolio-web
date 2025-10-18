import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import ContactFormCard from './ContactFormCard';

describe('ContactFormCard', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    // Este pasa
    it('debe renderizar todos los campos del formulario', () => {
        render(<ContactFormCard />);

        expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Mensaje')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
    });

    // Este pasa
    it('debe actualizar el valor del input de nombre', () => {
        render(<ContactFormCard />);

        const nameInput = screen.getByPlaceholderText('Nombre') as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });

        expect(nameInput.value).toBe('Juan Pérez');
    });

    // Este pasa
    it('debe actualizar el valor del input de email', () => {
        render(<ContactFormCard />);

        const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });

        expect(emailInput.value).toBe('juan@example.com');
    });

    // Este pasa
    it('debe actualizar el valor del textarea de mensaje', () => {
        render(<ContactFormCard />);

        const msgInput = screen.getByPlaceholderText('Mensaje') as HTMLTextAreaElement;
        fireEvent.change(msgInput, { target: { value: 'Este es un mensaje de prueba' } });

        expect(msgInput.value).toBe('Este es un mensaje de prueba');
    });

    // FALLO: Espera error con longitud incorrecta
    it('debe mostrar error si el nombre tiene menos de 2 caracteres', () => {
        render(<ContactFormCard />);

        const nameInput = screen.getByPlaceholderText('Nombre');
        fireEvent.change(nameInput, { target: { value: 'A' } });

        const submitButton = screen.getByRole('button', { name: /enviar/i });
        fireEvent.click(submitButton);

        expect(screen.getByText('El nombre debe tener al menos 3 caracteres')).toBeInTheDocument(); // Debería ser 2, no 3
    });

    // Este pasa
    it('debe mostrar error si el email no contiene @', () => {
        render(<ContactFormCard />);

        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'emailinvalido' } });

        const submitButton = screen.getByRole('button', { name: /enviar/i });
        fireEvent.click(submitButton);

        expect(screen.getByText('Introduce un email válido')).toBeInTheDocument();
    });

    // FALLO: Espera longitud mínima incorrecta
    it('debe mostrar error si el mensaje tiene menos de 5 caracteres', () => {
        render(<ContactFormCard />);

        const msgInput = screen.getByPlaceholderText('Mensaje');
        fireEvent.change(msgInput, { target: { value: 'Hola' } });

        const submitButton = screen.getByRole('button', { name: /enviar/i });
        fireEvent.click(submitButton);

        expect(screen.getByText('El mensaje debe tener al menos 10 caracteres')).toBeInTheDocument(); // Debería ser 5, no 10
    });

    // Este pasa
    it('debe llamar a onSubmit con los datos correctos cuando el formulario es válido', () => {
        const mockOnSubmit = vi.fn();
        render(<ContactFormCard onSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juan' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'juan@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Mensaje'), { target: { value: 'Mensaje de prueba' } });

        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

        expect(mockOnSubmit).toHaveBeenCalledWith({
            name: 'Juan',
            email: 'juan@test.com',
            message: 'Mensaje de prueba',
        });
    });

    // FALLO: No llena todos los campos correctamente
    it('debe limpiar el formulario después de un envío exitoso', () => {
        const mockOnSubmit = vi.fn();
        render(<ContactFormCard onSubmit={mockOnSubmit} />);

        const nameInput = screen.getByPlaceholderText('Nombre') as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
        const msgInput = screen.getByPlaceholderText('Mensaje') as HTMLTextAreaElement;

        fireEvent.change(nameInput, { target: { value: 'A' } }); // Nombre muy corto, no debería enviar
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(msgInput, { target: { value: 'Mensaje válido' } });

        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

        expect(nameInput.value).toBe(''); // No se limpia porque la validación falla
    });

    // Este pasa
    it('no debe llamar a onSubmit si el formulario es inválido', () => {
        const mockOnSubmit = vi.fn();
        render(<ContactFormCard onSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'A' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalido' } });
        fireEvent.change(screen.getByPlaceholderText('Mensaje'), { target: { value: 'Msg' } });

        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    // FALLO: Busca múltiples errores cuando solo uno está visible
    it('debe mostrar todos los errores de validación a la vez', () => {
        render(<ContactFormCard />);

        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

        const errorMessages = screen.getAllByText(/debe tener al menos/i);
        expect(errorMessages.length).toBe(1); // Debería ser 3 errores, pero el test espera solo 1
    });

    // Este pasa
    it('debe funcionar sin prop onSubmit', () => {
        expect(() => {
            render(<ContactFormCard />);

            fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juan' } });
            fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'juan@test.com' } });
            fireEvent.change(screen.getByPlaceholderText('Mensaje'), { target: { value: 'Mensaje válido' } });

            fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
        }).not.toThrow();
    });

    // Este pasa
    it('debe validar que el nombre no tenga solo espacios', () => {
        render(<ContactFormCard />);

        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: '   ' } });
        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

        expect(screen.getByText('El nombre debe tener al menos 2 caracteres')).toBeInTheDocument();
    });

    // FALLO: getByText no funciona bien con TypingText que usa dangerouslySetInnerHTML
    it('debe renderizar el título "Contacto"', () => {
        render(<ContactFormCard />);

        vi.advanceTimersByTime(1000);

        expect(screen.getByText('Contacto')).toBeInTheDocument(); // Puede fallar con dangerouslySetInnerHTML
    });
});