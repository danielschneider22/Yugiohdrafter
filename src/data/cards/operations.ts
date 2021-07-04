import { Dispatch } from "react";
import { Card } from "../../constants/Card";
import { toastBGColorDict } from "../../constants/Toast";
import { getJSONWithErrorHandling } from "../../helpers/errorHandling";
import { updateCardIds } from "../cardSets/actions";
import { addToast } from "../toasts/actions";
import { addCards } from "./actions";

export async function fetchCards(dispatch: Dispatch<any>, set_name: string) {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=' + set_name)
    const cards = await getJSONWithErrorHandling(response, dispatch, "Please try a Different Set", "Set Selection Failed")

    if(cards) {
        dispatch(addCards(cards.data as Card[]))
        dispatch(updateCardIds(cards.data as Card[], set_name))
        localStorage.setItem(set_name, JSON.stringify(cards.data));
    }
    
}

export async function fetchCardsByName(dispatch: Dispatch<any>, names: string[], set_name: string) {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=' + names.join("|"));
    const cards = await getJSONWithErrorHandling(response, dispatch, "Please check card list", "Invalid Card Name")

    if(cards) {
        dispatch(addCards(cards.data as Card[]))
        dispatch(updateCardIds(cards.data as Card[], set_name))
        localStorage.setItem(set_name, JSON.stringify(cards.data));
    }
    
}