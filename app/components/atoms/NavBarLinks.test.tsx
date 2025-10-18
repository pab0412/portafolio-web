import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import NavBarLinks from './NavBarLinks';

describe('NavBarLinks', () => {

    // Este pasa
    it('debe renderizar los tres enlaces del menú', () => {
        render(<NavBarLinks />);

        expect(screen.getByText('Sobre mi')).toBeInTheDocument();
        expect(screen.getByText('Proyectos')).toBeInTheDocument();
        expect(screen.getByText('Contacto')).toBeInTheDocument();
    });

    // Este pasa
    it('debe llamar a onLinkClick cuando se hace clic en un enlace', () => {
        const mockOnClick = vi.fn();
        render(<NavBarLinks onLinkClick={mockOnClick} />);

        const sobreMi = screen.getByText('Sobre mi');
        fireEvent.click(sobreMi);

        expect(mockOnClick).toHaveBeenCalledWith('1');
    });

    // Este pasa
    it('debe llamar a onLinkClick con la key correcta para cada enlace', () => {
        const mockOnClick = vi.fn();
        render(<NavBarLinks onLinkClick={mockOnClick} />);

        fireEvent.click(screen.getByText('Proyectos'));
        expect(mockOnClick).toHaveBeenCalledWith('2');

        fireEvent.click(screen.getByText('Contacto'));
        expect(mockOnClick).toHaveBeenCalledWith('3');
    });

    // FALLO: onLinkClick es opcional, no debería fallar si no se proporciona
    it('debe funcionar sin onLinkClick', () => {
        expect(() => {
            render(<NavBarLinks />);
            fireEvent.click(screen.getByText('Sobre mi'));
        }).not.toThrow();
    });

    // FALLO: Busca un enlace que no existe
    it('debe renderizar el enlace de Blog', () => {
        render(<NavBarLinks />);

        expect(screen.getByText('Blog')).toBeInTheDocument(); // No existe "Blog"
    });

    // Este pasa
    it('debe renderizar exactamente 3 items en el menú', () => {
        const { container } = render(<NavBarLinks />);

        const menuItems = container.querySelectorAll('.ant-menu-item');
        expect(menuItems.length).toBe(3);
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos personalizados al menú', () => {
        const { container } = render(<NavBarLinks />);
        const menu = container.querySelector('.ant-menu');

        expect(menu).toHaveStyle({
            backgroundColor: 'transparent',
            color: 'white',
            borderBottom: 'none',
            fontWeight: 'bold',
        }); // toHaveStyle con múltiples props puede fallar con Ant Design
    });

    // Este pasa
    it('debe tener selectedKeys vacío', () => {
        const { container } = render(<NavBarLinks />);
        const selectedItems = container.querySelectorAll('.ant-menu-item-selected');

        expect(selectedItems.length).toBe(0);
    });

    // FALLO: Verifica que se llama con la key incorrecta
    it('debe llamar a onLinkClick con key "4" al hacer clic en Sobre mi', () => {
        const mockOnClick = vi.fn();
        render(<NavBarLinks onLinkClick={mockOnClick} />);

        fireEvent.click(screen.getByText('Sobre mi'));

        expect(mockOnClick).toHaveBeenCalledWith('4'); // Debería ser '1', no '4'
    });

    // Este pasa
    it('debe renderizar un menú en modo horizontal', () => {
        const { container } = render(<NavBarLinks />);
        const menu = container.querySelector('.ant-menu-horizontal');

        expect(menu).toBeInTheDocument();
    });

    // FALLO: querySelector incorrecto para buscar estilos
    it('debe tener background transparente', () => {
        const { container } = render(<NavBarLinks />);
        const menu = container.querySelector('.ant-menu-item') as HTMLElement; // Busca item en vez de menu

        expect(menu?.style.backgroundColor).toBe('transparent');
    });
});