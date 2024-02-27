window.setImmediate = window.setTimeout as any;

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/pages/poker-table/[id]/components/header";
import { PartyProvider } from "@/context/party.context";
import { UserProvider } from "@/context/user.context";
import { usePartyContext } from "../../../../src/hooks/usePartyContext";
import { useUserContext } from "../../../../src/hooks/useUserContext";

jest.mock("../../../../src/hooks/usePartyContext");
jest.mock("../../../../src/hooks/useUserContext");

describe("Header", () => {
  const jestFnParty = jest.fn();
  const jestFnUser = jest.fn();

  beforeEach(() => {
    const mockParty = usePartyContext as jest.MockedFunction<typeof usePartyContext>;
    mockParty.mockReturnValue({
        classroomName: "Test Classroom",
        setInvitationBlur: jestFnParty,
    } as any);

    const mockUser = useUserContext as jest.MockedFunction<typeof useUserContext>;
    mockUser.mockImplementation(() => ({
      userNameContext: "pepe",
    })as any );

    render(
      <PartyProvider>
        <UserProvider>
            <Header />
        </UserProvider>
      </PartyProvider>
    );
  });

  it("Should toggle options display on user options click", () => {
    fireEvent.click(screen.getByRole("options"));
  
    expect(screen.getByText("Cambiar visualizacion")).toBeInTheDocument();
    expect(screen.getByText("Cambiar juego")).toBeInTheDocument();
  });

  it("Should open TypeModal on 'Cambiar visualizacion' click", () => {
    
    // Hacer clic en el botón de usuario
    fireEvent.click(screen.getByRole("options"));
  
    // Hacer clic en el enlace 'Cambiar visualizacion'
    fireEvent.click(screen.getByText("Cambiar visualizacion"));
  
    // Verificar que TypeModal se ha abierto
    expect(screen.getByText("Modo visualización")).toBeInTheDocument();
  });

  it("Should open SocoreTypeModal on 'Cambiar juego' click", () => {
    fireEvent.click(screen.getByRole("options"));
    fireEvent.click(screen.getByText("Cambiar juego"));
  
    expect(screen.getByText("Modo de Juego")).toBeInTheDocument();
  });

  it("Shoul open invite modal on Click", () => {
    fireEvent.click(screen.getByRole("invite"));
    expect(screen.getByText("Invitar jugadores")).toBeInTheDocument();
    screen.debug()
  })

});
