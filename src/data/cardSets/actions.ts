import { Card } from "../../constants/Card";
import { CardSet } from "../../constants/CardSet";
import { CardSetActionTypes as types } from './types'

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

// publish card set fetch actions
interface PublishSetFetch {
    name: string
    type: types.CARD_SET_ADD_FETCH
}
export function publishSetFetch(name: string): PublishSetFetch {
    return {
        name,
        type: types.CARD_SET_ADD_FETCH,
    }
}

// publish card set fetch actions
interface PublishSetFetchFail {
    error: any
    type: types.CARD_SET_ADD_FETCH_FAIL
}
export function publishSetFetchFail(error: any): PublishSetFetchFail {
    return {
        error,
        type: types.CARD_SET_ADD_FETCH_FAIL,
    }
}

// publish card set fetch actions
interface PublishSetFetchSuccess {
    name: string
    type: types.CARD_SET_ADD_FETCH_SUCCESS
}
export function publishSetFetchSuccess(name: string): PublishSetFetchSuccess {
    return {
        name,
        type: types.CARD_SET_ADD_FETCH_SUCCESS,
    }
}

export type CardSetsActions = AddSets
    | UpdateCardIds
    | AddSet
    | RemoveSet
    | PublishSetFetch
    | PublishSetFetchFail
    | PublishSetFetchSuccess;