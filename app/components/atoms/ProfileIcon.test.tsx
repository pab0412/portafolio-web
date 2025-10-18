import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileIcon from './ProfileIcon';

describe('ProfileIcon', () => {
    const mockImageUrl = 'https://example.com/profile.jpg';

    //  PASA
    it('debe renderizar la imagen con la URL proporcionada', () => {
        render(<ProfileIcon imageUrl={mockImageUrl} />);

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', mockImageUrl);
    });

    // Este pasa
    it('debe usar el alt text por defecto si no se proporciona', () => {
        render(<ProfileIcon imageUrl={mockImageUrl} />);

        const image = screen.getByAltText('Foto de perfil');
        expect(image).toBeInTheDocument();
    });

    //  Este pasa
    it('debe usar el alt text personalizado cuando se proporciona', () => {
        render(<ProfileIcon imageUrl={mockImageUrl} alt="Mi foto" />);

        const image = screen.getByAltText('Mi foto');
        expect(image).toBeInTheDocument();
    });

    // FALLA
    it('debe aplicar el tamaño personalizado', () => {
        const { container } = render(<ProfileIcon imageUrl={mockImageUrl} size={150} />);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper.style.width).toBe('200px'); //
        expect(wrapper.style.height).toBe('200px');
    });

    //  PASA
    it('debe usar el tamaño por defecto de 100px', () => {
        const { container } = render(<ProfileIcon imageUrl={mockImageUrl} />);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper.style.width).toBe('100px');
        expect(wrapper.style.height).toBe('100px');
    });

    // FALLA
    it('debe cambiar el transform al hacer hover', () => {
        const { container } = render(<ProfileIcon imageUrl={mockImageUrl} />);
        const wrapper = container.firstChild as HTMLElement;

        fireEvent.mouseEnter(wrapper);

        expect(wrapper.style.transform).toBe('scale(1.5)'); //  Debería ser scale(1.1), no 1.5
    });

    // Este pasa
    it('debe restaurar el transform al salir del hover', () => {
        const { container } = render(<ProfileIcon imageUrl={mockImageUrl} />);
        const wrapper = container.firstChild as HTMLElement;

        fireEvent.mouseEnter(wrapper);
        fireEvent.mouseLeave(wrapper);

        expect(wrapper.style.transform).toBe('scale(1)');
    });

    // FALLO: toHaveStyle puede ser inconsistente con múltiples propiedades
    it('debe aplicar estilos del contenedor', () => {
        const { container } = render(<ProfileIcon imageUrl={mockImageUrl} />);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper).toHaveStyle({
            borderRadius: '50%',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
        }); // toHaveStyle con múltiples propiedades puede fallar
    });

    // Este pasa
    it('debe tener cursor pointer', () => {
        const { container } = render(<ProfileIcon imageUrl={mockImageUrl} />);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper.style.cursor).toBe('pointer');
    });

    //  FALLO: Verifica el color incorrecto
    it('debe cambiar el borderColor al hacer hover', () => {
        const { container } = render(<ProfileIcon imageUrl={mockImageUrl} />);
        const wrapper = container.firstChild as HTMLElement;

        fireEvent.mouseEnter(wrapper);

        expect(wrapper.style.borderColor).toBe('#ff0000'); // Debería ser #40a9ff
    });
});