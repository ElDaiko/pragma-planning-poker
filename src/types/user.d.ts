import { Socket } from "socket.io-client";

export interface UserContext {
    userNameContext: string;
    setUsernameContext: SetState<string>
    rolConText: string
    setRolConText: SetState<string>
    socket: Socket
}
