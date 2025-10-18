import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillIcon from './SkillIcon';
import { SiJavascript } from 'react-icons/si';

describe('SkillIcon', () => {
    it('debe renderizar el componente correctamente', () => {
        render(<SkillIcon name="JavaScript" icon={<SiJavascript data-testid="icon" />} />);

        // Verifica que el nombre se muestra
        expect(screen.getByText('JavaScript')).toBeInTheDocument();

        // Verifica que el ícono se muestra
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('debe tener el nombre correcto en el span', () => {
        render(<SkillIcon name="React" icon={<SiJavascript data-testid="icon" />} />);
        const nameElement = screen.getByText('React');
        expect(nameElement.tagName).toBe('SPAN');
        expect(nameElement).toHaveTextContent('React');
    });
});
