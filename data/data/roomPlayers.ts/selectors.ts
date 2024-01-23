import { createSelector } from "reselect";
import { RoomPlayer } from "../../../constants/RoomPlayer";
import { Room } from "../../../models/Room";
import { RootState } from "../../../models/RootState";
import { State } from "../../../models/State";
import { ip } from "../../../pages/_app";

export const roomPlayersStateSel = (state: RootState) => state.data.roomPlayers
export const roomPlayersById = (state: RootState) => state.data.roomPlayers.byId

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

export const getUserPlayerInfo = createSelector([roomPlayersById], (roomPlayers) => {
  return Object.values(roomPlayers).find((player: RoomPlayer) => player.id.includes(ip))
})