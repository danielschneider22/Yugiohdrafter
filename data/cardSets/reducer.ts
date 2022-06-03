import { CardSet } from '../../constants/CardSet';
import { CardSetsActions } from './actions';

export const cardSetsInitialState = {
    allIds: [] as string[],
    byId: {} as {[key: string]: CardSet},
    initFetchComplete: false,
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
            initFetchComplete: action.initFetchComplete || state.initFetchComplete
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
        const byId: {[key: string]: CardSet} = {}
        Object.values(state.byId).forEach((cardSet) => {
          const currCards = cardSet.card_ids || []
          const card_ids = action.addOrOverwrite === "overwrite" ? [...new Set(action.cardsIds)] : [...new Set([...currCards,...action.cardsIds])]
          const newSet = cardSet.id === action.set_name ? {...cardSet, card_ids} : cardSet
          newSet.num_of_cards = newSet.card_ids ? newSet.card_ids!.length : 0
          byId[cardSet.id] = newSet
        })
        
        if(byId[action.set_name].custom_set && action.cards) {
          const setCards = byId[action.set_name].card_ids?.map((id) => action.cards![id])
          localStorage.setItem(action.set_name, JSON.stringify(setCards))
        }
        
        localStorage.setItem("cardSets", JSON.stringify(Object.values(byId)));

        return {...state, byId}
      }
      case 'cardSets/removeSets': {
        const idsToRemove = action.ids
        const allIds = state.allIds.filter((val) => !idsToRemove.includes(val))
        const byId: {[key: string]: CardSet} = {}
        Object.values(state.byId).forEach((cardSet) => {
          if(!idsToRemove.includes(cardSet.id)){
            byId[cardSet.id] = cardSet
          }
        })
        localStorage.setItem("cardSets", JSON.stringify(Object.values(byId)));
        return {
            ...state,
            allIds,
            byId,
        }
      }
      default:
        return state
    }
  }
