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
import { addSet, addSets, publishSetFetch, publishSetFetchFail, publishSetFetchSuccess, removeSet } from "./actions";

export async function fetchCardSets(dispatch: Dispatch<any>) {
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
    dispatch(addSets(sets))
}

export const renameSetThunk = (set: CardSet, newName: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(addSet({...set, set_name: newName, id: getSetId(newName)}))
    dispatch(removeSet(set.id))
}

export function getSetId(set_name: string) {
    return set_name + "|" + ip
}

// - card set publishing
export const publishCardSetFetchThunk = (cardSet: CardSet): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
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

