import moment from "moment"
import { RootStateOrAny } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { baseApiUrl } from "../../../constants/baseApiUrl"
import { RoomC } from "../../../contracts/RoomC"
import { Room } from "../../../models/Room"
import { Monad } from "../../../utils"

import { tryCatchPromise } from "../../utils"
import { roomAddFetch, roomAddFetchFail, roomAddFetchSuccess } from "./actions"
import {History} from 'history'
import { RoomPlayer } from "../../../constants/RoomPlayer"
import { Booster } from "../../../constants/Booster"
import { getSortedLPBoosters } from "../../boosters/selectors"

export const roomAddFetchThunk = (history: History): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  roomAddFetch()
  const boostersLP = getSortedLPBoosters(getState())
  const [roomC, error]: Monad<RoomC> = await tryCatchPromise([boostersLP])<RoomC>(roomAddFetchOp)
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
      } as Partial<RoomPlayer>,
      boostersLP,
    })
  })
  if (resp.ok) 
    return resp.json()
  else
    throw new Error(`Fetch failure from addRoomFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
}

// - mappers
function roomContractToModel(roomC: RoomC): Room { // mutates
  const expires = moment(roomC.expires)
  
  if (!expires.isValid()) // invalid expires field returned from backend
    throw new Error(`Could not parse as moment: 'expires' from ${JSON.stringify(roomC)}`) 
  
  const room = roomC as unknown as Room
  room.expires = expires
  return room
}