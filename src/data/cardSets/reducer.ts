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
            allIds.push(set.set_name)
            byId[set.set_name] = set
        })
        localStorage.setItem("cardSets", JSON.stringify(action.cardSets));
        return {
            ...state,
            allIds,
            byId,
        }
      }
      case 'cardSets/addSet': {
        const allIds = [action.cardSet.set_name, ...state.allIds]
        const byId = {...state.byId}
        byId[action.cardSet.set_name] = action.cardSet
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
          byId[cardSet.set_name] = cardSet.set_name !== action.set_name ? state.byId[cardSet.set_name] : {...state.byId[cardSet.set_name], card_ids: action.cards.map((card) => card.id)}
        })
        return {...state, byId}
      }
      default:
        return state
    }
  }
