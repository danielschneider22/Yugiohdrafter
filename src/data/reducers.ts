import { combineReducers } from 'redux'
import cardSetsReducer, { cardSetsInitialState } from './cardSets/reducer'


export const initState = {
    cardSets: cardSetsInitialState,
}

export const rootReducer = combineReducers({
    cardSets: cardSetsReducer
})