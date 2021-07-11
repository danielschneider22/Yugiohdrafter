import { RoomPlayer } from "../../../constants/RoomPlayer";
import { State } from "../../../models/State";
import { stateAddStateWithoutMutation } from "../../utils";
import { RoomAction } from "../rooms/actions";
import { RoomsActionTypes } from "../rooms/types";

export const roomsPlayersInitialState: State<RoomPlayer> = {allIds: [], byId: {}}
export function roomPlayersReducer(state: State<RoomPlayer> = roomsPlayersInitialState, action: RoomAction) {
  switch (action.type) {
    case RoomsActionTypes.ROOM_ADD_FETCH_SUCCESS:
    case RoomsActionTypes.ROOM_GET_FETCH_SUCCESS:
    case RoomsActionTypes.ROOM_JOIN_ROOM_FETCH_SUCCESS:
      return stateAddStateWithoutMutation<RoomPlayer>(state, action.roomPlayers)

    default:
      return state
  }
}