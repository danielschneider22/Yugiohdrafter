export interface InitialiazeDraftPod {
    type: 'draftPod/initializeDraftPod',
    numPlayers: number,
    numBoosters: number,
    cardsPerBooster: number,
    currLPBoosterId: string
}

export function initialiazeDraftPod(numPlayers: number, numBoosters: number, cardsPerBooster: number, currLPBoosterId: string) {
    return {
        type: 'draftPod/initializeDraftPod',
        numPlayers,
        numBoosters,
        cardsPerBooster,
        currLPBoosterId
    }
}

export type DraftPodActions = InitialiazeDraftPod;
