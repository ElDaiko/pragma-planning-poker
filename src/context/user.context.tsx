import { ReactElement, createContext, useState } from "react";
import { UserContext as userContextType } from '../types/user';

export const UserContext = createContext<userContextType | null>(null);

export function UserProvider({ children }: { children: JSX.Element | ReactElement | ReactElement[] }) {
    const [username, setUsername] = useState("")

  return (
    <UserContext.Provider value={{
        username, setUsername
    }}>
        {children}
    </UserContext.Provider>
  );
};
