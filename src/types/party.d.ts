import { Socket } from "socket.io-client";

export interface PartyContext {
    playersList: Player[];
    setPlayersList: SetState<Player[]>
    socket: Socket
    classroomName: string | null
    setClassroomName: SetState<string | null>,
    isOwner: boolean
    setOwners: SetState<string[]>
    globalTypeOfScores: string
    setGlobalTypeOfScores: SetState<TypeOfScores>
    averageVotes: string | null
    setAverageVotes: SetState<string | null>
    amountOfVotes: AmountOfVotes[] | null
    setAmountOfVotes: SetState<AmountOfVotes[] | null>
    revealCards: boolean
    setRevealCards: SetState<boolean>
}