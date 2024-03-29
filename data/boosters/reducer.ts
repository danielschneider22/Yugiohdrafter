import { Booster } from '../../constants/Booster';
import { State } from '../../models/State';
import { RoomPlayerAction } from '../data/roomPlayers.ts/actions';
import { RoomPlayersActionTypes } from '../data/roomPlayers.ts/types';
import { RoomAction } from '../data/rooms/actions';
import { RoomsActionTypes } from '../data/rooms/types';
import { stateRemoveDupeState } from '../utils';
import { BoosterActions, BoosterType } from './actions';

export const boostersStateEmpty: State<Booster> = {
    allIds: [] as string[],
    byId: {} as {[key: string]: Booster}
}

export const boostersInitialState = boostersStateEmpty


export default function getBoostersReducer(boosterType: BoosterType) {
  return function boostersReducer(state = boostersInitialState, action: BoosterActions | RoomAction | RoomPlayerAction) {
    if((action as any).boosterType && (action as any).boosterType !== boosterType) {
      return state;
    }
    switch (action.type) {
      case 'boosters/addBooster': {
        const allIds = [...state.allIds, action.booster.id]
        const byId = {...state.byId, [action.booster.id]: action.booster}
        const stateNew = {
            ...state,
            allIds,
            byId,
        }
        return stateNew
      }
      case 'boosters/setBoosters': {
        const allIds = action.boosters.map((booster) => booster.id)
        const byId: {[key: string]: Booster} = {}
        action.boosters.forEach((booster) => {
          byId[booster.id] = booster
        })
        const stateNew = {
            ...state,
            allIds,
            byId,
        }
        return stateNew
      }
      case 'boosters/removeBooster': {
        const allIds = state.allIds.filter((id) => id !== action.id)
        const byId: {[key: string]: Booster} = {}
        Object.values(state.byId).forEach((booster) => {
          if(booster.id !== action.id) 
            byId[booster.id] = booster
        })
        const stateNew = {
            ...state,
            allIds,
            byId,
        }
        return stateNew
      }
      case 'boosters/updateBooster': {
        const byId: {[key: string]: Booster} = {}
        Object.values(state.byId).forEach((booster) => {
          byId[booster.id] = booster.id === action.id ? {...booster, ...action.booster} : booster
        })
        const stateNew = {
            ...state,
            byId,
        }
        return stateNew
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
        const stateNew = {
            ...state,
            byId,
        }
        return stateNew
      }
      case 'boosters/resetBoosterCards': {
        const byId: {[key: string]: Booster} = {}
        Object.values(state.byId).forEach((booster) => {
          byId[booster.id] = {...booster, cardIds: undefined}
        })
        const stateNew = {
            ...state,
            byId,
        }
        return stateNew
      }
      case 'boosters/removeAllBoosters': {
        return boostersInitialState
      }
      case RoomsActionTypes.ROOM_ADD_FETCH_SUCCESS:
      case RoomsActionTypes.ROOM_GET_FETCH_SUCCESS:
      case RoomsActionTypes.ROOM_JOIN_ROOM_FETCH_SUCCESS:
      case RoomsActionTypes.ROOMS_START_DRAFT_FETCH_SUCCESS:
      case RoomsActionTypes.ROOMS_MAKE_PICKS_FETCH_SUCCESS:
      case RoomPlayersActionTypes.ROOM_UPDATE_PLAYER_FETCH_SUCCESS:
      {
        let stateNew
        if(boosterType === "draftBooster" && action.boostersDraft){
          stateNew = action.boostersDraft
        } else if (boosterType === "landingPageBooster" && action.boostersLP) {
          stateNew = action.boostersLP
        } else {
          stateNew = state
        }
        return stateNew
      }
      default:
        return state
    }
  }
} 
