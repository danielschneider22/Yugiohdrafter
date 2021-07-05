import moment from "moment"
import { RootStateOrAny } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { baseApiUrl } from "../../../constants/baseApiUrl"
import { RoomC } from "../../../contracts/RoomC"
import { Room } from "../../../models/Room"
import { Monad } from "../../../utils"

import { tryCatchPromise } from "../../utils"
import { roomAddFetch, roomAddFetchFail, roomAddFetchSuccess, roomGetFetch, roomGetFetchFail, roomGetFetchSuccess, roomJoinRoomFetch, roomJoinRoomFetchFail, roomJoinRoomFetchSuccess } from "./actions"
import {History} from 'history'
import { RoomPlayer } from "../../../constants/RoomPlayer"
import { Booster } from "../../../constants/Booster"
import { getSortedLPBoosters } from "../../boosters/selectors"
import { ip } from "../../../App"

// - mappers
function roomContractToModel(roomC: RoomC): Room { // mutates
  const expires = moment(roomC.expires)
  
  if (!expires.isValid()) // invalid expires field returned from backend
    throw new Error(`Could not parse as moment: 'expires' from ${JSON.stringify(roomC)}`) 
  
  const room = roomC as unknown as Room
  room.expires = expires
  return room
}

function getRoomPlayerId(ip: string, roomId: string) {
  return ip + "-" + roomId
}

export const roomAddFetchThunk = (history: History): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomAddFetch())
  const boostersLP = getSortedLPBoosters(getState())
  const [roomC, error]: Monad<RoomC> = await tryCatchPromise(dispatch, [boostersLP])<RoomC>(roomAddFetchOp)
  if (roomC) {
    // TODO: @allenwhitedev example of why we need to handle arguments in tryCatchPromise()
    // const [room, error]: Monad<Room> = await tryCatchPromise<Room>(roomContractToModel)
    const room = await roomContractToModel(roomC)
    if (room) {
      await dispatch(roomAddFetchSuccess(room))
      return history.push(`/room/${room.id}`)
    }
    else
      dispatch(roomAddFetchFail(error))  
  } else {
    dispatch(roomAddFetchFail(error))
  }
}
async function roomAddFetchOp(boostersLP: Booster[]): Promise<RoomC> {
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
    })
  })
  if (resp.ok) 
    return resp.json()
  else
    throw new Error(`Fetch failure from addRoomFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
}

export const roomGetFetchThunk = (roomId: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomGetFetch)
  const [roomC, error]: Monad<RoomC> = await tryCatchPromise(dispatch, [roomId])<RoomC>(roomGetFetchOp)
  if (roomC) {
    const room = await roomContractToModel(roomC)
    if (room) {
      // if the player doesn't exist in the room send request to add them to room
      if(!room.roomPlayerIds.some((id) => id === getRoomPlayerId(ip, roomId))){
        dispatch(roomJoinRoomFetchThunk(roomId))
      }
      await dispatch(roomGetFetchSuccess(room))
    }
    else
      dispatch(roomGetFetchFail(error))  
  } else {
    dispatch(roomGetFetchFail(error))
  }
}
async function roomGetFetchOp(roomId: string): Promise<RoomC> {
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

export const roomJoinRoomFetchThunk = (roomId: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomJoinRoomFetch)
  const [roomC, error]: Monad<RoomC> = await tryCatchPromise(dispatch, [roomId])<RoomC>(roomJoinRoomFetchOp)
  if (roomC) {
    const room = await roomContractToModel(roomC)
    if (room) {
      await dispatch(roomJoinRoomFetchSuccess(room))
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
        ip: getRoomPlayerId(ip, roomId),
        name: "Player",
      } 
    })
  })
  if (resp.ok) 
    return resp.json()
  else
    throw new Error(`Fetch failure from joinRoomFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
}
