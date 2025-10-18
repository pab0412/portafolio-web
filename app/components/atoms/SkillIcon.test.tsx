import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillIcon from './SkillIcon';

describe('SkillIcon', () => {
    const mockIcon = <svg data-testid="mock-icon">Icon</svg>;
    const skillName = 'React';

    it('debe renderizar correctamente el componente', () => {
        render(<SkillIcon name={skillName} icon={mockIcon} />);

        expect(screen.getByText(skillName)).toBeInTheDocument();
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('debe mostrar el nombre de la habilidad', () => {
        render(<SkillIcon name="JavaScript" icon={mockIcon} />);

        expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    it('debe renderizar el icono proporcionado', () => {
        const customIcon = <div data-testid="custom-icon">Custom</div>;
        render(<SkillIcon name={skillName} icon={customIcon} />);

        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('debe aplicar los estilos correctos al contenedor', () => {
        const { container } = render(<SkillIcon name={skillName} icon={mockIcon} />);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper).toHaveStyle({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            cursor: 'default',
        });
    });

    it('debe renderizar el contenedor del icono con la clase o estructura correcta', () => {
        const { container } = render(<SkillIcon name={skillName} icon={mockIcon} />);

        // Verifica que existe la estructura esperada
        const mainDiv = container.firstChild as HTMLElement;
        const iconDiv = mainDiv.firstChild as HTMLElement;

        expect(iconDiv).toBeInTheDocument();
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('debe aplicar los estilos correctos al nombre', () => {
            render(<SkillIcon name={skillName} icon={mockIcon} />);
            const nameElement = screen.getByText(skillName);

            expect(nameElement).toHaveStyle({
                fontSize: '14px',
                fontWeight: '500',
            });
    });

    it('debe renderizar el span del nombre aunque esté vacío', () => {
        const { container } = render(<SkillIcon name="" icon={mockIcon} />);

        const spans = container.querySelectorAll('span');

        // Verifica que existe el span (aunque vacío)
        expect(spans.length).toBeGreaterThan(0);
    });

    it('debe manejar diferentes tipos de iconos', () => {
        const stringIcon = 'React Icon';
        render(<SkillIcon name={skillName} icon={stringIcon} />);

        expect(screen.getByText(stringIcon)).toBeInTheDocument();
    });
});