import { DECK_CACHE_KEY } from '../../constants/DECK_CACHE_KEY';
import { RoomStartDraftFetchSuccess } from '../data/rooms/actions';
import { RoomsActionTypes } from '../data/rooms/types';
import { clearCache, loadStateFromCache, setCache } from '../utils';
import { DeckActions } from './actions';

interface StateDeck {
  deckIds: any[]
  sideboardIds: any[]
  extraDeckIds: any[]
}

export const deckStateEmpty: StateDeck = {
    deckIds: [],
    sideboardIds: [],
    extraDeckIds: []
}

export const deckInitialState = loadStateFromCache<StateDeck>(DECK_CACHE_KEY, deckStateEmpty)

function spliceAToArrayB(a: string[], b: string[], cardId: string, arrayNum?: number) {
  const newA = [...a]
  arrayNum !== undefined ? newA.splice(arrayNum, 1) : newA.splice(a.findIndex((id) => id === cardId), 1)
  const newB = [...b, cardId]
  return { newA, newB }
}

export default function deckReducer(state = deckInitialState, action: DeckActions | RoomStartDraftFetchSuccess) {
    switch (action.type) {
      case 'deck/addCardToDeck': {
        const stateNew = {...state, deckIds: [...state.deckIds, action.cardId]}
        setCache(DECK_CACHE_KEY, stateNew)
        return stateNew
      }
      case 'deck/addCardsToSideboard': {
        const stateNew = {...state, sideboardIds: [...state.sideboardIds, ...action.cardIds]}
        setCache(DECK_CACHE_KEY, stateNew)
        return stateNew
      }
      case 'deck/addCardToExtraDeck': {
        const stateNew = {...state, extraDeckIds: [...state.extraDeckIds, action.cardId]}
        setCache(DECK_CACHE_KEY, stateNew)
        return stateNew
      }
      case 'deck/deckToSideboard': {
        const newVals = spliceAToArrayB(state.deckIds, state.sideboardIds, action.cardId, action.arrayNum)
        const stateNew = {...state, deckIds: newVals.newA, sideboardIds: newVals.newB}
        setCache(DECK_CACHE_KEY, stateNew)
        return stateNew
      }
      case 'deck/sideboardToDeck': {
        const newVals = spliceAToArrayB(state.sideboardIds, state.deckIds, action.cardId, action.arrayNum)
        const stateNew = {...state, sideboardIds: newVals.newA, deckIds: newVals.newB}
        setCache(DECK_CACHE_KEY, stateNew)
        return stateNew
      }
      case 'deck/sideboardToExtraDeck': {
        const newVals = spliceAToArrayB(state.sideboardIds, state.extraDeckIds, action.cardId, action.arrayNum)
        const stateNew = {...state, sideboardIds: newVals.newA, extraDeckIds: newVals.newB}
        setCache(DECK_CACHE_KEY, stateNew)
        return stateNew
      }
      case 'deck/extraDeckToSideboard': {
        const newVals = spliceAToArrayB(state.extraDeckIds, state.sideboardIds, action.cardId, action.arrayNum)
        const stateNew = {...state, extraDeckIds: newVals.newA, sideboardIds: newVals.newB}
        setCache(DECK_CACHE_KEY, stateNew)
        return stateNew
      }
      case RoomsActionTypes.ROOMS_START_DRAFT_FETCH_SUCCESS: 
      case 'deck/resetDeckAndSideboard': {
        clearCache(DECK_CACHE_KEY)
        return {
          ...state,
          deckIds: [],
          sideboardIds: [],
          extraDeckIds: [],
        }
      }
      default:
        return state
    }
  }
