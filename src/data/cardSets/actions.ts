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
    cardsIds: string[],
    set_name: string,
    addOrOverwrite: "add" | "overwrite",
    cards?: {[key: string]: Card}
}

export function updateCardIds(cardsIds: string[], set_name: string, addOrOverwrite: "add" | "overwrite", cards?: {[key: string]: Card}) {
    return {
        type: 'cardSets/updateCardIds',
        cardsIds,
        set_name,
        addOrOverwrite,
        cards
    }
}

interface RemoveSet {
    type: 'cardSets/removeSet',
    id: string
}

export function removeSet(id: string) {
    return {
        type: 'cardSets/removeSet',
        id
    }
}

export type CardSetsActions = AddSets | UpdateCardIds | AddSet | RemoveSet;