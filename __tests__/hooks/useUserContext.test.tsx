import React from 'react';
import { render } from '@testing-library/react';
import { UserProvider } from '@/context/user.context';
import { useUserContext } from '../../src/hooks/useUserContext';

// Un componente de prueba que usa el hook para que podamos probarlo
const TestComponent = () => {
  const userContext = useUserContext();
  return <div>{userContext.rolConText}</div>;
};

describe('useUserContext', () => {
  it('should throw an error if used outside UserProvider', () => {
    expect(() => render(<TestComponent />)).toThrow('User Context not available');
  });
  it('should not throw an error if used with UserProvider', () => {
    expect(() => render(<UserProvider><TestComponent /></UserProvider> )).not.toThrow('User Context not available');
  });
  
});

