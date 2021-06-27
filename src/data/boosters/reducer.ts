import { Booster } from '../../constants/Booster';
import { BoosterActions, BoosterType } from './actions';

export const boostersInitialState = {
    allIds: [] as string[],
    byId: {} as {[key: string]: Booster}
}

export default function getBoostersReducer(boosterType: BoosterType) {
  return function boostersReducer(state = boostersInitialState, action: BoosterActions) {
    if(action.boosterType !== boosterType) {
      return state;
    }
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
      case 'boosters/removeCardFromBooster': {
        const byId: {[key: string]: Booster} = {...state.byId}
        const cardIds = [...byId[action.id].cardIds!]
        cardIds.splice(cardIds.findIndex((id) => id === action.cardId), 1)
        byId[action.id] = 
          {
            ...byId[action.id],
            cardIds
          }
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
      case 'boosters/removeAllBoosters': {
        return boostersInitialState
      }
      default:
        return state
    }
  }
} 
