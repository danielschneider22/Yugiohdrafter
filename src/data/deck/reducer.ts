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
      case 'deck/deckToSideboard': {
        const deckIds = action.arrayNum ? state.deckIds.splice(action.arrayNum) : state.deckIds.splice(state.deckIds.findIndex((id) => id === action.cardId))
        const sideboardIds = [...state.sideboardIds, action.cardId]
        return {...state, deckIds, sideboardIds}
      }
      case 'deck/sideboardToDeck': {
        const sideboardIds = action.arrayNum ? state.sideboardIds.splice(action.arrayNum) : state.deckIds.splice(state.deckIds.findIndex((id) => id === action.cardId))
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
