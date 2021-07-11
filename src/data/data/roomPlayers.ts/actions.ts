import { RoomPlayer } from "../../../constants/RoomPlayer";
import { Room } from "../../../models/Room";
import { State } from "../../../models/State";
import { RoomPlayersActionTypes as types } from "./types";

export interface RoomChangeNameFetch { type: types.ROOM_CHANGE_NAME_FETCH, name: string }
export const roomChangeNameFetch = (name: string): RoomChangeNameFetch => ({ type: types.ROOM_CHANGE_NAME_FETCH, name })

export interface RoomChangeNameFetchFail { error: any, type: types.ROOM_CHANGE_NAME_FETCH_FAIL }
export const roomChangeNameFetchFail = (error: any): RoomChangeNameFetchFail => ({ error, type: types.ROOM_CHANGE_NAME_FETCH_FAIL })

export type RoomChangeNameFetchSuccess = { 
  room: Room
  roomPlayers: State<RoomPlayer>
  type: types.ROOM_CHANGE_NAME_FETCH_SUCCESS 
}
export const roomChangeNameFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>): RoomChangeNameFetchSuccess => ({ 
  room,
  roomPlayers,
  type: types.ROOM_CHANGE_NAME_FETCH_SUCCESS 
})

export type RoomPlayerAction = RoomChangeNameFetch
  | RoomChangeNameFetchFail
  | RoomChangeNameFetchSuccess