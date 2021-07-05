import { Room } from "../../../models/Room";
import { State } from "../../../models/State";
import { stateAddItemWithoutMutation } from "../../utils";
import { RoomAction } from "./actions";
import { RoomsActionTypes } from "./types";

export const roomsInitialState: State<Room> = {allIds: [], byId: {}}
export function roomsReducer(state: State<Room> = roomsInitialState, action: RoomAction) {
  switch (action.type) {
    case RoomsActionTypes.ROOM_ADD_FETCH_SUCCESS:
    case RoomsActionTypes.ROOM_GET_FETCH_SUCCESS:
    case RoomsActionTypes.ROOM_JOIN_ROOM_FETCH_SUCCESS:
      return stateAddItemWithoutMutation<Room>(state, action.room)

    case RoomsActionTypes.ROOMS_GET_FETCH_SUCCESS:
      return action.roomState // - replace with latest list of rooms
    default:
      return state
  }
}