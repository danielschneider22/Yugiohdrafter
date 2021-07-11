import { createSelector } from "reselect";
import { ip } from "../../../App";
import { RoomPlayer } from "../../../constants/RoomPlayer";
import { Room } from "../../../models/Room";
import { RootState } from "../../../models/RootState";
import { State } from "../../../models/State";

export const roomPlayersStateSel = (state: RootState) => state.data.roomPlayers

export const roomPlayersStateForRoomSel = (state: RootState, room: Room) => {
  const roomPlayerIdsForRoom = room.roomPlayerIds
  const roomPlayersState = roomPlayersStateSel(state)

  const roomPlayersStateForRoom: State<RoomPlayer> = {
    allIds: [],
    byId: {}
  }
  
  roomPlayerIdsForRoom.forEach((id: string) => {
    const roomPlayer = roomPlayersState.byId[id]

    if (roomPlayer) { // user should always have roomPlayer for joined rooms in redux state
      roomPlayersStateForRoom.allIds.push(roomPlayer.id)
      roomPlayersStateForRoom.byId[id] = roomPlayer
    } 
  })
  return roomPlayersStateForRoom
}

export const getUserPlayerInfo = createSelector([roomPlayersStateSel], (roomPlayers) => {
  Object.keys(roomPlayers).find((id) => id.includes(ip))
})