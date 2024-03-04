window.setImmediate = window.setTimeout as any;

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableDisplay from "@/pages/poker-table/[id]/components/table-display";
import { PartyProvider } from "@/context/party.context";
import { usePartyContext } from "../../../../src/hooks/usePartyContext";
import { UserProvider } from "@/context/user.context";

const socketFn = jest.fn();

jest.mock("../../../../src/hooks/usePartyContext");

describe("TableDisplay", () => {
    afterEach(() => {
        // Limpiar mocks después de cada prueba
        jest.clearAllMocks();
      });
  it("Should reveal cards when button is clicked, and show `Nueva votación`", () => {
    const mock = usePartyContext as jest.MockedFunction<typeof usePartyContext>;
    mock.mockReturnValue({
      playersList: [
        {
          socketID: "socket",
          _id: "id",
          username: "pepe",
          type: "player",
          roomID: "Este es mi rommID",
        },
        {
          socketID: "socket2",
          _id: "id2",
          vote: "0",
          username: "pepe2",
          type: "spectador",
          roomID: "Este es mi rommID",
        },
        {
          socketID: "socket3",
          _id: "Este es mi id3",
          vote: "0",
          username: "pepe3",
          type: "player",
          roomID: "Este es mi rommID",
        },
      ],
      invitationBlur: false,
      allNonSpectatorVoted: true,
      owners: ["socket", "pepe2"],
      isOwner: true,
      socket: {
        emit: socketFn,
      },
    } as any);

    render(
      <PartyProvider>
        <UserProvider>
          <TableDisplay />
        </UserProvider>
      </PartyProvider>
    );

  fireEvent.click(screen.getByText("Revelar Cartas"));
  expect(socketFn).toHaveBeenCalledTimes(1)
  expect(socketFn).toHaveBeenCalledWith("reveal-cards");
  
  fireEvent.click(screen.getByText("Nueva votación"));
  expect(socketFn).toHaveBeenCalledWith("reset-classroom");
  expect(socketFn).toHaveBeenCalledTimes(2)

  });
  it("Should not render `revelar cartas`", async () => {
    const mock = usePartyContext as jest.MockedFunction<typeof usePartyContext>;
    mock.mockReturnValue({
      playersList: [
        {
          socketID: "socket",
          _id: "id",
          username: "pepe",
          type: "player",
          roomID: "Este es mi rommID",
        },
        {
          socketID: "socket2",
          _id: "id2",
          vote: "0",
          username: "pepe2",
          type: "spectador",
          roomID: "Este es mi rommID",
        },
        {
          socketID: "socket3",
          _id: "Este es mi id3",
          vote: "0",
          username: "pepe3",
          type: "player",
          roomID: "Este es mi rommID",
        },
      ],
      invitationBlur: false,
      allNonSpectatorVoted: true,
      owners: ["socket", "pepe2"],
      isOwner: false,
      socket: {
        emit: socketFn,
      },
    } as any);

    render(
      <PartyProvider>
        <UserProvider>
          <TableDisplay />
        </UserProvider>
      </PartyProvider>
    );

    await waitFor(() => {
        expect(screen.queryByText("Revelar Cartas")).not.toBeInTheDocument();
        expect(socketFn).not.toHaveBeenCalled();
        expect(screen.queryByText("Nueva votación")).not.toBeInTheDocument();
      });
  });
});
