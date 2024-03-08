window.setImmediate = window.setTimeout as any;

import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Index from "@/pages/poker-table/[id]";
import { usePartyContext } from "../../../src/hooks/usePartyContext";
import { PartyProvider } from "@/context/party.context";
import { UserProvider } from "@/context/user.context";

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: { id: 'mocked-id' },
  })),
}));

const socketFn = jest.fn();

jest.mock("../../../src/hooks/usePartyContext", () => ({
  usePartyContext: jest.fn(function () {
    return {
      playersList: [],
      setPlayersList: socketFn,
      socket: {
        on: socketFn,
        emit: socketFn,
      } as any,
      classroomName: null,
      setClassroomName: socketFn,
      isOwner: false,
      setOwners: socketFn,
      owners: [],
      globalTypeOfScores: "fibonacci", // Ajusta según tu caso
      setGlobalTypeOfScores: socketFn,
      averageVotes: null,
      setAverageVotes: socketFn,
      amountOfVotes: null,
      setAmountOfVotes: socketFn,
      revealCards: false,
      setRevealCards: socketFn,
      allNonSpectatorVoted: false,
      contextCard: null,
      setContextCard: socketFn,
      invitationBlur: false,
      setInvitationBlur: socketFn,
    };
  }),
}));

describe("Index component", () => {
    it('Should call socket.on when Index is rendered', async () => {
        render(
          <UserProvider>
            <PartyProvider>
              <Index />
            </PartyProvider>
          </UserProvider>
        );
    
        await waitFor(() => {
            expect(socketFn).toHaveBeenCalled()
          });
    });
});

