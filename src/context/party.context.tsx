'use client';

import React from "react";
import { ReactElement, createContext, useState } from "react";
import { PartyContext as partyContextType } from "../types/party";
import { io } from "socket.io-client";
import { Player } from "../types/player";
import { AmountOfVotes } from "@/types/amountVotes";

export const PartyContext = createContext<partyContextType | null>(null);

const socket = io("http://localhost:8080", {
  reconnection: false  //El usuario no se reconecta automatimaticamente
})

export function PartyProvider({ children }: { children: JSX.Element | ReactElement | ReactElement[] }) {
    const [playersList, setPlayersList] = useState<Player[]>([])
    const[averageVotes, setAverageVotes] = useState<string | null>(null)
    const[amountOfVotes, setAmountOfVotes] = useState<AmountOfVotes[]>([])
    const [classroomName, setClassroomName] = useState<string | null>(null)
    const [owners, setOwners] = useState<string[]>([])
    const [revealCards, setRevealCards] = useState(false);
    const [globalTypeOfScores, setGlobalTypeOfScores] = useState<string>("fibonacci")
    const isOwner = owners.includes(socket.id??'') //cuando es undefined utiliza el ""
    const nonSpectatorUsers = playersList.filter(user => user.type !== "spectador");
    const voted = playersList.filter(user => user.vote && Number(user.vote) >= 0);
    const allNonSpectatorVoted = nonSpectatorUsers.length > 0 && nonSpectatorUsers.length == voted?.length;
    

  return (
    
    <PartyContext.Provider value={{playersList, setPlayersList, socket, classroomName, setClassroomName, isOwner, setOwners, globalTypeOfScores, setGlobalTypeOfScores, setAverageVotes, averageVotes, amountOfVotes, setAmountOfVotes, revealCards, setRevealCards, allNonSpectatorVoted}}>
        {children}
    </PartyContext.Provider>
  );
};

export default PartyContext;
