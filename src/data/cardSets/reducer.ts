import { CardSet } from "../../constants/CardSet"
import { CardSetsActions } from "./actions"
import { CardSetTypes } from "./types"

export const cardSetsInitialState = {
    allIds: [] as string[],
    byId: {} as {[key: string]: CardSet}
}

export default function cardSetsReducer(state = cardSetsInitialState, action: CardSetsActions) {
    switch (action.type) {
      case CardSetTypes.AddSets: {
        const allIds = [] as string[]
        const byId = {} as {[key: string]: CardSet}
        // @ts-ignore
        action.cardSets.forEach((set) => {
            allIds.push(set.set_name)
            byId[set.set_name] = set
        })
        // @ts-ignore
        localStorage.setItem("cardSets", JSON.stringify(action.cardSets));
        return {
            ...state,
            allIds,
            byId,
        }
      }
      case CardSetTypes.UpdateCardIds: {
        const newState = {...state}
        // @ts-ignore
        newState.byId[action.set_name].card_ids = action.cards.map((card) => card.id)
        return {...state, ...newState}
      }
      default:
        return state
    }
  }