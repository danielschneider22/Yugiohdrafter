import { combineReducers } from 'redux';

import boostersReducer, { boostersInitialState } from './boosters/reducer';
import cardsReducer, { cardsInitialState } from './cards/reducer';
import cardSetsReducer, { cardSetsInitialState } from './cardSets/reducer';
import deckReducer, { deckInitialState } from './deck/reducer';
import draftPodReducer, { draftPodInitialState } from './draftPod/reducer';
import toastReducer, { toastsInitialState } from './toasts/reducer';

export const initState = {
    cardSets: cardSetsInitialState,
    cards: cardsInitialState,
    boosters: boostersInitialState,
    deck: deckInitialState,
    draftPod: draftPodInitialState,
    draftPodBoosters: boostersInitialState,
    toasts: toastsInitialState,
}

export const rootReducer = combineReducers({
    cardSets: cardSetsReducer,
    cards: cardsReducer,
    boosters: boostersReducer("landingPageBooster"),
    deck: deckReducer,
    draftPod: draftPodReducer,
    draftPodBoosters: boostersReducer("draftBooster"),
    toasts: toastReducer,
})
