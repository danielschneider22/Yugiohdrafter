import { State, StateItem } from "../models/State";

export function stateAddItemWithoutMutation<T extends StateItem>(state: State<T>, item: T): State<T> {
  return {
    allIds: [...state.allIds, item.id],
    byId: {...state.byId, item}
  }
}
