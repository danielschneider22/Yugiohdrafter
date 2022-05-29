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

export interface UpdatePlayerPosition {
    type: 'draftPod/updatePlayerPosition',
}

export function updatePlayerPosition() {
    return {
        type: 'draftPod/updatePlayerPosition',
    }
}

export interface OpenNextPack {
    type: 'draftPod/openNextPack',
    currLPBoosterId: string
}

export function openNextPack(currLPBoosterId: string) {
    return {
        type: 'draftPod/openNextPack',
        currLPBoosterId
    }
}

export type DraftPodActions = InitialiazeDraftPod | UpdatePlayerPosition | OpenNextPack;
