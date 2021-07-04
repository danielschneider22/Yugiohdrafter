import { State, StateItem } from "../models/State";

export function stateAddItemWithoutMutation<T extends StateItem>(state: State<T>, item: T): State<T> {
  return {
    allIds: [...state.allIds, item.id],
    byId: {...state.byId, item}
  }
}

export async function tryCatchPromise<T>(func: Function): Promise<[T | null, any | null]> { // will need a way to pass args
  try {
    const data = await func()
    return [data, null]
  } catch (error: any) {
    return [null, error]
  }
}