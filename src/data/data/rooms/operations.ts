import moment from "moment"
import { RootStateOrAny } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { baseApiUrl } from "../../../constants/baseApiUrl"
import { RoomC } from "../../../contracts/RoomC"
import { Room } from "../../../models/Room"
import { Monad } from "../../../utils"

import { tryCatchPromise } from "../../utils"
import { roomAddFetch, roomAddFetchFail, roomAddFetchSuccess, roomGetFetch, roomGetFetchFail, roomGetFetchSuccess, roomJoinRoomFetch, roomJoinRoomFetchFail, roomJoinRoomFetchSuccess, roomMakePicksFetch, roomMakePicksFetchFail, roomMakePicksFetchSuccess, roomNextRoundFetch, roomNextRoundFetchFail, roomNextRoundFetchSuccess, roomStartDraftFetch, roomStartDraftFetchFail, roomStartDraftFetchSuccess, roomStartSealedFetch, roomStartSealedFetchFail, roomStartSealedFetchSuccess } from "./actions"
import {History} from 'history'
import { RoomPlayer } from "../../../constants/RoomPlayer"
import { Booster } from "../../../constants/Booster"
import { getDraftBoosterIds, getDraftBoosters, getSortedLPBoosters } from "../../boosters/selectors"
import { ip } from "../../../App"
import { RoomResultC } from "../../../contracts/RoomResultC"
import { removeAllBoosters, resetBoosterCards, setBoosters } from "../../boosters/actions"
import { getSetsForBoosters } from "../../cards/utils"
import { addSet } from "../../cardSets/actions"
import { fetchCardsById } from "../../cards/operations"
import { CardSet } from "../../../constants/CardSet"
import { getCardSetsById, getCustomSets } from "../../cardSets/selectors"
import { createDraftBoostersForRound } from "../../boosters/operations"
import { getCardsById } from "../../cards/selectors"
import { getCurrLPBooster, getNumPlayers } from "../../draftPod/selectors"
import { getUserPlayerInfo, roomPlayersById } from "../roomPlayers.ts/selectors"
import { CardPick } from "../../../constants/CardPick"
import { makeAIPicks } from "../../../components/Draft/utils"

// - mappers
export function roomContractToModel(roomC: RoomC): Room { // mutates
  const expires = moment(roomC.expires)
  
  if (!expires.isValid()) // invalid expires field returned from backend
    throw new Error(`Could not parse as moment: 'expires' from ${JSON.stringify(roomC)}`) 
  
  const room = roomC as unknown as Room
  room.expires = expires
  return room
}

export function getRoomPlayerId(ip: string, roomId: string) {
  return ip + "-" + roomId
}

export const roomAddFetchThunk = (history: History, format: "sealed" | "draft"): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomAddFetch())
  const boostersLP = getSortedLPBoosters(getState())
  const customSets = getCustomSets(getState()).filter((set) => boostersLP.some((booster) => booster.cardSetName === set.id))
  const [roomResultC, error]: Monad<RoomResultC> = await tryCatchPromise(dispatch, [boostersLP, customSets, format])<RoomResultC>(roomAddFetchOp)
  if (roomResultC) {
    // TODO: @allenwhitedev example of why we need to handle arguments in tryCatchPromise()
    // const [room, error]: Monad<Room> = await tryCatchPromise<Room>(roomContractToModel)
    const room = await roomContractToModel(roomResultC.room)
    if (room) {
      await dispatch(roomAddFetchSuccess(room, roomResultC.roomPlayers, roomResultC.boostersLP, roomResultC.boostersDraft))
      return history.push(`/room/${room.id}`)
    }
    else
      dispatch(roomAddFetchFail(error))  
  } else {
    dispatch(roomAddFetchFail(error))
  }
}
async function roomAddFetchOp(boostersLP: Booster[], customSets: CardSet[], format: "sealed" | "draft"): Promise<RoomC> {
  const url = `${baseApiUrl}/room`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      player: {
        name: "Host",
        ip,
      } as Partial<RoomPlayer>,
      boostersLP,
      customSets,
      format
    })
  })
  if (resp.ok) 
    return resp.json()
  else
    throw new Error(`Fetch failure from addRoomFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
}

export const roomGetFetchThunk = (roomId: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState): Promise<RoomResultC> => {
  dispatch(roomGetFetch)
  const [roomResultC, error]: Monad<RoomResultC> = await tryCatchPromise(dispatch, [roomId])<RoomResultC>(roomGetFetchOp)
  if (roomResultC) {
    const room = await roomContractToModel(roomResultC.room)
    if (room) {
      // if the player doesn't exist in the room send request to add them to room
      if(!room.roomPlayerIds.some((id) => id === getRoomPlayerId(ip, roomId))){
        dispatch(roomJoinRoomFetchThunk(roomId))
      }
      await dispatch(roomGetFetchSuccess(room, roomResultC.roomPlayers, roomResultC.boostersLP, roomResultC.boostersDraft))
    }
    else
      dispatch(roomGetFetchFail(error))  
  } else {
    dispatch(roomGetFetchFail(error))
  }
  return Promise.resolve(roomResultC as RoomResultC)
}
async function roomGetFetchOp(roomId: string): Promise<RoomResultC> {
  const url = `${baseApiUrl}/room/${roomId}`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'GET',
  })
  if (resp.ok) 
    return resp.json()
  else{
    throw new Error(`Fetch failure from getRoomFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
  }
}

export const roomJoinRoomFetchThunk = (roomId: string, removeBoosters = true): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomJoinRoomFetch)
  const [roomResultC, error]: Monad<RoomResultC> = await tryCatchPromise(dispatch, [roomId])<RoomResultC>(roomJoinRoomFetchOp)
  if (roomResultC) {
    const room = await roomContractToModel(roomResultC.room)
    if (room) {
      await dispatch(roomJoinRoomFetchSuccess(room, roomResultC.roomPlayers, roomResultC.boostersLP, roomResultC.boostersDraft))
      if(roomResultC.boostersLP) {
        const boosters = Object.values(roomResultC.boostersLP.byId)
        const customSets = roomResultC.customSets

        // fetch all custom set cards
        if(customSets && customSets.allIds.length > 0) {
          Object.values(customSets.byId).forEach(async (set) => {
            dispatch(addSet({id: set.id, set_name: set.set_name, set_code: set.set_code, num_of_cards: set.card_ids!.length, tcg_date: Date(), custom_set: true}))
            await fetchCardsById(dispatch, set.card_ids!, set.id)
          })
        }

        // fetch all non-custom set cards
        const nonCustomSets = boosters.filter((booster) => !customSets?.allIds.includes(booster.cardSetName))
        getSetsForBoosters(nonCustomSets, dispatch)
        if (removeBoosters)
          dispatch(removeAllBoosters("draftBooster"))
        dispatch(setBoosters(boosters, "landingPageBooster"))
      }
      
    }
    else
      dispatch(roomJoinRoomFetchFail(error))  
  } else {
    dispatch(roomJoinRoomFetchFail(error))
  }
}
async function roomJoinRoomFetchOp(roomId: string): Promise<RoomC> {
  const url = `${baseApiUrl}/room/joinRoom/${roomId}`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      player: {
        ip,
        name: "Player",
      } 
    })
  })
  if (resp.ok) 
    return resp.json()
  else
    throw new Error(`Fetch failure from joinRoomFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
}


export const roomStartDraftFetchThunk = (history: History, roomId: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomStartDraftFetch())
  const firstLPBooster = getSortedLPBoosters(getState())[0]
  const cardSets = getCardSetsById(getState())
  const cardsById = getCardsById(getState())
  const numPlayers = getNumPlayers(getState())
  dispatch(removeAllBoosters("draftBooster"))
  const boostersFirstRound = createDraftBoostersForRound(firstLPBooster, cardSets, cardsById, numPlayers, roomId)
  const [roomResultC, error]: Monad<RoomResultC> = await tryCatchPromise(dispatch, [roomId, boostersFirstRound])<RoomResultC>(roomStartDraftFetchOp)
  if (roomResultC) {
    const room = await roomContractToModel(roomResultC.room)
    if (room) {
      await dispatch(roomStartDraftFetchSuccess(room, roomResultC.roomPlayers, roomResultC.boostersLP, roomResultC.boostersDraft))
      return history.push(`/room/${room.id}`)
    }
    else
      dispatch(roomStartDraftFetchFail(error))  
  } else {
    dispatch(roomStartDraftFetchFail(error))
  }
}
async function roomStartDraftFetchOp(roomId: string, boostersDraft: Booster[]): Promise<RoomC> {
  const url = `${baseApiUrl}/room/startDraft/${roomId}`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      boostersDraft,
    })
  })
  if (resp.ok) 
    return resp.json()
  else
    throw new Error(`Fetch failure from startDraft(). Response from '${url}': ${JSON.stringify(resp)}`)
}

export const roomStartSealedFetchThunk = (history: History, roomId: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomStartSealedFetch())
  const [roomResultC, error]: Monad<RoomResultC> = await tryCatchPromise(dispatch, [roomId])<RoomResultC>(roomStartSealedFetchOp)
  if (roomResultC) {
    const room = await roomContractToModel(roomResultC.room)
    if (room) {
      dispatch(resetBoosterCards("landingPageBooster"))
      await dispatch(roomStartSealedFetchSuccess(room, roomResultC.roomPlayers, roomResultC.boostersLP, roomResultC.boostersDraft))
      return history.push(`/room/${room.id}`)
    }
    else
      dispatch(roomStartSealedFetchFail(error))  
  } else {
    dispatch(roomStartSealedFetchFail(error))
  }
}
async function roomStartSealedFetchOp(roomId: string, boostersDraft: Booster[]): Promise<RoomC> {
  const url = `${baseApiUrl}/room/startSealed/${roomId}`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  })
  if (resp.ok) 
    return resp.json()
  else
    throw new Error(`Fetch failure from startSealed(). Response from '${url}': ${JSON.stringify(resp)}`)
}

export const roomMakePickFetchThunk = (roomId: string, cardPick: CardPick): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomMakePicksFetch())
  const userPlayer = getUserPlayerInfo(getState())
  const roomPlayers = roomPlayersById(getState())
  const draftBoosters = getDraftBoosters(getState())
  const draftBoosterIds = getDraftBoosterIds(getState())
  const cardsById = getCardsById(getState())
  let draftPicks: CardPick[] = []
  if(userPlayer?.isHost) {
    const playerPositions = Object.values(roomPlayers).map((player) => player.position)
    const aiPicks = makeAIPicks(playerPositions, draftBoosters, draftBoosterIds, cardsById)
    draftPicks = [...aiPicks, cardPick]
  } else {
    draftPicks = [cardPick]
  }
  const [roomResultC, error]: Monad<RoomResultC> = await tryCatchPromise(dispatch, [roomId, draftPicks])<RoomResultC>(roomMakePicksFetchOp)
  if (roomResultC) {
    const room = await roomContractToModel(roomResultC.room)
    if (room) {
      await dispatch(roomMakePicksFetchSuccess(room, roomResultC.roomPlayers, roomResultC.boostersLP, roomResultC.boostersDraft))
    }
    else
      dispatch(roomMakePicksFetchFail(error))  
  } else {
    dispatch(roomMakePicksFetchFail(error))
  }
}
async function roomMakePicksFetchOp(roomId: string, draftPicks: {boosterId: string, cardId: string}): Promise<RoomC> {
  const url = `${baseApiUrl}/room/draftPicks/${roomId}`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      draftPicks,
    })
  })
  if (resp.ok) 
    return resp.json()
  else
    throw new Error(`Fetch failure from startDraft(). Response from '${url}': ${JSON.stringify(resp)}`)
}

export const roomNextRoundFetchThunk = (roomId: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomNextRoundFetch())
  const lpBoosters = getSortedLPBoosters(getState())
  const cardSets = getCardSetsById(getState())
  const cardsById = getCardsById(getState())
  const numPlayers = getNumPlayers(getState())
  const currLPBooster = getCurrLPBooster(getState())
  const nextBooster = lpBoosters[lpBoosters.findIndex((booster) => booster.id === currLPBooster.id) + 1]
  const boostersDraft = createDraftBoostersForRound(nextBooster, cardSets, cardsById, numPlayers, roomId)
  const [roomResultC, error]: Monad<RoomResultC> = await tryCatchPromise(dispatch, [roomId, boostersDraft])<RoomResultC>(roomNextRoundFetchOp)
  if (roomResultC) {
    const room = await roomContractToModel(roomResultC.room)
    if (room) {
      await dispatch(roomNextRoundFetchSuccess(room, roomResultC.roomPlayers, roomResultC.boostersLP, roomResultC.boostersDraft))
    }
    else
      dispatch(roomNextRoundFetchFail(error))  
  } else {
    dispatch(roomNextRoundFetchFail(error))
  }
}
async function roomNextRoundFetchOp(roomId: string, boostersDraft: Booster[]): Promise<RoomC> {
  const url = `${baseApiUrl}/room/nextRound/${roomId}`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      boostersDraft,
    })
  })
  if (resp.ok) 
    return resp.json()
  else
    throw new Error(`Fetch failure from nextRound(). Response from '${url}': ${JSON.stringify(resp)}`)
}