import { RootStateOrAny } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { ip } from "../../../App"
import { baseApiUrl } from "../../../constants/baseApiUrl"
import { RoomPlayer } from "../../../constants/RoomPlayer"
import { RoomResultC } from "../../../contracts/RoomResultC"
import { Monad } from "../../../utils"
import { tryCatchPromise } from "../../utils"
import { roomGetFetch, roomGetFetchFail } from "../rooms/actions"
import { roomContractToModel } from "../rooms/operations"
import { roomChangeNameFetchSuccess } from "./actions"

export const roomChangeNameFetchThunk = (roomId: string, name: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(roomGetFetch)
  const [roomResultC, error]: Monad<RoomResultC> = await tryCatchPromise(dispatch, [roomId, name])<RoomResultC>(roomChangeNameFetchOp)
  if (roomResultC) {
    const room = await roomContractToModel(roomResultC.room)
    if (room) {
      await dispatch(roomChangeNameFetchSuccess(room, roomResultC.roomPlayers))
    }
    else
      dispatch(roomGetFetchFail(error))  
  } else {
    dispatch(roomGetFetchFail(error))
  }
}
async function roomChangeNameFetchOp(roomId: string, name: string): Promise<RoomResultC> {
  const url = `${baseApiUrl}/room/changeName/${roomId}`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      player: {
        name,
        ip,
      } as Partial<RoomPlayer>,
    })
  })
  if (resp.ok) 
    return resp.json()
  else{
    throw new Error(`Fetch failure from roomChangeNameFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
  }
}