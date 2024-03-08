window.setImmediate = window.setTimeout as any;

import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { PartyProvider } from '@/context/party.context';
import { UserProvider } from '@/context/user.context';
import { usePartyContext } from '../../../../src/hooks/usePartyContext';
import { useUserContext } from '../../../../src/hooks/useUserContext';
import UserForm from '@/pages/poker-table/[id]/components/user-form';

jest.mock('../../../../src/hooks/usePartyContext');
jest.mock('../../../../src/hooks/useUserContext');

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      query: { id: 'mocked-id' },
    })),
  }
));
  

const jestFn = jest.fn();
const jestFn2 = jest.fn();
const socketFn = jest.fn();


describe('UserForm', () => {
    beforeEach(() => {
      const mockParty = usePartyContext as jest.MockedFunction<typeof usePartyContext>;
      mockParty.mockReturnValue({
        socket: {
          emit: socketFn,
        },
      } as any);
  
      const mockUser = useUserContext as jest.MockedFunction<typeof useUserContext>;
      mockUser.mockImplementation(() => ({
        setUsernameContext: jestFn,
        setRolConText: jestFn2,
      }) as any);
  
      render(
        <PartyProvider>
          <UserProvider>
            <UserForm />
          </UserProvider>
        </PartyProvider>
      );
    })
    it('Should render', () => {        
      expect(screen.getByText('Crear Partida')).toBeInTheDocument();
    });
    it('should handle form submission', async () => {
        fireEvent.input(screen.getByRole('userNameInput'), { target: { value: 'pepe1' } });
        fireEvent.click(screen.getByRole('player'));
        fireEvent.submit(screen.getByRole('create'));
        // Espera a que las llamadas a las funciones mockeadas se resuelvan
        await waitFor(() => {
            // Asegúrate de que handleCreateParty se haya llamado con los argumentos esperados
            expect(socketFn).toHaveBeenCalledTimes(1)
            expect(socketFn).toHaveBeenCalledWith('join-classroom', {
                username: 'pepe1',
                type: 'player',
                roomID: 'mocked-id',
            });
            expect(jestFn).toHaveBeenCalledTimes(1)
            expect(jestFn2).toHaveBeenCalledTimes(1)        
        });
    });
  });
  

