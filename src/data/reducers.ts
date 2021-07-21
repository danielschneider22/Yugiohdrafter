import { combineReducers } from 'redux';
import { RootState } from '../models/RootState';

import boostersReducer, { boostersInitialState } from './boosters/reducer';
import cardsReducer, { cardsInitialState } from './cards/reducer';
import cardSetsReducer, { cardSetsInitialState } from './cardSets/reducer';
import { roomPlayersReducer, roomsPlayersInitialState } from './data/roomPlayers.ts/reducers';
import { roomsInitialState, roomsReducer } from './data/rooms/reducers';
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
  data: {
    rooms: roomsInitialState,
    roomPlayers: roomsPlayersInitialState,
  },
  toasts: toastsInitialState,
}

export function initialState(): RootState {
  const cachedStateString = localStorage.getItem('yugiohdrafter.com-state')
  try {
    const state = cachedStateString 
      ? JSON.parse(cachedStateString)
      : initState
      return state
  } catch (e) {
    console.log(`Could not load cached state from localStorage: ${e}`)
    return initState
  }
}

export const rootReducer = combineReducers({
  cardSets: cardSetsReducer,
  cards: cardsReducer,
  boosters: boostersReducer("landingPageBooster"),
  deck: deckReducer,
  draftPod: draftPodReducer,
  draftPodBoosters: boostersReducer("draftBooster"),
  data: combineReducers({
    rooms: roomsReducer,
    roomPlayers: roomPlayersReducer,
  }),
  toasts: toastReducer,
})
