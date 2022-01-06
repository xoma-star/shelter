export type stringVoidFunction = (v: any) => void
export type playerSchema = {
    id: number,
    ava: string,
    name: string,
    isHost: boolean,
    stats: {[key: typeof statsKeys[number]]: string},
    revealed: string[]
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

export const statsKeys = ['health', 'hobby', 'gender', 'equipment', 'character', 'phobia', 'additional']