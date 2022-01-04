export type stringVoidFunction = (v: string) => void
export type playerSchema = {
    id: number,
    ava: string,
    name: string,
    isHost: boolean,
    stats: {
        health: string
    }
}
export interface roomSchema{
    id: number,
    players: playerSchema[],
    host: number,
    eventsEnabled: boolean,
    willSurvive: number,
    willSurvivePercents: number,
    seed: number,
    waitingForPlayers: boolean,
    distress?: string,
    currentTurn: number
}