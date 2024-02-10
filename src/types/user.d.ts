import { Socket } from "socket.io-client";

export interface UserContext {
    userNameContext: string;
    setUsernameContext: SetState<string>
    rolConText: string
    setRolConText: SetState<string>
    partyContext: string
    setPartyContext: SetState<string>
    socket: Socket
}
