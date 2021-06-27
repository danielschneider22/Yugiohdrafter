import { Booster } from "../../constants/Booster";

export type BoosterType = "landingPageBooster" | "draftBooster"

export interface AddBooster {
    type: 'boosters/addBooster',
    booster: Booster,
    boosterType: BoosterType,
}

export function addBooster(booster: Booster, boosterType: BoosterType) {
    return {
        type: 'boosters/addBooster',
        booster,
        boosterType
    }
}

interface RemoveBooster {
    type: 'boosters/removeBooster',
    id: string,
    boosterType: BoosterType,
}

export function removeBooster(id: string, boosterType: BoosterType) {
    return {
        type: 'boosters/removeBooster',
        id,
        boosterType
    }
}

interface ResetBoosterCards {
    type: 'boosters/resetBoosterCards',
    boosterType: BoosterType,
}

export function resetBoosterCards(boosterType: BoosterType) {
    return {
        type: 'boosters/resetBoosterCards',
        boosterType
    }
}

export interface UpdateBooster {
    type: 'boosters/updateBooster',
    booster: Partial<Booster>,
    id: string,
    boosterType: BoosterType,
}

export function updateBooster(id: string, booster: Partial<Booster>, boosterType: BoosterType) {
    return {
        type: 'boosters/updateBooster',
        booster,
        id,
        boosterType
    }
}

export type BoosterActions = AddBooster | RemoveBooster | UpdateBooster | ResetBoosterCards;