import { Card } from "../../constants/Card"
import { CardActions } from "./actions"
import { CardTypes } from "./types"

export const cardsInitialState = {
    allIds: [] as string[],
    byId: {} as {[key: string]: Card}
}

export default function cardsReducer(state = cardsInitialState, action: CardActions) {
    switch (action.type) {
      case CardTypes.AddCards: {
        return state
      }
      default:
        return state
    }
  }