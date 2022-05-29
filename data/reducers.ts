import { combineReducers } from 'redux';

import boostersReducer, { boostersInitialState } from './boosters/reducer';
import cardsReducer, { cardsInitialState } from './cards/reducer';
import cardSetsReducer, { cardSetsInitialState } from './cardSets/reducer';
import { roomPlayersReducer, roomsPlayersInitialState } from './data/roomPlayers.ts/reducers';
import { roomsInitialState, roomsReducer } from './data/rooms/reducers';
import deckReducer, { deckInitialState } from './deck/reducer';
import draftPodReducer, { draftPodInitialState } from './draftPod/reducer';
import loginReducer, { loginInitState } from './login/reducer';
import toastReducer, { toastsInitialState } from './toasts/reducer';
import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

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
  login: loginInitState
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
  login: loginReducer
})

// const reduxDevtoolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
//   const enhancersThunk = applyMiddleware(thunkMiddleware as ThunkMiddleware<RootStateOrAny, Action>)

//   const store = createStore(
//     rootReducer,
//     initState as any,
//     compose(enhancersThunk, ...reduxDevtoolsCompose ? [reduxDevtoolsCompose()] : [], )
//   );

const bindMiddleware = (middleware: any) => {
    return composeWithDevTools(applyMiddleware(...middleware));
};

const initStore = (initialState = {}) => {
    return createStore(rootReducer, initialState, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore, { debug: true });