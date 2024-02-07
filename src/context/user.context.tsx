import { ReactElement, createContext, useState } from "react";
import { UserContext as userContextType } from '../types/user';

export const UserContext = createContext<userContextType | null>(null);

export function UserProvider({ children }: { children: JSX.Element | ReactElement | ReactElement[] }) {
    const [userNameContext, setUsernameContext] = useState("")
    const [rolConText, setRolConText] = useState("")

  return (
    <UserContext.Provider value={{
        userNameContext, setUsernameContext, rolConText, setRolConText
    }}>
        {children}
    </UserContext.Provider>
  );
};
