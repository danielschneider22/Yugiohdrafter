export interface InitialiazeDraftPod {
    type: 'draftPod/initializeDraftPod',
    numPlayers: number,
    numBoosters: number,
    cardsPerBooster: number,
}

export function initialiazeDraftPod(numPlayers: number, numBoosters: number, cardsPerBooster: number, boosterIds: string[]) {
    return {
        type: 'draftPod/initializeDraftPod',
        numPlayers,
        numBoosters,
        cardsPerBooster,
    }
}

export type DraftPodActions = InitialiazeDraftPod;
