import { Booster } from "../../constants/Booster"
import { BoosterActions } from "./actions"


export const boostersInitialState = {
    allIds: [] as string[],
    byId: {} as {[key: string]: Booster}
}

export default function boostersReducer(state = boostersInitialState, action: BoosterActions) {
    switch (action.type) {
      case 'boosters/addBooster': {
        const allIds = [...state.allIds, action.booster.id]
        const byId = {...state.byId, [action.booster.id]: action.booster}
        return {
            ...state,
            allIds,
            byId,
        }
      }
      case 'boosters/removeBooster': {
        const allIds = state.allIds.filter((id) => id !== action.id)
        const byId: {[key: string]: Booster} = {}
        Object.values(state.byId).forEach((booster) => {
          if(booster.id !== action.id) 
            byId[booster.id] = booster
        })
        return {
            ...state,
            allIds,
            byId,
        }
      }
      case 'boosters/updateBooster': {
        const byId: {[key: string]: Booster} = {}
        Object.values(state.byId).forEach((booster) => {
          byId[booster.id] = booster.id === action.id ? {...booster, ...action.booster} : booster
        })
        return {
            ...state,
            byId,
        }
      }
      case 'boosters/resetBoosterCards': {
        const byId: {[key: string]: Booster} = {}
        Object.values(state.byId).forEach((booster) => {
          byId[booster.id] = {...booster, cardIds: undefined}
        })
        return {
            ...state,
            byId,
        }
      }
      default:
        return state
    }
  }