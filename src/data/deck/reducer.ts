import { DECK_CACHE_KEY } from '../../constants/DECK_CACHE_KEY';
import { RoomStartDraftFetchSuccess } from '../data/rooms/actions';
import { RoomsActionTypes } from '../data/rooms/types';
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

export function deckStateInitialize(): StateDeck {
  try {
    const stateCachedStr = localStorage.getItem(DECK_CACHE_KEY)
    // catch will stop crash, and logic will fallthrough to return deckInitialState if parse fails
    const stateCached = JSON.parse(stateCachedStr as string)  
    return stateCached
  } catch(error) {
    console.log(`Error: Was not able to initialize deck from cache. ${error}`)
  }
  return deckStateEmpty
}

export const deckInitialState = deckStateInitialize()

function setDeckStateCache(state: StateDeck) {
  try {
    localStorage.setItem(DECK_CACHE_KEY, JSON.stringify(state))
  } catch(error) {
    console.log(`Error: Could not cache deck state. ${error}`)
  }
}
function clearDeckStateCache() {
  localStorage.removeItem(DECK_CACHE_KEY)
}

function spliceAToArrayB(a: string[], b: string[], cardId: string, arrayNum?: number) {
  const newA = [...a]
  arrayNum !== undefined ? newA.splice(arrayNum, 1) : newA.splice(a.findIndex((id) => id === cardId), 1)
  const newB = [...b, cardId]
  return { newA, newB }
}

export default function deckReducer(state = deckStateInitialize(), action: DeckActions | RoomStartDraftFetchSuccess) {
    switch (action.type) {
      case 'deck/addCardToDeck': {
        const stateNew = {...state, deckIds: [...state.deckIds, action.cardId]}
        setDeckStateCache(stateNew)
        return stateNew
      }
      case 'deck/addCardsToSideboard': {
        const stateNew = {...state, sideboardIds: [...state.sideboardIds, ...action.cardIds]}
        setDeckStateCache(stateNew)
        return stateNew
      }
      case 'deck/addCardToExtraDeck': {
        const stateNew = {...state, extraDeckIds: [...state.extraDeckIds, action.cardId]}
        setDeckStateCache(stateNew)
        return stateNew
      }
      case 'deck/deckToSideboard': {
        const newVals = spliceAToArrayB(state.deckIds, state.sideboardIds, action.cardId, action.arrayNum)
        const stateNew = {...state, deckIds: newVals.newA, sideboardIds: newVals.newB}
        setDeckStateCache(stateNew)
        return stateNew
      }
      case 'deck/sideboardToDeck': {
        const newVals = spliceAToArrayB(state.sideboardIds, state.deckIds, action.cardId, action.arrayNum)
        const stateNew = {...state, sideboardIds: newVals.newA, deckIds: newVals.newB}
        setDeckStateCache(stateNew)
        return stateNew
      }
      case 'deck/sideboardToExtraDeck': {
        const newVals = spliceAToArrayB(state.sideboardIds, state.extraDeckIds, action.cardId, action.arrayNum)
        const stateNew = {...state, sideboardIds: newVals.newA, extraDeckIds: newVals.newB}
        setDeckStateCache(stateNew)
        return stateNew
      }
      case 'deck/extraDeckToSideboard': {
        const newVals = spliceAToArrayB(state.extraDeckIds, state.sideboardIds, action.cardId, action.arrayNum)
        const stateNew = {...state, extraDeckIds: newVals.newA, sideboardIds: newVals.newB}
        setDeckStateCache(stateNew)
        return stateNew
      }
      case RoomsActionTypes.ROOMS_START_DRAFT_FETCH_SUCCESS: 
      case 'deck/resetDeckAndSideboard': {
        clearDeckStateCache()
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
