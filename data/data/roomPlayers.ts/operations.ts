import { RootStateOrAny } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { ip } from "../../../App"
import { baseApiUrl } from "../../../constants/baseApiUrl"
import { RoomPlayer } from "../../../constants/RoomPlayer"
import { RoomResultC } from "../../../contracts/RoomResultC"
import { Monad } from "../../../utils"
import { tryCatchPromise } from "../../utils"
import { roomContractToModel } from "../rooms/operations"
import { roomUpdatePlayerFetch, roomUpdatePlayerFetchFail, roomUpdatePlayerFetchSuccess } from "./actions"

export const roomUpdatePlayerFetchThunk = (roomId: string, player: Partial<RoomPlayer>): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomUpdatePlayerFetch(player))
  const [roomResultC, error]: Monad<RoomResultC> = await tryCatchPromise(dispatch, [roomId, player])<RoomResultC>(roomUpdatePlayerFetchOp)
  if (roomResultC) {
    const room = await roomContractToModel(roomResultC.room)
    if (room) {
      await dispatch(roomUpdatePlayerFetchSuccess(room, roomResultC.roomPlayers, roomResultC.boostersLP, roomResultC.boostersDraft))
    }
    else
      dispatch(roomUpdatePlayerFetchFail(error))  
  } else {
    dispatch(roomUpdatePlayerFetchFail(error))
  }
}
async function roomUpdatePlayerFetchOp(roomId: string, player: Partial<RoomPlayer>): Promise<RoomResultC> {
  const url = `${baseApiUrl}/room/updatePlayer/${roomId}`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      player: {
        ...player,
        ip
      }
    })
  })
  if (resp.ok) 
    return resp.json()
  else{
    throw new Error(`Fetch failure from roomChangeNameFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
  }
}