import React from 'react';
import { render } from '@testing-library/react';
import { PartyProvider } from '@/context/party.context'; 
import { usePartyContext } from '../../src/hooks/usePartyContext';

const TestComponent = () => {
  const userContext = usePartyContext();
  return <div>{userContext.isOwner}</div>;
};

describe('useUserContext', () => {
  it('should throw an error if used outside UserProvider', () => {
    expect(() => render(<TestComponent />)).toThrow('Party Context not available');
  });
  it('should not throw an error if used with UserProvider', () => {
    expect(() => render(<PartyProvider><TestComponent /></PartyProvider> )).not.toThrow('User Context not available');
  });
});