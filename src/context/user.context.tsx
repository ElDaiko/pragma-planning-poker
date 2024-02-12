import { ReactElement, createContext, useState } from "react";
import { UserContext as userContextType } from '../types/user';
import {io} from 'socket.io-client'

export const UserContext = createContext<userContextType | null>(null);

export function UserProvider({ children }: { children: JSX.Element | ReactElement | ReactElement[] }) {
    const [userNameContext, setUsernameContext] = useState("")
    const [rolConText, setRolConText] = useState("")
    const [partyContext, setPartyContext] = useState("")

  return (
    <UserContext.Provider value={{
        userNameContext, setUsernameContext, rolConText, setRolConText,partyContext,setPartyContext
    }}>
        {children}
    </UserContext.Provider>
  );
};
