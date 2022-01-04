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
    addOrOverwrite: "add" | "overwrite"
}

export function updateCardIds(cardsIds: string[], set_name: string, addOrOverwrite: "add" | "overwrite") {
    return {
        type: 'cardSets/updateCardIds',
        cardsIds,
        set_name,
        addOrOverwrite
    }
}

interface RemoveSets {
    type: 'cardSets/removeSets',
    ids: string[]
}

export function removeSets(ids: string[]): RemoveSets {
    return {
        type: 'cardSets/removeSets',
        ids
    }
}

// - publish card set fetch actions
interface PublishSetFetch {
    name: string
    type: types.CARD_SET_PUBLISH_FETCH
}
export function publishSetFetch(name: string): PublishSetFetch {
    return {
        name,
        type: types.CARD_SET_PUBLISH_FETCH,
    }
}

interface PublishSetFetchFail {
    error: any
    type: types.CARD_SET_PUBLISH_FETCH_FAIL
}
export function publishSetFetchFail(error: any): PublishSetFetchFail {
    return {
        error,
        type: types.CARD_SET_PUBLISH_FETCH_FAIL,
    }
}

interface PublishSetFetchSuccess {
    name: string
    type: types.CARD_SET_PUBLISH_FETCH_SUCCESS
}
export function publishSetFetchSuccess(name: string): PublishSetFetchSuccess {
    return {
        name,
        type: types.CARD_SET_PUBLISH_FETCH_SUCCESS,
    }
}

// - delete card sets fetch actions
interface DeleteSetsFetch {
    ids: string[]
    type: types.CARD_SETS_DELETE_FETCH
}
export function deleteSetsFetch(ids: string[]): DeleteSetsFetch {
    return {
        ids,
        type: types.CARD_SETS_DELETE_FETCH,
    }
}

interface DeleteSetsFetchFail {
    error: any
    type: types.CARD_SETS_DELETE_FETCH_FAIL
}
export function deleteSetsFetchFail(error: any): DeleteSetsFetchFail {
    return {
        error,
        type: types.CARD_SETS_DELETE_FETCH_FAIL,
    }
}

interface DeleteSetsFetchSuccess {
    ids: string[]
    type: types.CARD_SETS_DELETE_FETCH_SUCCESS
}
export function deleteSetsFetchSuccess(ids: string[]): DeleteSetsFetchSuccess {
    return {
        ids,
        type: types.CARD_SETS_DELETE_FETCH_SUCCESS,
    }
}

export type CardSetsActions = AddSets
    | UpdateCardIds
    | AddSet
    | RemoveSets
    | PublishSetFetch
    | PublishSetFetchFail
    | PublishSetFetchSuccess
    | DeleteSetsFetch
    | DeleteSetsFetchFail
    | DeleteSetsFetchSuccess