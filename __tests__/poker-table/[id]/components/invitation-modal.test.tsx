window.setImmediate = window.setTimeout as any;

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InvitationModal from "@/pages/poker-table/[id]/components/invitation-modal";
import { PartyProvider } from "@/context/party.context";
import { usePartyContext } from "../../../../src/hooks/usePartyContext";

jest.mock("../../../../src/hooks/usePartyContext");

// Mock para navigator.clipboard
const mockClipboardWriteText = jest.fn();

beforeAll(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: mockClipboardWriteText,
    },
  });
});

describe("InvitationModal", () => {
  const jestFn = jest.fn();

  beforeEach(() => {
    const mock = usePartyContext as jest.MockedFunction<typeof usePartyContext>;
    mock.mockReturnValue({
      setInvitationBlur: jestFn,
    } as any);

    render(
      <PartyProvider>
        <InvitationModal />
      </PartyProvider>
    );
  });

  it("Should render url", () => {
  // Verifica que el elemento esté presente en la pantalla
    expect(screen.getByRole('url')).toBeInTheDocument();
  })

  it("Should call setInvitationBlur on 'X' click", () => {
    fireEvent.click(screen.getByRole('blurClick'));
    expect(jestFn).toHaveBeenCalledWith(false);
  });
 
  it("Should copy link on click", async () => {
    fireEvent.click(screen.getByRole('clipClick'));
    await Promise.resolve();
    expect(mockClipboardWriteText).toHaveBeenCalledWith(window.location.href);
  });
});

