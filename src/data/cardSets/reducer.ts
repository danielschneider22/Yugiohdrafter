import { CardSet } from '../../constants/CardSet';
import { CardSetsActions } from './actions';

export const cardSetsInitialState = {
    allIds: [] as string[],
    byId: {} as {[key: string]: CardSet}
}

export default function cardSetsReducer(state = cardSetsInitialState, action: CardSetsActions) {
    switch (action.type) {
      case 'cardSets/addSets': {
        const allIds = [] as string[]
        const byId = {} as {[key: string]: CardSet}
        action.cardSets.forEach((set) => {
            allIds.push(set.id)
            byId[set.id] = set
        })
        localStorage.setItem("cardSets", JSON.stringify(action.cardSets));
        return {
            ...state,
            allIds,
            byId,
        }
      }
      case 'cardSets/addSet': {
        const allIds = [...new Set([action.cardSet.id, ...state.allIds])]
        const byId = {...state.byId}
        byId[action.cardSet.id] = action.cardSet
        localStorage.setItem("cardSets", JSON.stringify(Object.values(byId)));
        return {
            ...state,
            allIds,
            byId,
        }
      }
      case 'cardSets/updateCardIds': {
        const byId = {} as {[key: string]: CardSet}
        Object.values(state.byId).forEach((cardSet) => {
          byId[cardSet.id] = cardSet.id !== action.set_name ? state.byId[cardSet.id] : {...state.byId[cardSet.id], card_ids: action.cards.map((card) => card.id)}
        })
        return {...state, byId}
      }
      default:
        return state
    }
  }
