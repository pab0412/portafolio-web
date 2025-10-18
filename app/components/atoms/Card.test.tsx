import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import CustomCard from './Card';

describe('CustomCard', () => {

    // Este pasa
    it('debe renderizar el contenido children', () => {
        render(<CustomCard>Test Content</CustomCard>);

        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    // Este pasa
    it('debe usar el width por defecto de 80%', () => {
        const { container } = render(<CustomCard>Content</CustomCard>);
        const card = container.querySelector('.ant-card') as HTMLElement;

        expect(card.style.width).toBe('80%');
    });

    // FALLO: Espera maxWidth por defecto incorrecto
    it('debe usar el maxWidth por defecto', () => {
        const { container } = render(<CustomCard>Content</CustomCard>);
        const card = container.querySelector('.ant-card') as HTMLElement;

        expect(card.style.maxWidth).toBe('1000px'); // Debería ser 800px, no 1000px
    });

    // Este pasa
    it('debe aplicar width y maxWidth personalizados', () => {
        const { container } = render(
            <CustomCard width="90%" maxWidth="1200px">Content</CustomCard>
        );
        const card = container.querySelector('.ant-card') as HTMLElement;

        expect(card.style.width).toBe('90%');
        expect(card.style.maxWidth).toBe('1200px');
    });

    // Este pasa
    it('debe tener animación float por defecto', () => {
        const { container } = render(<CustomCard>Content</CustomCard>);
        const card = container.querySelector('.ant-card') as HTMLElement;

        expect(card.style.animation).toContain('float');
    });

    // FALLO: Verifica animación cuando float es false
    it('debe desactivar la animación cuando float es false', () => {
        const { container } = render(<CustomCard float={false}>Content</CustomCard>);
        const card = container.querySelector('.ant-card') as HTMLElement;

        expect(card.style.animation).toBe('float 6s ease-in-out infinite'); // Debería ser 'none'
    });

    // Este pasa
    it('debe llamar a onMouseEnter cuando se hace hover', () => {
        const mockOnMouseEnter = vi.fn();
        const { container } = render(
            <CustomCard onMouseEnter={mockOnMouseEnter}>Content</CustomCard>
        );
        const card = container.querySelector('.ant-card') as HTMLElement;

        fireEvent.mouseEnter(card);
        expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
    });

    // Este pasa
    it('debe llamar a onMouseLeave cuando sale del hover', () => {
        const mockOnMouseLeave = vi.fn();
        const { container } = render(
            <CustomCard onMouseLeave={mockOnMouseLeave}>Content</CustomCard>
        );
        const card = container.querySelector('.ant-card') as HTMLElement;

        fireEvent.mouseLeave(card);
        expect(mockOnMouseLeave).toHaveBeenCalledTimes(1);
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos por defecto correctamente', () => {
        const { container } = render(<CustomCard>Content</CustomCard>);
        const card = container.querySelector('.ant-card');

        expect(card).toHaveStyle({
            margin: '40px auto',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center',
            padding: '30px',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe aplicar estilos personalizados', () => {
        const customStyle = { backgroundColor: 'red', color: 'white' };
        const { container } = render(
            <CustomCard style={customStyle}>Content</CustomCard>
        );
        const card = container.querySelector('.ant-card') as HTMLElement;

        expect(card.style.backgroundColor).toBe('red');
        expect(card.style.color).toBe('white');
    });

    // FALLO: Verifica margen incorrecto
    it('debe tener margen correcto', () => {
        const { container } = render(<CustomCard>Content</CustomCard>);
        const card = container.querySelector('.ant-card') as HTMLElement;

        expect(card.style.margin).toBe('20px auto'); // Debería ser '40px auto', no '20px auto'
    });

    // Este pasa
    it('debe tener borderRadius de 20px', () => {
        const { container } = render(<CustomCard>Content</CustomCard>);
        const card = container.querySelector('.ant-card') as HTMLElement;

        expect(card.style.borderRadius).toBe('20px');
    });

    // FALLO: querySelector incorrecto
    it('debe tener textAlign center', () => {
        const { container } = render(<CustomCard>Content</CustomCard>);
        const card = container.querySelector('.ant-card-body') as HTMLElement; // Busca en body, no en card

        expect(card?.style.textAlign).toBe('center');
    });

    // Este pasa
    it('debe renderizar con width numérico', () => {
        const { container } = render(<CustomCard width={500}>Content</CustomCard>);
        const card = container.querySelector('.ant-card') as HTMLElement;

        expect(card.style.width).toBe('500px');
    });

    // Este pasa
    it('debe funcionar sin handlers de eventos', () => {
        expect(() => {
            const { container } = render(<CustomCard>Content</CustomCard>);
            const card = container.querySelector('.ant-card') as HTMLElement;
            fireEvent.mouseEnter(card);
            fireEvent.mouseLeave(card);
        }).not.toThrow();
    });
});