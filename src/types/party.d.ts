import { Socket } from "socket.io-client";

export interface PartyContext {
    playersList: Player[];
    setPlayersList: SetState<Player[]>
    socket: Socket
}