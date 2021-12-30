import { Dispatch } from "react";
import { RootStateOrAny } from "react-redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ip } from "../../App";
import { CardSet } from "../../constants/CardSet";
import { getJSONWithErrorHandling } from "../../helpers/errorHandling";
import { addSet, addSets, removeSet } from "./actions";

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