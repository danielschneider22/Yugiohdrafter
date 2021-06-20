import { DeckActions } from './actions';

export const deckInitialState = {
    deckIds: [],
    sideboardIds: [],
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
        const deckIds= [...state.deckIds]
        action.arrayNum !== undefined ? deckIds.splice(action.arrayNum, 1) : deckIds.splice(state.deckIds.findIndex((id) => id === action.cardId), 1)
        const sideboardIds = [...state.sideboardIds, action.cardId]
        return {...state, deckIds, sideboardIds}
      }
      case 'deck/sideboardToDeck': {
        const sideboardIds = [...state.sideboardIds]
        action.arrayNum !== undefined ? sideboardIds.splice(action.arrayNum, 1) : sideboardIds.splice(state.deckIds.findIndex((id) => id === action.cardId), 1)
        const deckIds = [...state.deckIds, action.cardId]
        return {...state, deckIds, sideboardIds}
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
