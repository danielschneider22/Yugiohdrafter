import _ from "lodash";
import { Dispatch } from "react";
import { toastBGColorDict } from "../constants/Toast";
import { State, StateItem } from "../models/State";
import { addToast } from "./toasts/actions";

export function stateAddItemWithoutMutation<T extends StateItem>(state: State<T>, item: T): State<T> {
  const coolState = {
    allIds: [...state.allIds, item.id],
    byId: {...state.byId, [item.id]: item}
  }
  console.log(coolState)
  return {
    allIds: [...state.allIds, item.id],
    byId: {...state.byId, [item.id]: item}
  }
}

export const tryCatchPromise = (dispatch: Dispatch<any>, funcArgs?: any[]) => async function tryCatchPromise<T>(func: Function): Promise<[T | null, any | null]> { // will need a way to pass args
  try {
    const data = await (funcArgs ? func(...funcArgs as any[]) : func(funcArgs))
    return [data, null]
  } catch (error: any) {
    dispatch(addToast({id: _.uniqueId("error-"), type: "Danger", description: "Please contact system admin", title: "Error", backgroundColor: toastBGColorDict["Danger"]}))
    return [null, error]
  }
}