import { UserContext } from "../context/user.context";
import { useContext } from "react";

export function useUserContext() {
    const context = useContext(UserContext)
    
    if(!context) throw new Error("User Context not available")

    return context;
}