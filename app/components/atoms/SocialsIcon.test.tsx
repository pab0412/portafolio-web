import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SocialIcon from './SocialsIcon';
import { FaGithub } from 'react-icons/fa';

describe('SocialIcon', () => {
    it('debe renderizar el ícono y el link correcto', () => {
        render(<SocialIcon icon={FaGithub} link="https://github.com/pab0412" />);

        const linkElement = screen.getByRole('link', { name: /github/i });
        expect(linkElement).toHaveAttribute('href', 'https://github.com/pab0412');
    });

    it('debe aplicar tamaño y color por defecto', () => {
        render(<SocialIcon icon={FaGithub} link="https://github.com/pab0412" />);
        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveStyle({ fontSize: '24px', color: '#555' });
    });

    it('debe cambiar color al hacer hover', () => {
        render(<SocialIcon icon={FaGithub} link="https://github.com/pab0412" hoverColor="#1890ff" />);

        const linkElement = screen.getByRole('link');
        // Hover
        fireEvent.mouseEnter(linkElement);
        expect(linkElement).toHaveStyle({ color: '#1890ff' });

        // Mouse leave
        fireEvent.mouseLeave(linkElement);
        expect(linkElement).toHaveStyle({ color: '#555' });
    });

    it('debe pasar el tamaño correcto al ícono', () => {
        render(<SocialIcon icon={FaGithub} link="https://github.com/pab0412" size={32} />);
        const iconElement = screen.getByRole('link').firstChild as HTMLElement;
        expect(iconElement).toHaveAttribute('size', '32');
    });
});
