import { RootStateOrAny } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { Room } from "../../models/Room"
import { resetDeckAndSideboard } from "./actions"
import { getDeckRoomId } from "./selectors"

export const checkCacheDeck = (roomId: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    if(getDeckRoomId(getState()) !== roomId){
        dispatch(resetDeckAndSideboard({roomId} as unknown as Room))
    }
}