import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ProjectCard from './ProjectCard';

// Mock de CustomCard
vi.mock('../atoms/Card', () => ({
    default: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <div data-testid="custom-card" style={style}>
            {children}
        </div>
    ),
}));

// Mock de react-icons
vi.mock('react-icons/si', () => ({
    SiJavascript: () => <span data-testid="icon-javascript">JS</span>,
    SiTypescript: () => <span data-testid="icon-typescript">TS</span>,
    SiReact: () => <span data-testid="icon-react">React</span>,
    SiNodedotjs: () => <span data-testid="icon-node">Node</span>,
    SiHtml5: () => <span data-testid="icon-html">HTML</span>,
    SiCss3: () => <span data-testid="icon-css">CSS</span>,
    SiSpring: () => <span data-testid="icon-spring">Spring</span>,
}));

describe('ProjectCard', () => {
    const defaultProps = {
        title: 'Mi Proyecto',
        description: 'Esta es una descripción del proyecto',
        tecnologies: ['javascript', 'react'],
    };

    // Este pasa
    it('debe renderizar el título del proyecto', () => {
        render(<ProjectCard {...defaultProps} />);

        expect(screen.getByText('Mi Proyecto')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar la descripción del proyecto', () => {
        render(<ProjectCard {...defaultProps} />);

        expect(screen.getByText('Esta es una descripción del proyecto')).toBeInTheDocument();
    });

    // FALLO: Busca un link que no existe (no se pasó la prop link)
    it('debe renderizar el link del proyecto', () => {
        render(<ProjectCard {...defaultProps} />);

        expect(screen.getByText('Ver proyecto')).toBeInTheDocument(); // No existe porque no se pasó link
    });

    // Este pasa
    it('debe renderizar el link cuando se proporciona', () => {
        render(<ProjectCard {...defaultProps} link="https://example.com" />);

        const link = screen.getByText('Ver proyecto');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://example.com');
    });

    // Este pasa
    it('debe abrir el link en nueva pestaña', () => {
        render(<ProjectCard {...defaultProps} link="https://example.com" />);

        const link = screen.getByText('Ver proyecto');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    // FALLO: Espera cantidad incorrecta de iconos
    it('debe renderizar los iconos de tecnologías', () => {
        render(<ProjectCard {...defaultProps} tecnologies={['javascript', 'react', 'typescript']} />);

        expect(screen.getByTestId('icon-javascript')).toBeInTheDocument();
        expect(screen.getByTestId('icon-react')).toBeInTheDocument();
        expect(screen.queryByTestId('icon-node')).toBeInTheDocument(); // Node no está en las tecnologías
    });

    // Este pasa
    it('debe renderizar iconos de múltiples tecnologías', () => {
        render(<ProjectCard {...defaultProps} tecnologies={['javascript', 'typescript', 'react']} />);

        expect(screen.getByTestId('icon-javascript')).toBeInTheDocument();
        expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
        expect(screen.getByTestId('icon-react')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar el texto de la tecnología si no hay icono', () => {
        render(<ProjectCard {...defaultProps} tecnologies={['unknown']} />);

        expect(screen.getByText('unknown')).toBeInTheDocument();
    });

    // FALLO: Verifica minHeight incorrecto
    it('debe aplicar estilos correctos al CustomCard', () => {
        const { container } = render(<ProjectCard {...defaultProps} />);
        const card = container.querySelector('[data-testid="custom-card"]') as HTMLElement;

        expect(card.style.minHeight).toBe('300px'); // Debería ser 280px, no 300px
    });

    // Este pasa
    it('debe aplicar estilos personalizados', () => {
        const customStyle = { backgroundColor: 'red' };
        const { container } = render(<ProjectCard {...defaultProps} style={customStyle} />);
        const card = container.querySelector('[data-testid="custom-card"]') as HTMLElement;

        expect(card.style.backgroundColor).toBe('red');
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos del título', () => {
        render(<ProjectCard {...defaultProps} />);
        const title = screen.getByText('Mi Proyecto');

        expect(title).toHaveStyle({
            marginBottom: '10px',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            paddingBottom: '10px',
            color: '#1885F0',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe tener color correcto en el título', () => {
        render(<ProjectCard {...defaultProps} />);
        const title = screen.getByText('Mi Proyecto') as HTMLElement;

        expect(title.style.color).toBe('rgb(24, 133, 240)');
    });

    // FALLO: Espera WebkitLineClamp incorrecto
    it('debe aplicar truncamiento de texto en la descripción', () => {
        render(<ProjectCard {...defaultProps} />);
        const description = screen.getByText('Esta es una descripción del proyecto') as HTMLElement;

        expect(description.style.webkitLineClamp).toBe('3'); // Debería ser '4', no '3'
    });

    // Este pasa
    it('debe renderizar todos los iconos disponibles', () => {
        render(
            <ProjectCard
                {...defaultProps}
                tecnologies={['javascript', 'typescript', 'react', 'node', 'html', 'css', 'spring']}
            />
        );

        expect(screen.getByTestId('icon-javascript')).toBeInTheDocument();
        expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
        expect(screen.getByTestId('icon-react')).toBeInTheDocument();
        expect(screen.getByTestId('icon-node')).toBeInTheDocument();
        expect(screen.getByTestId('icon-html')).toBeInTheDocument();
        expect(screen.getByTestId('icon-css')).toBeInTheDocument();
        expect(screen.getByTestId('icon-spring')).toBeInTheDocument();
    });

    // FALLO: querySelector incorrecto
    it('debe tener display flex en el contenedor de iconos', () => {
        const { container } = render(<ProjectCard {...defaultProps} />);

        const iconsContainer = container.querySelector('h3') as HTMLElement; // Busca h3 en vez del div de iconos
        expect(iconsContainer?.style.display).toBe('flex');
    });
});