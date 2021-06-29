import { Room } from "../../../models/Room";
import { State } from "../../../models/State";
import { RoomsActionTypes } from "./types";

// - add room fetch
export interface RoomAddFetch { type: RoomsActionTypes.ROOM_ADD_FETCH }
export const roomAddFetch = (): RoomAddFetch => ({ type: RoomsActionTypes.ROOM_ADD_FETCH })
export interface RoomAddFetchFail { type: RoomsActionTypes.ROOM_ADD_FETCH_FAIL }
export const roomAddFetchFail = (): RoomAddFetchFail => ({ type: RoomsActionTypes.ROOM_ADD_FETCH_FAIL })
export interface RoomAddFetchSuccess { 
  room: Room
  type: RoomsActionTypes.ROOM_ADD_FETCH_SUCCESS 
}
export const roomAddFetchSuccess = (room: Room): RoomAddFetchSuccess => ({ 
  room,
  type: RoomsActionTypes.ROOM_ADD_FETCH_SUCCESS 
})

// - get room fetch
export interface RoomGetFetch { type: RoomsActionTypes.ROOM_GET_FETCH }
export const roomGetFetch = (): RoomGetFetch => ({ type: RoomsActionTypes.ROOM_GET_FETCH })
export interface RoomGetFetchFail { type: RoomsActionTypes.ROOM_GET_FETCH_FAIL }
export const roomGetFetchFail = (): RoomGetFetchFail => ({ type: RoomsActionTypes.ROOM_GET_FETCH_FAIL })
export interface RoomGetFetchSuccess { 
  room: Room
  type: RoomsActionTypes.ROOM_GET_FETCH_SUCCESS 
}
export const roomGetFetchSuccess = (room: Room): RoomGetFetchSuccess => ({ 
  room,
  type: RoomsActionTypes.ROOM_GET_FETCH_SUCCESS 
})

// - get rooms fetch
export interface RoomsGetFetch { type: RoomsActionTypes.ROOMS_GET_FETCH }
export const roomsGetFetch = (): RoomsGetFetch => ({ type: RoomsActionTypes.ROOMS_GET_FETCH })
export interface RoomsGetFetchFail { type: RoomsActionTypes.ROOMS_GET_FETCH_FAIL }
export const roomsGetFetchFail = (): RoomsGetFetchFail => ({ type: RoomsActionTypes.ROOMS_GET_FETCH_FAIL })
export interface RoomsGetFetchSuccess { 
  roomState: State<Room>
  type: RoomsActionTypes.ROOMS_GET_FETCH_SUCCESS 
}
export const roomsGetFetchSuccess = (roomState: State<Room>): RoomsGetFetchSuccess => ({ 
  roomState,
  type: RoomsActionTypes.ROOMS_GET_FETCH_SUCCESS 
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