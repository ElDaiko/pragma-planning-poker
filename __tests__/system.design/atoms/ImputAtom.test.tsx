import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputAtom from '@/system-design/atoms/input';

// Realiza las pruebas
describe('InputAtom', () => {
  it('renders without crashing', () => {
    render(<InputAtom id="test-id" />);
    // Verifica que el componente se renderice sin errores
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<InputAtom id="test-id" className="custom-class" />);
    // Verifica que el className personalizado se aplique correctamente
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('applies additional props', () => {
    render(<InputAtom id="test-id" data-testid="custom-testid" />);
    // Verifica que las propiedades adicionales se apliquen correctamente
    expect(screen.getByTestId('custom-testid')).toBeInTheDocument();
  });
});