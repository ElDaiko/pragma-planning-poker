window.setImmediate = window.setTimeout as any;

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Usercard from "@/system-design/atoms/user-card";
import { PartyProvider } from "@/context/party.context";
import { usePartyContext } from "../../../src/hooks/usePartyContext";

jest.mock("../../../src/hooks/usePartyContext");

describe("UserCard", () => {
    /*  
    Funcion mockeade, guarda la referencia de la función
        -Se guarda la funcion mokeada para ser usada
        -Se usa en el mock 
        -Y la variable se utiliza en este caso un socket.emit
        -Y se valida para verificar que se ejecute
    */
    const jestFn = jest.fn();

    beforeEach(() => {
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
      owners: ["socket", "pepe2"],
      isOwner: true,
      socket: {
        emit: jestFn,
      },
    } as any);

        render(
            <PartyProvider>
              <Usercard />
            </PartyProvider>
          );
    })
  it("Should render users correctly", () => {

    //Bucsar que se le haga el render a los 3 usuarNames
    expect(screen.getByText('pepe')).toBeInTheDocument();
    expect(screen.getByText('pepe2')).toBeInTheDocument();
    expect(screen.getByText('pepe3')).toBeInTheDocument();

    //Buscar las clases se apliquen correctamente según el tipo
    expect(screen.getAllByRole('playerCard').length).toBe(2);
    expect(screen.getAllByRole('spectadorCard').length).toBe(1);

    //Buscar que haya solo un admin (por cada admin buscar 2 coronas)
    expect(screen.getAllByText('👑').length).toBe(2);
    /* expect(screen.getByText('pepe').parentElement?.parentElement?.firstElementChild).toHaveClass("card__player") */

  });
  it("Should call give admin o click", () => {
    //En el evento onclick de el X rol se hace el act, en la primera posicion porque son 2 usuario con ese estilo
    fireEvent.click(screen.getAllByRole("playerCard")[0])
    //Revisa que la funcion se haya llamado haciendo el accert
    //El socket.emit tiene el valor del jestFn, y se ejecuta la funcion mockeada en el click
    expect(jestFn).toHaveBeenCalledTimes(1);
    expect(jestFn).toHaveBeenCalledWith("add-admin", {socketID: "socket"} );
  })
});
