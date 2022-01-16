import _ from "lodash";
import { Dispatch } from "react";
import { RootStateOrAny } from "react-redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ip } from "../../App";
import { baseApiUrl } from "../../constants/baseApiUrl";
import { CardSet } from "../../constants/CardSet";
import { toastBGColorDict } from "../../constants/Toast";
import { getJSONWithErrorHandling } from "../../helpers/errorHandling";
import { Monad } from "../../utils";
import { addToast } from "../toasts/actions";
import { tryCatchPromise } from "../utils";
import { addSet, addSets, deleteSetsFetch, deleteSetsFetchFail, deleteSetsFetchSuccess, publishSetFetch, publishSetFetchFail, publishSetFetchSuccess, removeSets } from "./actions";

// - get custom + offical card sets
export const getCardSetsFetchThunk = (): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch) => {
  // fetchOfficialCardSets(dispatch)

  // fetch official + custom sets from two apis in parallel
  const officalCardSetsPromise = tryCatchPromise(dispatch)<CardSet[]>(fetchOfficialCardSetsOp)
  const customCardSetsPromise = tryCatchPromise(dispatch)<CardSet[]>(customSetsFetchOp)
  const [officalCardSetsResult, customCardSetsResult] = await Promise.all([officalCardSetsPromise, customCardSetsPromise])
  const [officialCardSets, errorOfficalCardSets]: Monad<CardSet[]> = officalCardSetsResult 
  const [customCardSets, errorCustomCardSets]: Monad<CardSet[]> = customCardSetsResult
  
  const failToFetchSetToast = () => dispatch(addToast({id: _.uniqueId("message-sent-"), type: "Danger", description: "Could not fetch sets.", title: "Failure", backgroundColor: toastBGColorDict["Danger"]}))
  if (officialCardSets && customCardSets) {
    const cardSets = officialCardSets.concat(customCardSets) // no contract-to-model mapping needed, all fields are basic JSON types
    if (cardSets) {
      dispatch(addSets(cardSets))
    }
    else {
      failToFetchSetToast()
      const warnings = [errorOfficalCardSets, errorCustomCardSets].filter(item => item !== null)
      warnings.forEach(warning => console.warn(warning))
    }
  } else {
    failToFetchSetToast()
    const warnings = [errorOfficalCardSets, errorCustomCardSets].filter(item => item !== null)
    warnings.forEach(warning => console.warn(warning))
  }
}

// get official card sets
export async function fetchOfficialCardSetsOp(dispatch: Dispatch<any>) {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardsets.php');
    let sets: CardSet[] = await getJSONWithErrorHandling(response, dispatch, "Card Sets Could Not Be Pulled", "Error")

    sets = sets.filter((set) => {
        return set.num_of_cards > 50;
    }).map((set) => {
        return {
            ...set,
            id: set.set_name
        }
    })

    return sets
}

// get custom sets from yugiohdrafter-backend database
async function customSetsFetchOp(roomId: string): Promise<CardSet[]> {
  const url = `${baseApiUrl}/cardSet`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'GET',
  })
  if (resp.ok) 
    return resp.json()
  else{
    throw new Error(`Fetch failure from getRoomFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
  }
}

export const renameSetThunk = (set: CardSet, newName: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(addSet({...set, set_name: newName, id: getSetId(newName)}))
    dispatch(removeSets([set.id]))
}

export function getSetId(set_name: string) {
    return set_name + "|" + ip
}

// - card set publishing
export const publishCardSetFetchThunk = (cardSet: CardSet): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch) => {
    dispatch(publishSetFetch(cardSet.set_name))
    const [cardSetResult, error]: Monad<CardSet> = await tryCatchPromise(dispatch, [cardSet])<CardSet>(publishCardSetFetchOp)
    if (cardSetResult) {
      const cardSet = cardSetResult // no contract-to-model mapping needed, all fields are basic JSON types
      if (cardSet) {
        await dispatch(publishSetFetchSuccess(cardSet.set_name))
        dispatch(addToast({id: _.uniqueId("message-sent-"), type: "Success", description: "Set published", title: "Success", backgroundColor: toastBGColorDict["Success"]}))
      }
      else
        dispatch(publishSetFetchFail(error))  
    } else {
      dispatch(publishSetFetchFail(error))
    }
}

async function publishCardSetFetchOp(cardSet: CardSet): Promise<CardSet> {
    const url = `${baseApiUrl}/cardSet`
    const resp = await fetch(url, {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(cardSet)
    })
    if (resp.ok) 
      return resp.json()
    else{
      throw new Error(`Fetch failure from publishCardSetFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
    }
  }

// (custom) card set deletion
// - card set publishing
export const deleteCardSetsFetchThunk = (ids: string[]): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch) => {
  dispatch(deleteSetsFetch(ids))
  // eslint-disable-next-line no-unused-vars
  const [, error]: Monad<{message: string}> = await tryCatchPromise(dispatch, [ids])<{message: string}>(deleteCardSetFetchOp)
  if (error === null) {
    await dispatch(deleteSetsFetchSuccess(ids))
    dispatch(addToast({id: _.uniqueId("message-sent-"), type: "Success", description: "Set(s) deleted", title: "Success", backgroundColor: toastBGColorDict["Success"]}))
    dispatch(removeSets(ids))
  } else {
    dispatch(deleteSetsFetchFail(error))
  }
}

async function deleteCardSetFetchOp(ids: string[]): Promise<CardSet> {
  const url = `${baseApiUrl}/cardSet/${ids.join(',')}`
  const resp = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: 'DELETE',
    body: null
  })
  if (resp.ok) 
    return resp.json()
  else{
    throw new Error(`Fetch failure from deleteCardSetFetchOp(). Response from '${url}': ${JSON.stringify(resp)}`)
  }
} 