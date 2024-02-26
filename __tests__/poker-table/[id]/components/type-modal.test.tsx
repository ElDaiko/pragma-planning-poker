window.setImmediate = window.setTimeout as any;

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TypeModal from "@/pages/poker-table/[id]/components/type-modal";
import { PartyProvider } from "@/context/party.context";
import { UserProvider } from "@/context/user.context";
import { usePartyContext } from "../../../../src/hooks/usePartyContext";
import { useUserContext } from "../../../../src/hooks/useUserContext";

// Mock para usePartyContext
jest.mock("../../../../src/hooks/usePartyContext");

// Mock para useUserContext
jest.mock("../../../../src/hooks/useUserContext");

describe("TypeModal", () => {
  const jestFnParty = jest.fn();
  const jestFnUser = jest.fn();

  beforeEach(() => {
    const mockParty = usePartyContext as jest.MockedFunction<typeof usePartyContext>;
    mockParty.mockReturnValue({
      socket: {
        emit: jestFnParty,
      },
    } as any);

    const mockUser = useUserContext as jest.MockedFunction<typeof useUserContext>;
    mockUser.mockImplementation(() => ({
      setRolConText: jestFnUser,
    }) as any);

    render(
      <PartyProvider>
        <UserProvider>
            <TypeModal onClose={jest.fn()} />
        </UserProvider>
      </PartyProvider>
    );
  });

  it("Should update user type to player", () => {
    fireEvent.click(screen.getByRole("mode-player"));

    expect(jestFnParty).toHaveBeenCalledWith("update-player", { type: "player" });
    expect(jestFnUser).toHaveBeenCalledWith("player");
  });

  it("Should update user type to spectator", () => {
    fireEvent.click(screen.getByRole("mode-spectator"));

    expect(jestFnParty).toHaveBeenCalledWith("update-player", { type: "spectador" });
    expect(jestFnUser).toHaveBeenCalledWith("spectador");
  });
});
 