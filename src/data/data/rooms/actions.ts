import { Booster } from "../../../constants/Booster";
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
  boostersLP?: State<Booster>
  boostersDraft?: State<Booster>
  type: types.ROOM_GET_FETCH_SUCCESS 
}
export const roomGetFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>, boostersLP?: State<Booster>, boostersDraft?: State<Booster>): RoomGetFetchSuccess => ({ 
  room,
  roomPlayers,
  boostersLP,
  boostersDraft,
  type: types.ROOM_GET_FETCH_SUCCESS 
})

// -- ADD room fetch
export interface RoomAddFetch { type: types.ROOM_ADD_FETCH }
export const roomAddFetch = (): RoomAddFetch => ({ type: types.ROOM_ADD_FETCH })

export interface RoomAddFetchFail { error: any, type: types.ROOM_ADD_FETCH_FAIL }
export const roomAddFetchFail = (error: any): RoomAddFetchFail => ({ error, type: types.ROOM_ADD_FETCH_FAIL })

export type RoomAddFetchSuccess = Modify<RoomGetFetchSuccess, { type: types.ROOM_ADD_FETCH_SUCCESS }>
export const roomAddFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>, boostersLP?: State<Booster>, boostersDraft?: State<Booster>): RoomAddFetchSuccess => ({ 
  room,
  roomPlayers,
  boostersLP,
  boostersDraft,
  type: types.ROOM_ADD_FETCH_SUCCESS 
})

// -- JOIN room fetch
export interface RoomJoinRoomFetch { type: types.ROOM_JOIN_ROOM_FETCH }
export const roomJoinRoomFetch = (): RoomJoinRoomFetch => ({ type: types.ROOM_JOIN_ROOM_FETCH })

export interface RoomJoinRoomFetchFail { error: any, type: types.ROOM_JOIN_ROOM_FETCH_FAIL }
export const roomJoinRoomFetchFail = (error: any): RoomJoinRoomFetchFail => ({ error, type: types.ROOM_JOIN_ROOM_FETCH_FAIL })

export type RoomJoinRoomFetchSuccess = Modify<RoomGetFetchSuccess, { type: types.ROOM_JOIN_ROOM_FETCH_SUCCESS }>
export const roomJoinRoomFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>, boostersLP?: State<Booster>, boostersDraft?: State<Booster>): RoomJoinRoomFetchSuccess => ({ 
  room,
  roomPlayers,
  boostersLP,
  boostersDraft,
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

// -- start draft room fetch
export interface RoomStartDraftFetch { type: types.ROOMS_START_DRAFT_FETCH }
export const roomStartDraftFetch = (): RoomStartDraftFetch => ({ type: types.ROOMS_START_DRAFT_FETCH })

export interface RoomStartDraftFetchFail { error: any, type: types.ROOMS_START_DRAFT_FETCH_FAIL }
export const roomStartDraftFetchFail = (error: any): RoomStartDraftFetchFail => ({ error, type: types.ROOMS_START_DRAFT_FETCH_FAIL })

export type RoomStartDraftFetchSuccess = Modify<RoomGetFetchSuccess, { type: types.ROOMS_START_DRAFT_FETCH_SUCCESS }>
export const roomStartDraftFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>, boostersLP?: State<Booster>, boostersDraft?: State<Booster>): RoomStartDraftFetchSuccess => ({ 
  room,
  roomPlayers,
  boostersLP,
  boostersDraft,
  type: types.ROOMS_START_DRAFT_FETCH_SUCCESS
})

// -- start make pick fetch
export interface RoomMakePicksFetch { type: types.ROOMS_MAKE_PICKS_FETCH }
export const roomMakePicksFetch = (): RoomMakePicksFetch => ({ type: types.ROOMS_MAKE_PICKS_FETCH })

export interface RoomMakePicksFetchFail { error: any, type: types.ROOMS_MAKE_PICKS_FETCH_FAIL }
export const roomMakePicksFetchFail = (error: any): RoomMakePicksFetchFail => ({ error, type: types.ROOMS_MAKE_PICKS_FETCH_FAIL })

export type RoomMakePicksFetchSuccess = Modify<RoomGetFetchSuccess, { type: types.ROOMS_MAKE_PICKS_FETCH_SUCCESS }>
export const roomMakePicksFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>, boostersLP?: State<Booster>, boostersDraft?: State<Booster>): RoomMakePicksFetchSuccess => ({ 
  room,
  roomPlayers,
  boostersLP,
  boostersDraft,
  type: types.ROOMS_MAKE_PICKS_FETCH_SUCCESS
})

// -- start next round fetch
export interface RoomNextRoundFetch { type: types.ROOMS_NEXT_ROUND_FETCH }
export const roomNextRoundFetch = (): RoomNextRoundFetch => ({ type: types.ROOMS_NEXT_ROUND_FETCH })

export interface RoomNextRoundFetchFail { error: any, type: types.ROOMS_ROOMS_NEXT_ROUND_FETCH_FETCH_FAIL }
export const roomNextRoundFetchFail = (error: any): RoomNextRoundFetchFail => ({ error, type: types.ROOMS_ROOMS_NEXT_ROUND_FETCH_FETCH_FAIL })

export type RoomNextRoundFetchSuccess = Modify<RoomGetFetchSuccess, { type: types.ROOMS_ROOMS_NEXT_ROUND_FETCH_SUCCESS }>
export const roomNextRoundFetchSuccess = (room: Room, roomPlayers: State<RoomPlayer>, boostersLP?: State<Booster>, boostersDraft?: State<Booster>): RoomNextRoundFetchSuccess => ({ 
  room,
  roomPlayers,
  boostersLP,
  boostersDraft,
  type: types.ROOMS_ROOMS_NEXT_ROUND_FETCH_SUCCESS
})

// - get rooms fetch
export interface ClearRoomInfo { type: types.ROOMS_CLEAR_ROOM_INFO }
export const clearRoomInfo = (): ClearRoomInfo => ({ type: types.ROOMS_CLEAR_ROOM_INFO })

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
  | RoomStartDraftFetch
  | RoomStartDraftFetchFail
  | RoomStartDraftFetchSuccess
  | RoomMakePicksFetch
  | RoomMakePicksFetchFail
  | RoomMakePicksFetchSuccess
  | ClearRoomInfo