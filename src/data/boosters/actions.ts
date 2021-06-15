import { Booster } from "../../constants/Booster";


export interface AddBooster {
    type: 'boosters/addBooster',
    booster: Booster
}

export function addBooster(booster: Booster) {
    return {
        type: 'boosters/addBooster',
        booster,
    }
}

interface RemoveBooster {
    type: 'boosters/removeBooster',
    id: string
}

export function removeBooster(id: string) {
    return {
        type: 'boosters/removeBooster',
        id,
    }
}

interface ResetBoosterCards {
    type: 'boosters/resetBoosterCards',
}

export function resetBoosterCards() {
    return {
        type: 'boosters/resetBoosterCards',
    }
}

export interface UpdateBooster {
    type: 'boosters/updateBooster',
    booster: Partial<Booster>,
    id: string
}

export function updateBooster(id: string, booster: Partial<Booster>) {
    return {
        type: 'boosters/updateBooster',
        booster,
        id
    }
}

export type BoosterActions = AddBooster | RemoveBooster | UpdateBooster | ResetBoosterCards;