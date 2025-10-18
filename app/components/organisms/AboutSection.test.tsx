import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutSection from './AboutSection';

// Mocks de los componentes internos
vi.mock('../atoms/ProfileIcon', () => ({
    default: ({ imageUrl, size }: any) => (
        <div data-testid="profile-icon">{`ProfileIcon ${size}`}</div>
    ),
}));

vi.mock('../molecules/SkillsList', () => ({
    default: () => <div data-testid="skills-list">SkillsList</div>,
}));

vi.mock('../atoms/TypingText', () => ({
    default: ({ text }: any) => <span data-testid="typing-text">{text}</span>,
}));

describe('AboutSection', () => {
    it('debe renderizar la sección', () => {
        const { container } = render(<AboutSection />);
        const card = container.querySelector('div'); // el CustomCard
        expect(card).toBeInTheDocument();
    });

    it('debe renderizar ProfileIcon', () => {
        render(<AboutSection />);
        const icon = screen.getByTestId('profile-icon');
        expect(icon).toBeInTheDocument();
    });

    it('debe renderizar SkillsList', () => {
        render(<AboutSection />);
        const skills = screen.getByTestId('skills-list');
        expect(skills).toBeInTheDocument();
    });

    it('debe renderizar el texto de TypingText', () => {
        render(<AboutSection />);
        const typingTexts = screen.getAllByTestId('typing-text');
        expect(typingTexts.length).toBe(2); // aboutText + text_programs
        expect(typingTexts[0]).toHaveTextContent(/¡Hola! Soy/);
        expect(typingTexts[1]).toHaveTextContent(/Lenguajes de programación/i);
    });
});
