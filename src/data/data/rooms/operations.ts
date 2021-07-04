import { RootStateOrAny } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"

export const addRoomFetchThunk = (): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => (dispatch, getState) => {
  alert(`@allenwhitedev TBA: addRoomFetchThunk()`)
  console.log(`addRoomFetchThunk`)
}