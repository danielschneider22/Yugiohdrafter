import { RoomPlayer } from "../../../constants/RoomPlayer";
import { Room } from "../../../models/Room";
import { State } from "../../../models/State";
import { RoomPlayersActionTypes as types } from "./types";

export interface RoomUpdatePlayerFetch { type: types.ROOM_UPDATE_PLAYER_FETCH, player: Partial<RoomPlayer> }
export const roomUpdatePlayerFetch = (player: Partial<RoomPlayer>): RoomUpdatePlayerFetch => ({ type: types.ROOM_UPDATE_PLAYER_FETCH, player })

export interface RoomUpdatePlayerFetchFail { error: any, type: types.ROOM_UPDATE_PLAYER_FETCH_FAIL }
export const roomUpdatePlayerFetchFail = (error: any): RoomUpdatePlayerFetchFail => ({ error, type: types.ROOM_UPDATE_PLAYER_FETCH_FAIL })

export type RoomUpdatePlayerFetchSuccess = { 
  room: Room
  roomPlayers: State<RoomPlayer>
  type: types.ROOM_UPDATE_PLAYER_FETCH_SUCCESS 
}
export const roomUpdatePlayerFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>): RoomUpdatePlayerFetchSuccess => ({ 
  room,
  roomPlayers,
  type: types.ROOM_UPDATE_PLAYER_FETCH_SUCCESS 
})

export type RoomPlayerAction = RoomUpdatePlayerFetch
  | RoomUpdatePlayerFetchFail
  | RoomUpdatePlayerFetchSuccess