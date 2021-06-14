import { Dispatch } from "react";
import { Card } from "../../constants/Card";
import { updateCardIds } from "../cardSets/actions";
import { addCards } from "./actions";

export async function fetchCards(dispatch: Dispatch<any>, set_name: string) {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?set=' + set_name);
    let cards = await response.json();
    dispatch(addCards(cards.data as Card[]))
    dispatch(updateCardIds(cards.data as Card[], set_name))
}