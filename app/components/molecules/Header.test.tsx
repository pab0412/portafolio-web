import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';
import Header from './Header';

// Mock de react-router
const mockNavigate = vi.fn();
const mockLocation = { pathname: '/' };

vi.mock('react-router', () => ({
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
}));

// Mock de componentes
vi.mock('../atoms/Logo', () => ({
    default: ({ title }: { title: string }) => <div data-testid="logo">{title}</div>,
}));

vi.mock('../atoms/NavBarLinks', () => ({
    default: ({ onLinkClick }: { onLinkClick: (key: string) => void }) => (
        <div data-testid="navbar-links">
            <button onClick={() => onLinkClick('1')}>Sobre mi</button>
            <button onClick={() => onLinkClick('2')}>Proyectos</button>
            <button onClick={() => onLinkClick('3')}>Contacto</button>
        </div>
    ),
}));

describe('Header', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockLocation.pathname = '/';

        // Mock de getElementById y scrollIntoView
        document.getElementById = vi.fn((id) => ({
            scrollIntoView: vi.fn(),
        })) as any;

        // Mock de history.replaceState
        window.history.replaceState = vi.fn();
    });

    // Este pasa
    it('debe renderizar el componente Logo', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByTestId('logo')).toBeInTheDocument();
    });

    // FALLO: Busca título incorrecto
    it('debe renderizar el Logo con el título correcto', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText('PABO.dev')).toBeInTheDocument(); // Debería ser "¡Bienvenido!", no "PABO.dev"
    });

    // Este pasa
    it('debe renderizar NavBarLinks', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByTestId('navbar-links')).toBeInTheDocument();
    });

    // Este pasa
    it('debe llamar a handleScroll cuando se hace clic en "Sobre mi"', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Sobre mi'));

        expect(document.getElementById).toHaveBeenCalledWith('about');
    });

    // FALLO: Espera ID incorrecto
    it('debe hacer scroll al elemento "projects" al hacer clic en Proyectos', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Proyectos'));

        expect(document.getElementById).toHaveBeenCalledWith('portfolio'); // Debería ser 'projects', no 'portfolio'
    });

    // Este pasa
    it('debe hacer scroll al elemento "contact" al hacer clic en Contacto', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Contacto'));

        expect(document.getElementById).toHaveBeenCalledWith('contact');
    });

    // Este pasa
    it('debe llamar a navigate si el pathname es diferente', () => {
        mockLocation.pathname = '/other';

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Sobre mi'));

        expect(mockNavigate).toHaveBeenCalledWith('/#about', { replace: true });
    });

    // FALLO: Espera que se llame a navigate cuando no debería
    it('no debe llamar a navigate si ya está en el path correcto', () => {
        mockLocation.pathname = '/';

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Sobre mi'));

        expect(mockNavigate).toHaveBeenCalled(); // No debería llamar a navigate porque ya está en /
    });

    // Este pasa
    it('debe tener estilos de header fixed', () => {
        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const header = container.querySelector('header') as HTMLElement;

        expect(header.style.position).toBe('fixed');
        expect(header.style.top).toBe('0px');
        expect(header.style.zIndex).toBe('100');
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar todos los estilos del header', () => {
        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const header = container.querySelector('header');

        expect(header).toHaveStyle({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: 'black',
            position: 'fixed',
            width: '100%',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe tener el botón de menú con display none', () => {
        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const menuButton = screen.getByText('Menú');

        expect(menuButton).toHaveStyle({ display: 'none' });
    });

    // FALLO: Espera texto incorrecto después del toggle
    it('debe cambiar el texto del botón al hacer clic', () => {
        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const menuButton = screen.getByText('Menú');
        fireEvent.click(menuButton);

        expect(screen.getByText('Abrir')).toBeInTheDocument(); // Debería ser "Cerrar", no "Abrir"
    });

    // Este pasa
    it('debe tener backgroundColor black', () => {
        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const header = container.querySelector('header') as HTMLElement;
        expect(header.style.backgroundColor).toBe('black');
    });

    // FALLO: querySelector incorrecto
    it('debe tener borderBottom correcto', () => {
        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const header = container.querySelector('div') as HTMLElement; // Busca div en vez de header
        expect(header?.style.borderBottom).toBe('1px solid #ddd');
    });
});