import { State, StateItem } from "../models/State";

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

export const tryCatchPromise = (funcArgs?: any[]) => async function tryCatchPromise<T>(func: Function): Promise<[T | null, any | null]> { // will need a way to pass args
  try {
    const data = await (funcArgs ? func(...funcArgs as any[]) : func(funcArgs))
    return [data, null]
  } catch (error: any) {
    return [null, error]
  }
}