import { Card } from "../../constants/Card";
import { CardSet } from "../../constants/CardSet";


interface AddSets {
    type: 'cardSets/addSets',
    cardSets: CardSet[]
}

export function addSets(cardSets: CardSet[]) {
    return {
        type: 'cardSets/addSets',
        cardSets,
    }
}

interface AddSet {
    type: 'cardSets/addSet',
    cardSet: CardSet
}

export function addSet(cardSet: CardSet) {
    return {
        type: 'cardSets/addSet',
        cardSet,
    }
}

interface UpdateCardIds {
    type: 'cardSets/updateCardIds',
    cards: Card[],
    set_name: string
}

export function updateCardIds(cards: Card[], set_name: string) {
    return {
        type: 'cardSets/updateCardIds',
        cards,
        set_name
    }
}

export type CardSetsActions = AddSets | UpdateCardIds | AddSet;