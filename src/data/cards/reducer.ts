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
        const allIds = [] as string[]
        const byId = {} as {[key: string]: Card}
        action.cards.forEach((card) => {
            allIds.push(card.id)
            byId[card.id] = card
        })
        const newState = {
          ...state,
          allIds,
          byId,
        }
        localStorage.setItem("cards", JSON.stringify(newState));
        return newState
      }
      default:
        return state
    }
  }