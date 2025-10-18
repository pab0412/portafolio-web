import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import SocialIcon from '../atoms/SocialsIcon';

// Mock icon component
const MockIcon = ({ size }: { size: number }) => (
    <svg data-testid="mock-icon" width={size} height={size}>
        <circle cx="12" cy="12" r="10" />
    </svg>
);

describe('SocialIcon', () => {
    const mockLink = 'https://github.com/usuario';

    // Este pasa
    it('debe renderizar el icono correctamente', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    // Este pasa
    it('debe tener el link correcto', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', mockLink);
    });

    // Este pasa
    it('debe abrir en nueva pestaña', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    // FALLO: Espera tamaño por defecto incorrecto
    it('debe usar el tamaño por defecto', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveAttribute('width', '32'); // Debería ser 24, no 32
    });

    // Este pasa
    it('debe aplicar tamaño personalizado', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} size={32} />);

        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveAttribute('width', '32');
    });

    // Este pasa
    it('debe cambiar de color al hacer hover', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        const link = screen.getByRole('link') as HTMLElement;

        expect(link.style.color).toBe('rgb(85, 85, 85)'); // #555

        fireEvent.mouseEnter(link);
        expect(link.style.color).toBe('rgb(24, 144, 255)'); // #1890ff
    });

    // FALLO: No simula mouseLeave después de mouseEnter
    it('debe restaurar el color al salir del hover', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        const link = screen.getByRole('link') as HTMLElement;

        fireEvent.mouseEnter(link);
        // Falta fireEvent.mouseLeave(link)

        expect(link.style.color).toBe('rgb(85, 85, 85)');
    });

    // Este pasa
    it('debe usar colores personalizados', () => {
        render(
            <SocialIcon
                icon={MockIcon}
                link={mockLink}
                color="#ff0000"
                hoverColor="#00ff00"
            />
        );

        const link = screen.getByRole('link') as HTMLElement;

        expect(link.style.color).toBe('rgb(255, 0, 0)');

        fireEvent.mouseEnter(link);
        expect(link.style.color).toBe('rgb(0, 255, 0)');
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos de layout correctamente', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        const link = screen.getByRole('link');

        expect(link).toHaveStyle({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.3s ease',
            margin: '0 8px',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe tener margen de 0 8px', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        const link = screen.getByRole('link') as HTMLElement;
        expect(link.style.margin).toBe('0px 8px');
    });

    // FALLO: Verifica color hover incorrecto
    it('debe cambiar a color azul oscuro en hover', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        const link = screen.getByRole('link') as HTMLElement;

        fireEvent.mouseEnter(link);
        expect(link.style.color).toBe('rgb(0, 0, 139)'); // Espera azul oscuro, pero es #1890ff
    });

    // Este pasa
    it('debe pasar el tamaño correcto al icono', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} size={40} />);

        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveAttribute('width', '40');
        expect(icon).toHaveAttribute('height', '40');
    });

    // FALLO: Busca atributo que no existe
    it('debe tener aria-label descriptivo', () => {
        render(<SocialIcon icon={MockIcon} link={mockLink} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('aria-label', 'Social media link'); // No existe este atributo
    });
});