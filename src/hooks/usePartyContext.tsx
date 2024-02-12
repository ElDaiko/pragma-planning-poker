import { PartyContext } from "../context/party.context"
import { useContext } from "react";

export function usePartyContext() {
    const context = useContext(PartyContext)
    
    if(!context) throw new Error("Party Context not available")

    return context;
}