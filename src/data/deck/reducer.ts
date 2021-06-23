import { DeckActions } from './actions';

export const deckInitialState = {
    deckIds: [],
    sideboardIds: [],
    extraDeckIds: []
}

function spliceAToArrayB(a: string[], b: string[], cardId: string, arrayNum?: number) {
  const newA = [...a]
  arrayNum !== undefined ? newA.splice(arrayNum, 1) : newA.splice(a.findIndex((id) => id === cardId), 1)
  const newB = [...b, cardId]
  return { newA, newB }
}

export default function deckReducer(state = deckInitialState, action: DeckActions) {
    switch (action.type) {
      case 'deck/addCardToDeck': {
        return {...state, deckIds: [...state.deckIds, action.cardId]}
      }
      case 'deck/addCardsToSideboard': {
        return {...state, sideboardIds: [...state.deckIds, ...action.cardIds]}
      }
      case 'deck/deckToSideboard': {
        const newVals = spliceAToArrayB(state.deckIds, state.sideboardIds, action.cardId, action.arrayNum)
        return {...state, deckIds: newVals.newA, sideboardIds: newVals.newB}
      }
      case 'deck/sideboardToDeck': {
        const newVals = spliceAToArrayB(state.sideboardIds, state.deckIds, action.cardId, action.arrayNum)
        return {...state, sideboardIds: newVals.newA, deckIds: newVals.newB}
      }
      case 'deck/sideboardToExtraDeck': {
        const newVals = spliceAToArrayB(state.sideboardIds, state.extraDeckIds, action.cardId, action.arrayNum)
        return {...state, sideboardIds: newVals.newA, extraDeckIds: newVals.newB}
      }
      case 'deck/extraDeckToSideboard': {
        const newVals = spliceAToArrayB(state.extraDeckIds, state.sideboardIds, action.cardId, action.arrayNum)
        return {...state, extraDeckIds: newVals.newA, sideboardIds: newVals.newB}
      }
      case 'deck/resetDeckAndSideboard': {
        return {
          ...state,
          deckIds: [],
          sideboardIds: []
        }
      }
      default:
        return state
    }
  }
