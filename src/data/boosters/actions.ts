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

export interface ChangeBooster {
    type: 'boosters/changeBooster',
    booster: Partial<Booster>,
    id: string
}

export function changeBooster(id: string, booster: Partial<Booster>) {
    return {
        type: 'boosters/changeBooster',
        booster,
        id
    }
}

export type BoosterActions = AddBooster | RemoveBooster | ChangeBooster;