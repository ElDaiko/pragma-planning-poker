window.setImmediate = window.setTimeout as any;

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/pages/poker-table/[id]/components/footer";
import { PartyProvider } from "@/context/party.context";
import { UserProvider } from "@/context/user.context";
import { usePartyContext } from "../../../../src/hooks/usePartyContext";
import { useUserContext } from "../../../../src/hooks/useUserContext";

jest.mock("../../../../src/hooks/usePartyContext");
jest.mock("../../../../src/hooks/useUserContext");

const jestFn = jest.fn();
const socketFn = jest.fn();

describe("Footer", () => {
  it("Should render voting options for players", () => {
    const mockParty = usePartyContext as jest.MockedFunction<typeof usePartyContext>;
    mockParty.mockReturnValue({
      rolConText: "player",
      revealCards: false,
      allNonSpectatorVoted: false,
      amountOfVotes: null,
      averageVotes: null,
      socket: {
        emit: socketFn,
      },
      contextCard: "1",
      setContextCard: jestFn,
      globalTypeOfScores: "power-of-two",
    } as any);

    const mockUser = useUserContext as jest.MockedFunction<typeof useUserContext>;
    mockUser.mockImplementation(() => ({
      rolConText: "player",
    })as any );

    render(
      <PartyProvider>
        <UserProvider>
          <Footer />
        </UserProvider>
      </PartyProvider>
    );

    expect(screen.getByText("Elige una carta 👇")).toBeInTheDocument();

    fireEvent.click(screen.getByText("1"));
    expect(jestFn).toHaveBeenCalled()
    expect(socketFn).toHaveBeenCalled();

  });

  it("Should render voting results for players when all voted", () => {
    const mockParty = usePartyContext as jest.MockedFunction<typeof usePartyContext>;
    mockParty.mockReturnValue({
        rolConText: "player",
        revealCards: true,
        allNonSpectatorVoted: true,
        amountOfVotes: [
          { label: "1", times: 2 },
          { label: "2", times: 1 },
        ],
        averageVotes: 1.33,
        socket: {
          emit: jestFn,
        },
        contextCard: null,
        setContextCard: jestFn,
        globalTypeOfScores: "power-of-two",
    } as any);

    const mockUser = useUserContext as jest.MockedFunction<typeof useUserContext>;
    mockUser.mockImplementation(() => ({
      rolConText: "player",
    })as any );

    render(
      <PartyProvider>
        <UserProvider>
          <Footer />
        </UserProvider>
      </PartyProvider>
    );

    expect(screen.getByText("1 voto")).toBeInTheDocument();
    expect(screen.getByText("2 votos")).toBeInTheDocument();
    expect(screen.getByText("1.33")).toBeInTheDocument();
  });

});