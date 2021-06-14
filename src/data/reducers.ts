import { combineReducers } from 'redux'
import cardsReducer, { cardsInitialState } from './cards/reducer'
import cardSetsReducer, { cardSetsInitialState } from './cardSets/reducer'


export const initState = {
    cardSets: cardSetsInitialState,
    cards: cardsInitialState
}

export const rootReducer = combineReducers({
    cardSets: cardSetsReducer,
    cards: cardsReducer
})