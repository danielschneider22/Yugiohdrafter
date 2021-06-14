import { Card } from "../../constants/Card";
import { CardSet } from "../../constants/CardSet";
import { CardSetTypes } from "./types";


interface AddSets {
    type: 'cardSets/addSets',
    cardSets: CardSet[]
}

export function addSets(cardSets: CardSet[]) {
    return {
        type: CardSetTypes.AddSets,
        cardSets,
    }
}

interface UpdateCardIds {
    type: 'cardSets/updateCardIds',
    cards: Card[],
    set_name: string
}

export function updateCardIds(cards: Card[], set_name: string) {
    return {
        type: CardSetTypes.UpdateCardIds,
        cards,
        set_name
    }
}

export type CardSetsActions = AddSets | UpdateCardIds;