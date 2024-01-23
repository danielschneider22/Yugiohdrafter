import { RoomPlayer } from "../../../constants/RoomPlayer";
import { State } from "../../../models/State";
import { stateAddStateWithoutMutation } from "../../utils";
import { RoomAction } from "../rooms/actions";
import { RoomsActionTypes } from "../rooms/types";
import { RoomPlayerAction } from "./actions";
import { RoomPlayersActionTypes } from "./types";

export const roomsPlayersInitialState: State<RoomPlayer> = {allIds: [], byId: {}}
export function roomPlayersReducer(state: State<RoomPlayer> = roomsPlayersInitialState, action: RoomAction | RoomPlayerAction) {
  switch (action.type) {
    case RoomsActionTypes.ROOMS_MAKE_PICKS_FETCH_SUCCESS:
      console.log(Object.values(state.byId)[0].position)
      // @ts-ignore
      console.log(Object.values(action.roomPlayers.byId)[0].position);
      return action.roomPlayers
    case RoomsActionTypes.ROOM_ADD_FETCH_SUCCESS:
    case RoomsActionTypes.ROOM_GET_FETCH_SUCCESS:
    case RoomsActionTypes.ROOM_JOIN_ROOM_FETCH_SUCCESS:
    case RoomsActionTypes.ROOMS_START_DRAFT_FETCH_SUCCESS:
    case RoomsActionTypes.ROOMS_MAKE_PICKS_FETCH_SUCCESS:
    case RoomPlayersActionTypes.ROOM_UPDATE_PLAYER_FETCH_SUCCESS:
      return action.roomPlayers
    case RoomsActionTypes.ROOMS_CLEAR_ROOM_INFO:
      return roomsPlayersInitialState
    default:
      return state
  }
}