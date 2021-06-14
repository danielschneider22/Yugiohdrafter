import { CardSetsActions } from "./actions"
import { CardSet } from "./operations"
import { CardSetTypes } from "./types"

const initialState = {
    cardSets: [] as CardSet[],
}

export default function cardSetsReducer(state = initialState, action: CardSetsActions) {
    switch (action.type) {
      case CardSetTypes.AddSets: {
        return {
          ...state,
        }
      }
      default:
        return state
    }
  }