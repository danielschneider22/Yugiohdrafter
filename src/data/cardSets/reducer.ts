import { CardSetsActions } from "./actions"
import { CardSet } from "./operations"
import { CardSetTypes } from "./types"

export const cardSetsInitialState = {
    cardSets: [] as CardSet[],
}

export default function cardSetsReducer(state = cardSetsInitialState, action: CardSetsActions) {
    switch (action.type) {
      case CardSetTypes.AddSets: {
        return {
            ...state,
            cardSets: action.cardSets,
        }
      }
      default:
        return state
    }
  }