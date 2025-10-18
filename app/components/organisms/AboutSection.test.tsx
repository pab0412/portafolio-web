import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import AboutSection from './AboutSection';

// Mock de CustomCard
vi.mock('../atoms/Card', () => ({
    default: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <div data-testid="custom-card" style={style}>
            {children}
        </div>
    ),
}));

// Mock de ProfileIcon
vi.mock('../atoms/ProfileIcon', () => ({
    default: ({ imageUrl, size }: { imageUrl: string; size: number }) => (
        <img data-testid="profile-icon" src={imageUrl} width={size} height={size} alt="profile" />
    ),
}));

// Mock de SkillsList
vi.mock('../molecules/SkillsList', () => ({
    default: () => <div data-testid="skills-list">Skills List</div>,
}));

// Mock de TypingText
vi.mock('../atoms/TypingText', () => ({
    default: ({ text }: { text: string }) => (
        <span data-testid="typing-text" dangerouslySetInnerHTML={{ __html: text }} />
    ),
}));

describe('AboutSection', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    // Este pasa
    it('debe renderizar el componente CustomCard', () => {
        render(<AboutSection />);

        expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar el ProfileIcon', () => {
        render(<AboutSection />);

        expect(screen.getByTestId('profile-icon')).toBeInTheDocument();
    });

    // FALLO: Verifica tamaño incorrecto del ProfileIcon
    it('debe renderizar ProfileIcon con tamaño 200', () => {
        render(<AboutSection />);

        const profileIcon = screen.getByTestId('profile-icon');
        expect(profileIcon).toHaveAttribute('width', '150'); // Debería ser 200, no 150
    });

    // Este pasa
    it('debe renderizar el apodo "pab0412"', () => {
        render(<AboutSection />);

        expect(screen.getByText(/Apodo: pab0412/i)).toBeInTheDocument();
    });

    // Este pasa
    it('debe renderizar SkillsList', () => {
        render(<AboutSection />);

        expect(screen.getByTestId('skills-list')).toBeInTheDocument();
    });

    // FALLO: Busca texto que no existe
    it('debe mostrar el nombre completo en el título', () => {
        render(<AboutSection />);

        expect(screen.getByText(/Mi nombre es Pablo Sepúlveda/i)).toBeInTheDocument(); // Este texto no existe
    });

    // Este pasa
    it('debe renderizar dos componentes TypingText', () => {
        render(<AboutSection />);

        const typingTexts = screen.getAllByTestId('typing-text');
        expect(typingTexts.length).toBe(2);
    });

    // Este pasa
    it('debe contener el texto sobre Pablo Sepúlveda', () => {
        const { container } = render(<AboutSection />);

        expect(container.textContent).toContain('Pablo Sepúlveda');
    });

    // FALLO: toHaveStyle con múltiples propiedades puede ser inconsistente
    it('debe aplicar estilos correctos al CustomCard', () => {
        render(<AboutSection />);

        const card = screen.getByTestId('custom-card');

        expect(card).toHaveStyle({
            maxWidth: '1200px',
            width: '90%',
            margin: '0 auto',
            padding: '40px 50px',
        }); // toHaveStyle con múltiples props puede fallar
    });

    // Este pasa
    it('debe tener maxWidth de 1200px en el CustomCard', () => {
        render(<AboutSection />);

        const card = screen.getByTestId('custom-card') as HTMLElement;
        expect(card.style.maxWidth).toBe('1200px');
    });

    // FALLO: Verifica fontSize incorrecto del h2
    it('debe aplicar fontSize correcto al título del apodo', () => {
        render(<AboutSection />);

        const heading = screen.getByText(/Apodo: pab0412/i) as HTMLElement;
        expect(heading.style.fontSize).toBe('24px'); // Debería ser 30px, no 24px
    });

    // Este pasa
    it('debe tener fontWeight bold en el título', () => {
        render(<AboutSection />);

        const heading = screen.getByText(/Apodo: pab0412/i) as HTMLElement;
        expect(heading.style.fontWeight).toBe('bold');
    });

    // Este pasa
    it('debe renderizar un h2 para el apodo', () => {
        render(<AboutSection />);

        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Apodo: pab0412');
    });

    // FALLO: querySelector incorrecto
    it('debe tener display flex en el contenedor principal', () => {
        const { container } = render(<AboutSection />);

        const mainDiv = container.querySelector('h2') as HTMLElement; // Busca h2 en vez del div flex
        expect(mainDiv?.style.display).toBe('flex');
    });

    // Este pasa
    it('debe contener texto sobre DuocUC', () => {
        const { container } = render(<AboutSection />);

        expect(container.textContent).toContain('DuocUC');
    });

    // FALLO: Verifica gap incorrecto
    it('debe tener gap de 60px en el contenedor flex', () => {
        const { container } = render(<AboutSection />);

        const flexContainer = container.querySelector('[style*="display: flex"]') as HTMLElement;
        expect(flexContainer?.style.gap).toBe('40px'); // Debería ser 60px, no 40px
    });

    // Este pasa
    it('debe contener el texto sobre lenguajes de programación', () => {
        const { container } = render(<AboutSection />);

        expect(container.textContent).toContain('Lenguajes de programación');
    });
});