
export interface Player{
    socketID: string
    _id: string
    vote?: string
    username: string
    type: "player" | "viewer"
    roomID: string
}