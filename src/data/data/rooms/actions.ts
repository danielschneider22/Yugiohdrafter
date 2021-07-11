import RoomPlayers from "../../../components/RoomPage/RoomPlayers";
import { RoomPlayer } from "../../../constants/RoomPlayer";
import { Room } from "../../../models/Room";
import { State } from "../../../models/State";
import { Modify } from "../../../utils";
import { RoomsActionTypes as types } from "./types";


// - single room fetch actions -

// -- GET room fetch
export interface RoomGetFetch { type: types.ROOM_GET_FETCH }
export const roomGetFetch = (): RoomGetFetch => ({ type: types.ROOM_GET_FETCH })

export interface RoomGetFetchFail { error: any, type: types.ROOM_GET_FETCH_FAIL }
export const roomGetFetchFail = (error: any): RoomGetFetchFail => ({ error, type: types.ROOM_GET_FETCH_FAIL })

export type RoomGetFetchSuccess = { 
  room: Room
  roomPlayers: State<RoomPlayer>
  type: types.ROOM_GET_FETCH_SUCCESS 
}
export const roomGetFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>): RoomGetFetchSuccess => ({ 
  room,
  roomPlayers,
  type: types.ROOM_GET_FETCH_SUCCESS 
})

// -- ADD room fetch
export interface RoomAddFetch { type: types.ROOM_ADD_FETCH }
export const roomAddFetch = (): RoomAddFetch => ({ type: types.ROOM_ADD_FETCH })

export interface RoomAddFetchFail { error: any, type: types.ROOM_ADD_FETCH_FAIL }
export const roomAddFetchFail = (error: any): RoomAddFetchFail => ({ error, type: types.ROOM_ADD_FETCH_FAIL })

export type RoomAddFetchSuccess = Modify<RoomGetFetchSuccess, { type: types.ROOM_ADD_FETCH_SUCCESS }>
export const roomAddFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>): RoomAddFetchSuccess => ({ 
  room,
  roomPlayers,
  type: types.ROOM_ADD_FETCH_SUCCESS 
})

// -- JOIN room fetch
export interface RoomJoinRoomFetch { type: types.ROOM_JOIN_ROOM_FETCH }
export const roomJoinRoomFetch = (): RoomJoinRoomFetch => ({ type: types.ROOM_JOIN_ROOM_FETCH })

export interface RoomJoinRoomFetchFail { error: any, type: types.ROOM_JOIN_ROOM_FETCH_FAIL }
export const roomJoinRoomFetchFail = (error: any): RoomJoinRoomFetchFail => ({ error, type: types.ROOM_JOIN_ROOM_FETCH_FAIL })

export type RoomJoinRoomFetchSuccess = Modify<RoomGetFetchSuccess, { type: types.ROOM_JOIN_ROOM_FETCH_SUCCESS }>
export const roomJoinRoomFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>): RoomJoinRoomFetchSuccess => ({ 
  room,
  roomPlayers,
  type: types.ROOM_JOIN_ROOM_FETCH_SUCCESS 
})


// - get rooms fetch
export interface RoomsGetFetch { type: types.ROOMS_GET_FETCH }
export const roomsGetFetch = (): RoomsGetFetch => ({ type: types.ROOMS_GET_FETCH })
export interface RoomsGetFetchFail { error: any, type: types.ROOMS_GET_FETCH_FAIL }
export const roomsGetFetchFail = (error: any): RoomsGetFetchFail => ({ error, type: types.ROOMS_GET_FETCH_FAIL })
export interface RoomsGetFetchSuccess { 
  roomState: State<Room>
  type: types.ROOMS_GET_FETCH_SUCCESS 
}
export const roomsGetFetchSuccess = (roomState: State<Room>): RoomsGetFetchSuccess => ({ 
  roomState,
  type: types.ROOMS_GET_FETCH_SUCCESS 
})

export type RoomAction = RoomAddFetch
  | RoomAddFetchFail
  | RoomAddFetchSuccess
  | RoomGetFetch
  | RoomGetFetchFail
  | RoomGetFetchSuccess
  | RoomsGetFetch
  | RoomsGetFetchFail
  | RoomsGetFetchSuccess
  | RoomJoinRoomFetch
  | RoomJoinRoomFetchFail
  | RoomJoinRoomFetchSuccess