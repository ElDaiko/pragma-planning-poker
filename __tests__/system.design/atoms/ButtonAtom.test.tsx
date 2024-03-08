import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonAtom from '@/system-design/atoms/button';

// Realiza las pruebas
describe('ButtonAtom', () => {
  it('renders without crashing', () => {
    render(<ButtonAtom />);
    // Verifica que el componente se renderice sin errores
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ButtonAtom className="custom-class" />);
    // Verifica que el className personalizado se aplique correctamente
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('applies additional props', () => {
    render(<ButtonAtom data-testid="custom-testid" />);
    // Verifica que las propiedades adicionales se apliquen correctamente
    expect(screen.getByTestId('custom-testid')).toBeInTheDocument();
  });
});