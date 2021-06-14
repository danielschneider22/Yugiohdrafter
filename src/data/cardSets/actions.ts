import { CardSet } from "../../constants/CardSet";
import { CardSetTypes } from "./types";


interface AddSets {
    type: string,
    cardSets: CardSet[]
}

export function addSets(cardSets: CardSet[]) {
    return {
        type: CardSetTypes.AddSets,
        cardSets,
    }
}

export type CardSetsActions = AddSets;