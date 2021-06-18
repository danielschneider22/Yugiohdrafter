import { combineReducers } from 'redux';

import boostersReducer, { boostersInitialState } from './boosters/reducer';
import cardsReducer, { cardsInitialState } from './cards/reducer';
import cardSetsReducer, { cardSetsInitialState } from './cardSets/reducer';
import deckReducer, { deckInitialState } from './deck/reducer';

export const initState = {
    cardSets: cardSetsInitialState,
    cards: cardsInitialState,
    boosters: boostersInitialState,
    deck: deckInitialState,
}

export const rootReducer = combineReducers({
    cardSets: cardSetsReducer,
    cards: cardsReducer,
    boosters: boostersReducer,
    deck: deckReducer
})
