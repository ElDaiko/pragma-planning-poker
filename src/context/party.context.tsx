import React from "react";
import { ReactElement, createContext, useState } from "react";
import { PartyContext as partyContextType } from "../types/party";
import { io } from "socket.io-client";
import { Player } from "../types/player";

export const PartyContext = createContext<partyContextType | null>(null);

const socket = io("http://localhost:8080", {
  reconnection: false  //El usuario no se reconecta automatimaticamente
})

export function PartyProvider({ children }: { children: JSX.Element | ReactElement | ReactElement[] }) {
    const [playersList, setPlayersList] = useState<Player[]>([])
    
  return (
    <PartyContext.Provider value={{
        playersList, setPlayersList, socket
    }}>
        {children}
    </PartyContext.Provider>
  );
};

export default PartyContext;
