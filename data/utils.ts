import _ from "lodash";
import { Dispatch } from "react";
import { CacheKey } from "../constants/CacheKey";
import { toastBGColorDict } from "../constants/Toast";
import { State, StateItem } from "../models/State";
import { addToast } from "./toasts/actions";

export function stateAddItemWithoutMutation<T extends StateItem>(state: State<T>, item: T): State<T> {
  return {
    allIds: [...new Set([...state.allIds, item.id])],
    byId: {...state.byId, [item.id]: item}
  }
}

// !MUTATES newState! does NOT mutate previous state (use case: new partial state needs to be merged)
export function stateAddStateWithoutMutation<T extends StateItem>(state: State<T>, newState: State<T>): State<T> {
  const uniqueNewState: State<T> = stateRemoveDupeState(state, newState)

  return {
    allIds: [...new Set([...state.allIds, ...uniqueNewState.allIds])],
    byId: {...state.byId, ...uniqueNewState.byId}
  }
}

// !MUTATES newState! does NOT mutate previous state (use case: new partial state needs to be merged)
export function stateRemoveDupeState<T extends StateItem>(state: State<T>, newState: State<T>): State<T> {
  const allIdsNew: string[] = [] // quicker to push unique entries to new array than to splice (O(n)) out dupe vales
  newState.allIds.forEach(id => {
    allIdsNew.push(id) // unique entry, will be merged into returned state
  })
  
  const uniqueNewState: State<T> = { // filter out newState items already in (current) state
    allIds: allIdsNew, // unique new item ids
    byId: newState.byId, // unique new item
  } 
  return uniqueNewState
}

export const tryCatchPromise = (dispatch: Dispatch<any>, funcArgs?: any[]) => async function tryCatchPromise<T>(func: Function): Promise<[T | null, any | null]> { // will need a way to pass args
  try {
    const data = await (funcArgs ? func(...funcArgs as any[]) : func(funcArgs))
    return [data, null]
  } catch (error: any) {
    const description = (error + "").replace("Error: ", "")
    dispatch(addToast({id: _.uniqueId("error-"), type: "Danger", description, title: "Error", backgroundColor: toastBGColorDict["Danger"]}))
    return [null, error]
  }
}

export function loadStateFromCache<T>(cacheKey: CacheKey, fallbackState: T): T {
  try {
    // add empty string fallback so JSON.parse() fails, JSON.parse(null) will actually succeed + return null
    const stateCachedStr = localStorage.getItem(cacheKey) || '' 
    // catch will stop crash, and logic will fallthrough to return boostersInitialState if parse fails
    const stateCached = JSON.parse(stateCachedStr as string)  
    return stateCached
  } catch(error) {
    console.log(`Error: Was not able to initialize '${cacheKey}' from cache. ${error}`)
  }
  return fallbackState
}

export function setCache(cacheKey: CacheKey, state: any) {
  try {
    localStorage.setItem(cacheKey, JSON.stringify(state))
  } catch(error) {
    console.log(`Error: Could not set cache '${cacheKey}'. ${error}`)
  }
}
export function clearCache(cacheKey: CacheKey) {
  localStorage.removeItem(cacheKey)
}